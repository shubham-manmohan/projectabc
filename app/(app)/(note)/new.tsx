import { useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function NewNoteScreen() {
    const [title, setTitle] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");

    const textColor = useThemeColor({}, "text");
    const background = useThemeColor({}, "background");

    const handleRecordPress = () => {
        setIsRecording(!isRecording);
        // TODO: start or stop voice recording + update transcript
    };

    const handleSave = () => {
        console.log("Saving note:", { title, transcript });
        // TODO: save to DB or local storage
    };

    const handleClear = () => {
        setTitle("");
        setTranscript("");
        setIsRecording(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ThemedView style={styles.container}>
                <TextInput
                    placeholder="Title (optional)"
                    placeholderTextColor="#999"
                    style={[styles.input, { color: textColor, borderColor: "#ccc" }]}
                    value={title}
                    onChangeText={setTitle}
                />

                <View style={styles.transcriptBox}>
                    <ThemedText type="subtitle">Transcript</ThemedText>
                    <ThemedText>{transcript || "Your voice note will appear here..."}</ThemedText>
                </View>

                <TouchableOpacity onPress={handleRecordPress} style={styles.recordButton}>
                    <MaterialIcons
                        name={isRecording ? "stop" : "keyboard-voice"}
                        size={36}
                        color={background}
                    />
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleClear}>
                        <Feather name="trash-2" size={24} color={textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave}>
                        <Feather name="save" size={24} color={textColor} />
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "space-between",
    },
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingVertical: 8,
    },
    transcriptBox: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 16,
    },
    recordButton: {
        alignSelf: "center",
        backgroundColor: "#635BFF",
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        marginBottom: 24,
    },
});
