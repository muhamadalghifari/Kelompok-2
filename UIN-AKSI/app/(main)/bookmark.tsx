import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { TermItem } from '@/src/components/molecules/TermItem';
import { useBookmark } from '@/src/context/BookmarkContext';
import { COLORS, SPACING } from '@/src/styles/theme';

export default function BookmarkScreen() {
    const router = useRouter();
    const { bookmarks } = useBookmark();

    if (bookmarks.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.iconCircle}>
                    <Ionicons name="bookmark" size={48} color={COLORS.white} />
                </View>
                <AppText style={styles.emptyTitle}>Belum ada simpanan</AppText>
                <AppText style={styles.emptyDesc}>
                    Istilah yang Anda tandai akan muncul di sini agar mudah diakses.
                </AppText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.headerTitle}>Disimpan</AppText>
                <AppText style={styles.headerSubtitle}>
                    {bookmarks.length} istilah
                </AppText>
            </View>

            <FlatList
                data={bookmarks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: SPACING.xl }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TermItem
                        title={item.title}
                        description={item.description}
                        onPress={() =>
                            router.push({
                                pathname: '/(main)/term-detail',
                                params: item,
                            })
                        }
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: SPACING.lg,
        marginTop: SPACING.lg,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    headerSubtitle: {
        color: COLORS.muted,
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primarySoft,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: SPACING.sm,
    },
    emptyDesc: {
        textAlign: 'center',
        color: COLORS.muted,
        lineHeight: 22,
    },
});
