import { AppText } from '@/src/components/atoms/AppText';
import { SPACING } from '@/src/styles/theme';
import { Image, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export function HeroSection() {
    return (
        <Animated.View entering={FadeInDown.duration(600)}>
            <View style={{ alignItems: 'center', marginBottom: SPACING.lg }}>
                <Image
                    source={{
                        uri: 'https://illustrations.popsy.co/blue/studying.svg',
                    }}
                    style={{ width: 220, height: 220 }}
                    resizeMode="contain"
                />

                <AppText style={{ fontSize: 26, fontWeight: '700', marginTop: 12 }}>
                    UIN-AKSI
                </AppText>

                <AppText style={{ marginTop: 6, color: '#64748B' }}>
                    Aplikasi Kampus Sistem Informasi
                </AppText>
            </View>
        </Animated.View>
    );
}
