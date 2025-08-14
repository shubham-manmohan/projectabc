import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import VoiceControls from "./VoiceControls";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function VoiceRecorderWrapper() {

    const [recordingState, setRecordingState] = useState<"idle" | "recording" | "paused" | "recorded">("idle");

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const backgroundColor = isDark
        ? 'rgb(45, 45, 45)'
        : 'white';


    // 🧪 Dummy placeholder functions
    const handleStart = () => {
        console.log('Start Recording');
        setRecordingState("recording");
    };

    const handlePause = () => {
        console.log('Pause Recording');
        setRecordingState("paused");
    };

    const handleResume = () => {
        console.log('Resume Recording');
        setRecordingState("recording");
    };

    const handleDone = () => {
        console.log('Done Recording');
        setRecordingState("recorded");
    };

    return (
        <ThemedView darkColor={backgroundColor}>
            <VoiceControls
                recordingState={recordingState}
                onStart={handleStart}
                onPause={handlePause}
                onResume={handleResume}
                onDone={handleDone}
            />
        </ThemedView>
    );
}


