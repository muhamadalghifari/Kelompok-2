
import { useBookmark } from '@/src/context/BookmarkContext';
import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../atoms/AppText';
import { CategoryChip } from '../atoms/CategoryChip';
import { TermDetailSection } from '../molecules/TermDetailSection';

type Props = {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUri?: string;
};

export function TermDetailContent({
    id,
    title,
    description,
    category,
    imageUri,
}: Props) {
    const { bookmarks, toggleBookmark } = useBookmark();
    const isBookmarked = bookmarks.some((item) => item.id === id);

    return (
        <View style={styles.container}>
            {/* Header Background */}
            <View style={styles.headerBackground} />

            {/* Main Card */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <CategoryChip label={category} />
                    <TouchableOpacity
                        style={styles.bookmarkBtn}
                        onPress={() =>
                            toggleBookmark({ id, title, description, category })
                        }
                    >
                        <Ionicons
                            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={22}
                            color={isBookmarked ? COLORS.primary : COLORS.muted}
                        />
                    </TouchableOpacity>
                </View>

                <AppText style={styles.title}>{title}</AppText>

                <View style={styles.divider} />

                <TermDetailSection
                    title="Deskripsi"
                    content={description}
                    icon="book-outline"
                />

                <TermDetailSection
                    title="Contoh Penggunaan"
                    content={`Istilah ${title} sering digunakan dalam konteks akademik di lingkungan kampus.`}
                    icon="chatbubble-ellipses-outline"
                />

                {imageUri && (
                    <View style={{ marginBottom: SPACING.lg }}>
                        <View style={styles.header}>
                            <Ionicons
                                name="image-outline"
                                size={18}
                                color={COLORS.primary}
                                style={{ marginRight: 8 }}
                            />
                            <AppText style={styles.sectionTitle}>FOTO</AppText>
                        </View>
                        <Image source={{ uri: imageUri }} style={styles.imageConfigured} resizeMode="cover" />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerBackground: {
        height: 120, // Reduced height since image is gone
        backgroundColor: COLORS.primarySoft,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    // Removed old image/placeholder styles
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        marginHorizontal: SPACING.lg,
        marginTop: 80, // Adjustable
        padding: SPACING.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: SPACING.lg,
        minHeight: 400,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    bookmarkBtn: {
        padding: 8,
        backgroundColor: COLORS.background,
        borderRadius: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: SPACING.lg,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.muted,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    imageConfigured: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginTop: 8,
        backgroundColor: COLORS.border,
    }
});
