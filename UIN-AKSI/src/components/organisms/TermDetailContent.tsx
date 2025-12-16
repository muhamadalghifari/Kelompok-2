

import { useBookmark } from '@/src/context/BookmarkContext';
import { supabase } from '@/src/lib/supabase';
import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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
    const router = useRouter();
    const isBookmarked = bookmarks.some((item) => item.id === id);

    const handleDelete = async () => {
        Alert.alert(
            'Hapus Istilah',
            'Apakah Anda yakin ingin menghapus istilah ini? Tindakan ini tidak dapat dibatalkan.',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const { error } = await supabase.from('terms').delete().eq('id', id);
                            if (error) throw error;
                            router.replace('/(main)/home');
                        } catch (e) {
                            Alert.alert('Error', 'Gagal menghapus istilah');
                        }
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        router.push({ pathname: '/(main)/edit-term/[id]', params: { id } });
    };

    return (
        <View style={styles.container}>
            {/* Header Background */}
            <View style={styles.headerBackground} />

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
            </TouchableOpacity>

            {/* Main Card */}
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <CategoryChip label={category} />
                    {/* Actions Row */}
                    <View style={styles.actionsContainer}>
                        {/* Bookmark Button */}
                        <TouchableOpacity
                            style={[styles.iconBtn, isBookmarked && styles.iconBtnActive]}
                            onPress={() =>
                                toggleBookmark({
                                    id,
                                    title,
                                    description,
                                    category,
                                    image_url: imageUri || '',
                                    user_id: '',
                                    created_at: new Date().toISOString()
                                })
                            }
                        >
                            <Ionicons
                                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                                size={20}
                                color={isBookmarked ? COLORS.primary : COLORS.muted}
                            />
                        </TouchableOpacity>

                        {/* Edit Button */}
                        <TouchableOpacity style={styles.iconBtn} onPress={handleEdit}>
                            <Ionicons name="create-outline" size={20} color={COLORS.muted} />
                        </TouchableOpacity>

                        {/* Delete Button */}
                        <TouchableOpacity style={[styles.iconBtn, styles.deleteBtn]} onPress={handleDelete}>
                            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                        </TouchableOpacity>
                    </View>
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
        height: 120, // Reduced height
        backgroundColor: COLORS.primarySoft,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: SPACING.lg,
        zIndex: 10,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 6,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        marginHorizontal: SPACING.lg,
        marginTop: 100,
        padding: SPACING.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: SPACING.lg,
        minHeight: 400,
        zIndex: 5, // Ensure card is above header background
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconBtnActive: {
        backgroundColor: COLORS.primarySoft,
        borderColor: COLORS.primary,
    },
    deleteBtn: {
        borderColor: COLORS.error + '40', // slightly transparent error color
        backgroundColor: '#FFF0F0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: SPACING.md,
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
