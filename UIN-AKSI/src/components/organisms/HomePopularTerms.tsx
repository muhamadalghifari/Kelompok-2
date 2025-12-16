import { supabase } from '@/src/lib/supabase';
import { Term } from '@/src/types/term';
import { useFocusEffect, useRouter } from 'expo-router'; // Gunakan useFocusEffect
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { SPACING } from '@/src/styles/theme';
import { AppText } from '../atoms/AppText';
import { TermItem } from '../molecules/TermItem';

export function HomePopularTerms() {
    const router = useRouter();
    const [terms, setTerms] = useState<Term[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTerms = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            // Ambil 5 istilah terbaru milik USER INI saja
            const { data, error } = await supabase
                .from('terms')
                .select('*')
                .eq('user_id', user.id) // Filter by User ID
                .order('created_at', { ascending: false })
                .limit(5);

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

    // Panggil setiap kali layar fokus (agar update setelah add)
    useFocusEffect(
        useCallback(() => {
            fetchTerms();
        }, [])
    );

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Istilah Terbaru</AppText>

            {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
            ) : terms.length === 0 ? (
                <AppText style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>
                    Belum ada istilah nih. Yuk tambah!
                </AppText>
            ) : (
                terms.map((item) => (
                    <TermItem
                        key={item.id}
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
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        marginTop: SPACING.lg,
        marginBottom: 100,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: SPACING.md,
    },
});
