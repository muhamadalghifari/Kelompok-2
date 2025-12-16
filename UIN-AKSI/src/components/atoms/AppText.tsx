import { COLORS, FONT_SIZE } from '@/src/styles/theme';
import { StyleSheet, Text, TextProps } from 'react-native';

type TextVariant = 'title' | 'body' | 'caption' | 'link';

type Props = TextProps & {
    variant?: TextVariant;
};

export function AppText({
    children,
    variant = 'body',
    style,
    ...props
}: Props) {
    return (
        <Text
            {...props}
            style={[
                styles.base,
                variantStyles[variant],
                style,
            ]}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    base: {
        color: COLORS.text,
    },
});

const variantStyles = StyleSheet.create({
    title: {
        fontSize: FONT_SIZE.xl,
        fontWeight: '700',
    },
    body: {
        fontSize: FONT_SIZE.md,
    },
    caption: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.muted,
    },
    link: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.primary,
        fontWeight: '600',
    },
});
