import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../atoms/AppText';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
};

export function QuickActionCard({ icon, label, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Ionicons name={icon} size={22} color={COLORS.primary} />
            <AppText style={styles.text}>{label}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: 16,
        alignItems: 'center',
    },
    text: {
        marginTop: SPACING.sm,
        fontSize: 12,
        fontWeight: '500',
    },
});
