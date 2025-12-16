import { AppText } from '@/src/components/atoms/AppText';
import { COLORS } from '@/src/styles/theme';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(auth)/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>UIN-AKSI</AppText>
            <AppText>Aplikasi kampus Sistem Informasi</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    },
});
