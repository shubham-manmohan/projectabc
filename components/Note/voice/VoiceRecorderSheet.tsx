import React, { useCallback, useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import VoiceRecorderWrapper from "./VoiceRecorderWrapper";
import { ThemedView } from "@/components/ThemedView";

import { useColorScheme } from "@/hooks/useColorScheme";

export type VoiceRecorderSheetHandle = {
    open: () => void;
    close: () => void;
};

const VoiceRecorderSheet = forwardRef<VoiceRecorderSheetHandle>((_, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["50%", "90%"], []);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const backgroundColor = isDark
        ? 'rgb(45, 45, 45)'
        : 'white';


    const handleSheetChange = useCallback((index: number) => {
        console.log("handleSheetChange", index);
    }, []);

    // Expose open/close methods
    useImperativeHandle(ref, () => ({
        open: () => sheetRef.current?.snapToIndex(0),
        close: () => sheetRef.current?.close(),
    }));

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );
    return (
        <BottomSheet
            ref={sheetRef}
            index={-1} // start closed
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            onChange={handleSheetChange}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            handleStyle={{ backgroundColor: backgroundColor }}
            backgroundStyle={{ backgroundColor: backgroundColor, borderRadius: 20 }}
        >
            <BottomSheetScrollView contentContainerStyle={[styles.contentContainer]}>
                <ThemedView darkColor={backgroundColor}>
                    <ThemedText>New Recording 🎤</ThemedText>
                    <VoiceRecorderWrapper />
                </ThemedView>
            </BottomSheetScrollView>
        </BottomSheet>
    );
});

export default VoiceRecorderSheet;

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
        flex: 1
    },
});

VoiceRecorderSheet.displayName = "VoiceRecorderSheet";
