import { COLORS, SPACING } from '@/src/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

interface AppInputProps extends Omit<TextInputProps, 'style'> {
    isPassword?: boolean;
    style?: StyleProp<ViewStyle>;
}

export function AppInput({ isPassword, style, ...props }: AppInputProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <View style={[styles.container, style]}>
            <TextInput
                {...props}
                style={styles.input}
                placeholderTextColor={COLORS.muted}
                secureTextEntry={isPassword && !isVisible}
            />
            {isPassword && (
                <TouchableOpacity onPress={toggleVisibility} style={styles.icon}>
                    <Ionicons
                        name={isVisible ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color={COLORS.muted}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 14,
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.md,
        backgroundColor: COLORS.white,
    },
    input: {
        flex: 1,
        paddingVertical: SPACING.md,
        fontSize: 14,
        color: COLORS.text,
    },
    icon: {
        marginLeft: SPACING.sm,
    },
});
