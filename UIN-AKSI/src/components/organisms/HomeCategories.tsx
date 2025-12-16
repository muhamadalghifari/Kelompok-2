import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { supabase } from '@/src/lib/supabase';
import { SPACING } from '@/src/styles/theme';
import { AppText } from '../atoms/AppText';
import { CategoryCard } from '../molecules/CategoryCard';

export function HomeCategories() {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (data) {
            setCategories(data);
        }
    };

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Kategori Istilah</AppText>

            <View style={styles.grid}>
                {categories.length === 0 ? (
                    <AppText style={{ color: '#999' }}>Memuat kategori...</AppText>
                ) : (
                    categories.map((item: any) => (
                        <CategoryCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            onPress={() =>
                                router.push({
                                    pathname: '/(main)/terms',
                                    params: { category: item.name },
                                })
                            }
                        />
                    ))
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        marginTop: SPACING.xl,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: SPACING.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
