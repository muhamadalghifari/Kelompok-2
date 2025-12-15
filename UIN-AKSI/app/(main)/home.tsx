import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { FadeInView } from '@/src/components/atoms/FadeInView';
import { FooterMini } from '@/src/components/organisms/FooterMini';
import { HomeCategories } from '@/src/components/organisms/HomeCategories';
import { HomeHero } from '@/src/components/organisms/HomeHero';
import { HomePopularTerms } from '@/src/components/organisms/HomePopularTerms';
import { HomeQuickActions } from '@/src/components/organisms/HomeQuickActions';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <FadeInView>
                <HomeHero onExplore={() => router.push('/(main)/terms')} />
            </FadeInView>

            <FadeInView delay={100}>
                <HomeQuickActions />
            </FadeInView>

            <FadeInView delay={200}>
                <HomePopularTerms />
            </FadeInView>

            <FadeInView delay={300}>
                <HomeCategories />
            </FadeInView>

            <FadeInView delay={400}>
                <FooterMini />
            </FadeInView>
        </ScrollView>
    );
}
