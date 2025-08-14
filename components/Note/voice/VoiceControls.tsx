import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

interface VoiceControlsProps {
    recordingState: 'idle' | 'recording' | 'paused' | 'recorded';
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onDone: () => void;
}

export default function VoiceControls({
    recordingState,
    onStart,
    onPause,
    onResume,
    onDone,
}: VoiceControlsProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const backgroundColor = isDark
        ? 'rgb(45, 45, 45)'
        : 'white';


    return (
        <ThemedView style={[styles.container]} darkColor={backgroundColor}>
            {recordingState === 'idle' && (
                <TouchableOpacity style={[styles.button]} onPress={onStart}>
                    <ThemedText >Start</ThemedText>
                </TouchableOpacity>
            )}
            {recordingState === 'recording' && (
                <>
                    <TouchableOpacity style={[styles.button]} onPress={onPause}>
                        <ThemedText >Pause</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={onDone}>
                        <ThemedText >Done</ThemedText>
                    </TouchableOpacity>
                </>
            )}
            {recordingState === 'paused' && (
                <>
                    <TouchableOpacity style={[styles.button]} onPress={onResume}>
                        <ThemedText >Resume</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={onDone}>
                        <ThemedText >Done</ThemedText>
                    </TouchableOpacity>
                </>
            )}
            {recordingState === 'recorded' && (
                <TouchableOpacity style={[styles.button]} onPress={onDone}>
                    <ThemedText >Done</ThemedText>
                </TouchableOpacity>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
});
