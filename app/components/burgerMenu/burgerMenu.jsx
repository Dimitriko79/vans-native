import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay
} from 'react-native-reanimated';

const BurgerMenu = ({ onPress, isOpen }) => {
    const barTranslation = useSharedValue(-5);
    const barRotation = useSharedValue(0);
    const middleBarScale = useSharedValue(1);

    if (isOpen) {
        barTranslation.value = withTiming(5, { duration: 200 });

        middleBarScale.value = withDelay(100, withTiming(0, { duration: 100 }));

        barRotation.value = withDelay(200, withTiming(45, { duration: 300 }));
    } else {
        barRotation.value = withTiming(0, { duration: 300 });

        middleBarScale.value = withDelay(150, withTiming(1, { duration: 100 }));

        barTranslation.value = withDelay(150, withTiming(-5, { duration: 200 }));
    }

    const topBarStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: barTranslation.value }, { rotate: `${barRotation.value}deg` }]
    }));

    const bottomBarStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: -barTranslation.value }, { rotate: `-${barRotation.value}deg` }]
    }));

    const middleBarStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: middleBarScale.value }]
    }));

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.burger}>
                <Animated.View style={[styles.bar, topBarStyle]} />
                <Animated.View style={[styles.bar, middleBarStyle]} />
                <Animated.View style={[styles.bar, bottomBarStyle]} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    burger: {
        width: 30,
        height: 13,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bar: {
        width: 30,
        height: 2,
        backgroundColor: '#000',
        borderRadius: 2
    }
});

export default BurgerMenu;