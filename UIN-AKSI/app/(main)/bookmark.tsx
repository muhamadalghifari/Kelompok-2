import { AppText } from '@/src/components/atoms/AppText';
import { TermItem } from '@/src/components/molecules/TermItem';
import { useBookmark } from '@/src/context/BookmarkContext';
import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

export default function BookmarkScreen() {
    const { bookmarks, isLoading } = useBookmark();
    const router = useRouter();

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.title}>Istilah Tersimpan</AppText>
                <AppText variant="caption">
                    Daftar istilah yang sudah kamu tandai.
                </AppText>
            </View>

            {bookmarks.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="bookmark-outline" size={64} color={COLORS.border} />
                    <AppText style={styles.emptyText}>Belum ada bookmark.</AppText>
                    <AppText variant="caption" style={{ textAlign: 'center' }}>
                        Yuk cari istilah menarik dan simpan di sini!
                    </AppText>
                </View>
            ) : (
                <FlatList
                    data={bookmarks}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: SPACING.xl }}
                    renderItem={({ item }) => (
                        <TermItem
                            title={item.title}
                            description={item.description}
                            onPress={() =>
                                router.push({
                                    pathname: '/(main)/term-detail',
                                    params: {
                                        id: item.id,
                                        title: item.title,
                                        description: item.description,
                                        category: item.category,
                                        imageUri: item.image_url,
                                        user_id: item.user_id,
                                        created_at: item.created_at,
                                    },
                                })
                            }
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.lg,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: SPACING.xl,
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: SPACING.xs,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: SPACING.md,
        color: COLORS.muted,
    },
});
