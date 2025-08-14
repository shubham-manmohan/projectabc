import React from 'react';
import { TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

import { Ionicons } from '@expo/vector-icons';

export default function VoiceRecorderButton({ onPress }: { onPress: () => void }) {

    const tint = useThemeColor({}, 'tint');

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: tint }]} onPress={onPress}>
            <Pressable onPress={onPress} style={[styles.button, { backgroundColor: tint }]}>
                <Ionicons name="mic" size={36} color="white" />
            </Pressable>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignSelf: 'center',
        marginVertical: 16,
        // backgroundColor applied via theming
    },
});
