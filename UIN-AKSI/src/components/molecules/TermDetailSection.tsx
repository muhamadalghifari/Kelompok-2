import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../atoms/AppText';

type Props = {
    title: string;
    content: string;
    icon?: keyof typeof Ionicons.glyphMap;
};

export function TermDetailSection({ title, content, icon }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={18}
                        color={COLORS.primary}
                        style={{ marginRight: 8 }}
                    />
                )}
                <AppText style={styles.title}>{title}</AppText>
            </View>
            <AppText style={styles.content}>{content}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.muted,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: COLORS.text,
    },
});
