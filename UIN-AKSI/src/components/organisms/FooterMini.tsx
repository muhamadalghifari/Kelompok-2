import { COLORS, SPACING } from '@/src/styles/theme';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../atoms/AppText';
import { Divider } from '../atoms/Divider';

export function FooterMini() {
    return (
        <View style={styles.container}>
            <Divider />
            <AppText style={styles.appName}>UIN AKSI</AppText>
            <AppText style={styles.caption}>
                Daftar Istilah Kampus • v1.0.0
            </AppText>
            <AppText style={styles.copy}>
                © 2025 Doni Setiawan
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: SPACING.xl,
    },
    appName: {
        fontWeight: '600',
        marginBottom: 4,
    },
    caption: {
        fontSize: 12,
        color: COLORS.muted,
    },
    copy: {
        fontSize: 11,
        color: COLORS.muted,
        marginTop: 4,
    },
});
