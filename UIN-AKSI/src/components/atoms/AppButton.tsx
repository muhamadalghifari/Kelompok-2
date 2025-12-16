import { COLORS, SPACING } from '@/src/styles/theme';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AppText } from './AppText';

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<any>; // Allow custom text styles
};

export function AppButton({ title, onPress, disabled, style, textStyle }: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <AppText style={[styles.text, textStyle]}>{title}</AppText>
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
