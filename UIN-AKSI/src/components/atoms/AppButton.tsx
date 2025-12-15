import { COLORS, SPACING } from '@/src/styles/theme';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from './AppText';

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
};

export function AppButton({ title, onPress, disabled }: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.btncolor,
        paddingVertical: SPACING.md,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: SPACING.sm,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    text: {
        color: COLORS.white,
        fontWeight: '600',
    },
    disabled: {
        backgroundColor: COLORS.muted,
        borderColor: COLORS.muted,
        opacity: 0.7,
    },
});
