import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function AudioVisualizer({ recordingState }: { recordingState: 'idle' | 'recording' | 'paused' | 'recorded' }) {
    const amplitude = useRef(new Animated.Value(0)).current;
    const tint = useThemeColor({}, 'tint');

    useEffect(() => {
        let anim: Animated.CompositeAnimation;
        if (recordingState === 'recording') {
            anim = Animated.loop(
                Animated.sequence([
                    Animated.timing(amplitude, { toValue: 1, duration: 300, useNativeDriver: true }),
                    Animated.timing(amplitude, { toValue: 0, duration: 300, useNativeDriver: true }),
                ])
            );
            anim.start();
        } else {
            amplitude.stopAnimation();
            amplitude.setValue(0);
        }
        return () => anim?.stop();
    }, [recordingState, amplitude]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.bar, { backgroundColor: tint, transform: [{ scaleY: amplitude.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] }) }] }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 24 },
    bar: { width: 32, height: 100, borderRadius: 4 },
});
