import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from '../atoms/AppText';

type Props = {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
};

export function CategoryCard({ title, icon, onPress }: Props) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{ width: '48%', marginBottom: SPACING.md }}
        >
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <View style={styles.iconWrapper}>
                    <Ionicons name={icon} size={22} color={COLORS.black} />
                </View>
                <AppText style={styles.title}>{title}</AppText>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.primarySoft,
        borderRadius: 16,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)', // Subtle borders for colored cards
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconWrapper: {
        backgroundColor: COLORS.white,
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    title: {
        fontWeight: '600',
        fontSize: 14,
    },
});
