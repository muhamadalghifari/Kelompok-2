import { ReactNode, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type Props = {
    children: ReactNode;
    delay?: number;
};

export function FadeInView({ children, delay = 0 }: Props) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(12)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
        }).start();

        Animated.timing(translateY, {
            toValue: 0,
            duration: 400,
            delay,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity,
                transform: [{ translateY }],
            }}
        >
            {children}
        </Animated.View>
    );
}
