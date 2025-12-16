import { COLORS, SPACING } from '@/src/styles/theme';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
    children: ReactNode;
};

export function AuthContainer({ children }: Props) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SPACING.xl,
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
});
