import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppText } from '@/src/components/atoms/AppText';
import { SearchInput } from '@/src/components/atoms/SearchInput';
import { TermItem } from '@/src/components/molecules/TermItem';
import { supabase } from '@/src/lib/supabase'; // Import Supabase
import { COLORS, SPACING } from '@/src/styles/theme';
import { Term } from '@/src/types/term';

export default function TermsScreen() {
    const router = useRouter();
    const { category } = useLocalSearchParams();
    const [query, setQuery] = useState('');
    const [terms, setTerms] = useState<Term[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTerms = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from('terms')
                .select('*')
                .eq('user_id', user.id) // Filter by User ID
                .order('title', { ascending: true }); // Urutkan A-Z

            if (error) throw error;

            if (data) {
                setTerms(data as Term[]);
            }
        } catch (error) {
            console.error('Error fetching terms:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTerms();
        }, [])
    );

    const filteredTerms = terms.filter((item) => {
        // Filter by Search Query
        const matchesQuery = item.title
            .toLowerCase()
            .includes(query.toLowerCase());

        // Filter by Category (if selected)
        const matchesCategory = category
            ? item.category === category
            : true;

        return matchesQuery && matchesCategory;
    });

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.iconCircle}>
                <Ionicons name="search-outline" size={48} color={COLORS.white} />
            </View>
            <AppText style={styles.emptyTitle}>Tidak Ditemukan</AppText>
            <AppText style={styles.emptyDesc}>
                {loading
                    ? 'Sedang memuat data...'
                    : 'Maaf, istilah yang Anda cari tidak tersedia saat ini.'}
            </AppText>
        </View>
    );

    return (
        <View style={styles.container}>
            <SearchInput value={query} onChangeText={setQuery} />

            <View style={styles.statusContainer}>
                <AppText variant="caption" style={styles.statusText}>
                    {category
                        ? `Menampilkan istilah untuk kategori "${category}"`
                        : `Menampilkan total ${filteredTerms.length} istilah`}
                </AppText>

                {category && (
                    <TouchableOpacity
                        onPress={() => router.replace('/(main)/terms')}
                        style={styles.clearBadge}
                    >
                        <AppText style={styles.clearText}>Kembali ke daftar</AppText>
                    </TouchableOpacity>
                )}
            </View>

            {loading && terms.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <FlatList
                    data={filteredTerms}
                    keyExtractor={(item) => item.id.toString()} // Ensure string key
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
                                        created_at: item.created_at
                                    },
                                })
                            }
                        />
                    )}
                    contentContainerStyle={filteredTerms.length === 0 && styles.listContent}
                    ListEmptyComponent={renderEmptyState}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.lg,
        backgroundColor: COLORS.background,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SPACING.md,
    },
    statusText: {
        color: COLORS.muted,
        flex: 1,
    },
    clearBadge: {
        backgroundColor: COLORS.primarySoft,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    clearText: {
        fontSize: 12,
        color: COLORS.white,
        fontWeight: '600',
    },
    listContent: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        padding: SPACING.xl,
        marginTop: SPACING.xl,
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
        color: COLORS.text,
    },
    emptyDesc: {
        textAlign: 'center',
        color: COLORS.muted,
        lineHeight: 22,
    },
});
