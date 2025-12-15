import { COLORS, SPACING } from '@/src/styles/theme';
import { StyleSheet, View } from 'react-native';

export function Divider() {
    return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.lg,
    },
});
