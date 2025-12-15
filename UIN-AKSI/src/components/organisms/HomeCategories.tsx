import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { TERM_CATEGORIES } from '@/src/constants/categories';
import { SPACING } from '@/src/styles/theme';
import { AppText } from '../atoms/AppText';
import { CategoryCard } from '../molecules/CategoryCard';

export function HomeCategories() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>Kategori Istilah</AppText>

            <View style={styles.grid}>
                {TERM_CATEGORIES.map((item) => (
                    <CategoryCard
                        key={item.id}
                        title={item.title}
                        icon={item.icon as any}
                        onPress={() =>
                            router.push({
                                pathname: '/(main)/terms',
                                params: { category: item.title },
                            })
                        }
                    />
                ))}
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
