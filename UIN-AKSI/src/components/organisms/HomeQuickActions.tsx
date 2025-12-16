import { SPACING } from '@/src/styles/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../atoms/AppText';
import { QuickActionCard } from '../molecules/QuickActionCard';

export function HomeQuickActions() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Akses Cepat</AppText>

            <View style={styles.row}>
                <QuickActionCard
                    icon="book-outline"
                    label="Istilah"
                    onPress={() => router.push('/(main)/terms')}
                />
                <QuickActionCard
                    icon="add-circle-outline"
                    label="Tambah"
                    onPress={() => router.push('/(main)/add')}
                />
                <QuickActionCard
                    icon="bookmark-outline"
                    label="Bookmark"
                    onPress={() => router.push('/(main)/bookmark')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        marginTop: SPACING.lg,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: SPACING.md,
    },
    row: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
});
