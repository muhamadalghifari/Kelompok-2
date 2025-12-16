import { AppButton } from '@/src/components/atoms/AppButton';
import { AppInput } from '@/src/components/atoms/AppInput';
import { AppText } from '@/src/components/atoms/AppText';
import { AuthContainer } from '@/src/components/organisms/AuthContainer';
import { supabase } from '@/src/lib/supabase';
import { SPACING } from '@/src/styles/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Eits!', 'Email dan password harus diisi ya.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            const message = error.message.includes('Invalid login credentials')
                ? 'Email atau password salah. Coba cek lagi ya.'
                : 'Terjadi kesalahan: ' + error.message;

            if (Platform.OS === 'web') {
                alert(message);
            } else {
                if (error.message.includes('Invalid login credentials')) {
                    Alert.alert('Gagal Masuk', message);
                } else {
                    Alert.alert('Login gagal', message);
                }
            }
        } else {
            router.replace('/(main)/home');
        }
    };

    return (
        <AuthContainer>
            <View style={styles.header}>
                <AppText variant="title" style={styles.title}>
                    Selamat Datang!
                </AppText>
                <AppText variant="caption">
                    Masuk dulu yuk untuk lanjut belajar istilah baru.
                </AppText>
            </View>

            <View style={styles.form}>
                <AppInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View style={{ height: SPACING.md }} />
                <AppInput
                    placeholder="Password"
                    isPassword
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={{ height: SPACING.xl }} />

                <AppButton
                    title={loading ? "Tunggu sebentar..." : "Masuk Sekarang"}
                    onPress={handleLogin}
                />

                <View style={styles.footer}>
                    <AppText>Belum punya akun? </AppText>
                    <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                        <AppText variant="link">Daftar di sini</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: SPACING.xl,
    },
    title: {
        marginBottom: SPACING.xs,
        fontSize: 32,
    },
    form: {
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        marginTop: SPACING.lg,
        justifyContent: 'center',
    },
});