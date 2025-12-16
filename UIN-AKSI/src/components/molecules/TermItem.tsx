import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../atoms/AppText';

type Props = {
    title: string;
    description: string;
    onPress: () => void;
};

export function TermItem({ title, description, onPress }: Props) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.96,
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
        >
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <View style={{ flex: 1, marginRight: SPACING.sm }}>
                    <AppText style={styles.title} numberOfLines={1}>
                        {title}
                    </AppText>
                    <AppText variant="caption" numberOfLines={2}>
                        {description}
                    </AppText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: '#E2E8F0', // Subtle border color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        fontWeight: '600',
        marginBottom: 4,
        fontSize: 16,
    },
});
