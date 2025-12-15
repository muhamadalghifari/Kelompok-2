import { AppButton } from '@/src/components/atoms/AppButton';
import { AppInput } from '@/src/components/atoms/AppInput';
import { AppText } from '@/src/components/atoms/AppText';
import { AuthContainer } from '@/src/components/organisms/AuthContainer';
import { supabase } from '@/src/lib/supabase';
import { SPACING } from '@/src/styles/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Eits!', 'Email dan password harus diisi ya.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);

        if (error) {
            Alert.alert('Registrasi gagal', error.message);
        } else {
            Alert.alert('Berhasil', 'Cek email kamu untuk verifikasi ya!');
            router.replace('/(auth)/login');
        }
    };

    return (
        <AuthContainer>
            <View style={styles.header}>
                <AppText variant="title" style={styles.title}>
                    Buat Akun Baru
                </AppText>
                <AppText variant="caption">
                    Gabung sekarang dan mulai eksplorasi istilah baru.
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
                    title={loading ? "Tunggu sebentar..." : "Daftar Sekarang"}
                    onPress={handleRegister}
                />

                <View style={styles.footer}>
                    <AppText>Sudah punya akun? </AppText>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <AppText variant="link">Masuk</AppText>
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