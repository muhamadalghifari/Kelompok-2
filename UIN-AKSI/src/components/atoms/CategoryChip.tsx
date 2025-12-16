import { COLORS, SPACING } from '@/src/styles/theme';
import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';

type Props = {
    label: string;
};

export function CategoryChip({ label }: Props) {
    return (
        <View style={styles.chip}>
            <AppText style={styles.text}>{label}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    chip: {
        backgroundColor: COLORS.primarySoft,
        paddingHorizontal: SPACING.md,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.white, // Keep white if primarySoft is used as background in theme (it was #5f75bbff which is dark enough for white text)
    },
});
