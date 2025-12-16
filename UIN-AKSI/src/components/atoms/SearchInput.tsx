import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

export function SearchInput({ value, onChangeText }: Props) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={18} color={COLORS.muted} />
            <TextInput
                placeholder="Cari istilah kampus..."
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholderTextColor={COLORS.muted}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SPACING.md,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    input: {
        flex: 1,
        marginLeft: SPACING.sm,
        paddingVertical: SPACING.md,
    },
});
