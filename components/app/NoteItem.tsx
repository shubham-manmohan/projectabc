import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Note } from "@/services/dummydata";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

import { GestureHandlerRootView, } from "react-native-gesture-handler";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';


type NoteItemProps = {
    note: Note;
    onArchive: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onPin: (id: string) => void;
    onLongPress: (note: Note) => void;
    onSwipeOpen?: (ref: any) => void; // new
};


export default function NoteItem({ note, onArchive, onDelete, onEdit, onPin, onLongPress, onSwipeOpen }: NoteItemProps) {
    const renderRightActions = () => (
        <ThemedView style={styles.actionContainer}>
            <Pressable
                style={[styles.actionButton, styles.archiveButton]}
                onPress={() => onArchive(note.id)}
            >
                <AntDesign name="inbox" size={20} color="#fff" />
                <ThemedText style={styles.actionText}>Archive</ThemedText>
            </Pressable>

            <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => onDelete(note.id)}
            >
                <AntDesign name="delete" size={20} color="#fff" />
                <ThemedText style={styles.actionText}>Delete</ThemedText>
            </Pressable>
        </ThemedView>
    );
    const renderLeftActions = () => (
        <ThemedView style={styles.actionContainer}>
            <Pressable
                style={[styles.actionButton, styles.pinButton]}
                onPress={() => onPin(note.id)}
            >
                <AntDesign name="pushpin" size={20} color="#fff" />
                <ThemedText style={styles.actionText}>Pin</ThemedText>
            </Pressable>
        </ThemedView>
    );

    const swipeableRef = React.useRef(null);

    return (
        <GestureHandlerRootView>
            <ReanimatedSwipeable
                ref={swipeableRef}
                friction={1}
                rightThreshold={40}
                overshootRight={false}
                overshootLeft={false}
                renderRightActions={renderRightActions}
                onSwipeableOpen={() => {
                    if (onSwipeOpen) {
                        onSwipeOpen(swipeableRef);
                    }
                }}
                renderLeftActions={renderLeftActions}
            >
                <Pressable onPress={() => onEdit(note.id)}
                    onLongPress={() => onLongPress(note)}
                >
                    <ThemedView style={styles.container}>
                        <ThemedView style={styles.textContainer}>
                            <ThemedText type="title" style={styles.title}>
                                {note.title}
                            </ThemedText>

                            <ThemedView style={styles.metaRow}>
                                <ThemedText style={styles.type}><ThemedText type="defaultSemiBold" style={{ "fontSize": 12 }}> Type:</ThemedText>{note.type}</ThemedText>
                                <ThemedText style={styles.date}>{note.date}</ThemedText>
                            </ThemedView>

                            <ThemedText style={styles.preview} numberOfLines={1}>
                                {note.preview}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </Pressable>
            </ReanimatedSwipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 2,
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    type: {
        fontSize: 12,
        color: "#666",
    },
    date: {
        fontSize: 12,
        color: "#999",
    },
    preview: {
        fontSize: 13,
        color: "#999",
        marginTop: 2,
    },
    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        overflow: "hidden",
    },
    actionButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
    },
    archiveButton: {
        backgroundColor: "#4caf50",
    },
    deleteButton: {
        backgroundColor: "#f44336",
    },
    pinButton: {
        backgroundColor: "#a33aaa",
    },
    actionText: {
        color: "#fff",
        fontSize: 12,
        marginTop: 4,
    },
});
