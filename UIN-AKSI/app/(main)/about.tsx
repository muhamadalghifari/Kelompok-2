import { AppText } from '@/src/components/atoms/AppText';
import { globalContainer } from '@/src/styles/global';
import { COLORS, SPACING } from '@/src/styles/theme';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function AboutScreen() {
    return (
        <ScrollView style={globalContainer}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: 'https://illustrations.popsy.co/blue/teamwork.svg',
                    }}
                    style={styles.image}
                    resizeMode="contain"
                />

                <AppText style={styles.title}>Tentang Aplikasi</AppText>

                <AppText style={styles.description}>
                    Aplikasi "UIN-AKSI" adalah panduan digital untuk mahasiswa
                    mengenal istilah akademik dan administrasi di kampus.
                    Tujuan aplikasi ini adalah mempermudah mahasiswa baru maupun lama
                    dalam memahami istilah yang sering digunakan di lingkungan kampus.
                </AppText>

                <AppText style={styles.subtitle}>Versi 1.0.0</AppText>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: SPACING.lg,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: SPACING.md,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: SPACING.sm,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: SPACING.md,
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.muted,
    },
});
