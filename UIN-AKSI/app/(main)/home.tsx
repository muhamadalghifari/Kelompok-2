import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { AppButton } from '@/src/components/atoms/AppButton';
import { FadeInView } from '@/src/components/atoms/FadeInView';
import { FooterMini } from '@/src/components/organisms/FooterMini';
import { HomeCategories } from '@/src/components/organisms/HomeCategories';
import { HomeHero } from '@/src/components/organisms/HomeHero';
import { HomePopularTerms } from '@/src/components/organisms/HomePopularTerms';
import { HomeQuickActions } from '@/src/components/organisms/HomeQuickActions';
import { COLORS } from '@/src/styles/theme';

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

            <FadeInView delay={350}>
                <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                    <AppButton
                        title="Tentang Aplikasi"
                        onPress={() => router.push('/(main)/about')}
                        style={{ backgroundColor: COLORS.primarySoft, borderWidth: 0 }}
                        textStyle={{ color: COLORS.white, fontWeight: 'bold' }}
                    />
                </View>
            </FadeInView>

            <FadeInView delay={400}>
                <FooterMini />
            </FadeInView>
        </ScrollView>
    );
}
