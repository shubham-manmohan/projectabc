import React, { useState } from "react";
import { FlatList, Alert, Modal } from "react-native";
import NoteItem from "./NoteItem";
import { notes as dummyNotes, Note } from "@/services/dummydata";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";

export default function NotesList() {
    const [notes, setNotes] = useState<Note[]>(dummyNotes);

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openSwipeRef = React.useRef<any>(null);

    const handleSwipeOpen = (ref: any) => {
        if (openSwipeRef?.current && openSwipeRef.current !== ref) {
            openSwipeRef?.current?.current?.close(); // Close previously opened swipeable
        }
        openSwipeRef.current = ref;
    };

    const handleArchive = (id: string) => {
        Alert.alert("Archive", "Are you sure you want to archive this note?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Archive",
                onPress: () => {
                    setNotes((prev) => prev.filter((note) => note.id !== id));
                    // You can add archive logic here
                },
            },
        ]);
    };

    const handleDelete = (id: string) => {
        Alert.alert("Delete", "Are you sure you want to delete this note?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    setNotes((prev) => prev.filter((note) => note.id !== id));
                },
            },
        ]);
    };

    const handleEdit = (id: string) => {
        // Navigate to edit screen or open modal
        console.log("Edit note id:", id);
    };

    const handlePin = (id: string) => {
        console.log("Pin Node:", id);
    };


    const handleLongPress = async (note: Note) => {
        setSelectedNote(note);
        setModalVisible(true);
    };

    const handleOption = (option: string) => {
        console.log(`${option} for note ${selectedNote?.title}`);
        setModalVisible(false);
    };

    return (
        <>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onArchive={handleArchive}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onPin={handlePin}
                        onLongPress={handleLongPress}
                        onSwipeOpen={handleSwipeOpen}
                    />
                )}
                contentContainerStyle={{ paddingVertical: 0, paddingBottom: 80 }}
            />
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
            >
                <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", padding: 16 }}>
                    <ThemedView
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            padding: 16,
                        }}
                    >
                        <ThemedText type="title" style={{ marginBottom: 12 }}>
                            {selectedNote?.title}
                        </ThemedText>
                        {["Pin", "Add to Favorites", "Lock", "Delete"].map((action) => (
                            <Pressable
                                key={action}
                                onPress={() => handleOption(action)}
                                style={{ paddingVertical: 12 }}
                            >
                                <ThemedText>{action}</ThemedText>
                            </Pressable>
                        ))}
                    </ThemedView>
                </GestureHandlerRootView>
            </Modal>

        </>
    );
}
