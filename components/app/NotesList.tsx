import React, { useState } from "react";
import { FlatList, Alert, Modal, StyleSheet } from "react-native";
import NoteItem from "./NoteItem";
import { notes as dummyNotes, Note } from "@/services/dummydata";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";

import { useColorScheme } from '@/hooks/useColorScheme';

export default function NotesList() {
    const [notes, setNotes] = useState<Note[]>(dummyNotes);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openSwipeRef = React.useRef<any>(null);

    const router = useRouter();

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
        router.navigate({
            pathname: '/(app)/(note)/[noteid]',
            params: { noteid: id }
        })
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

    const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <>
            <ThemedView style={styles.wrapper}>
                <SafeSearchBar
                    platform="default"
                    placeholder="Search notes..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                    containerStyle={[
                        styles.containerBase,
                        {
                            backgroundColor: "transparent", // keep outer transparent
                        },
                    ]}
                    inputContainerStyle={[
                        styles.inputBase,
                        {
                            backgroundColor: isDark ? "#1c1c1e" : "#f1f1f3",
                            borderColor: isDark ? "#3a3a3c" : "#d0d0d0",
                        },
                    ]}
                    inputStyle={{ fontSize: 16, color: isDark ? "#fff" : "#000" }}
                    clearIcon={{ type: "material", name: "close" }}
                    searchIcon={{ type: "material", name: "search" }}
                    loadingProps={{ size: "small" }}
                    showLoading={false}
                    onCancel={() => setSearchQuery("")}
                    onClear={() => setSearchQuery("")}
                    onFocus={() => { }}
                    onBlur={() => { }}
                />
            </ThemedView>
            <FlatList
                data={filteredNotes}
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
            // ItemSeparatorComponent={() => { return (<View style={{ height: 1, backgroundColor: 'black' }}></View>) }}
            />
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
            >
                <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", padding: 16 }}>
                    <ThemedView
                        style={{
                            backgroundColor: isDark ? "#1c1c1e" : "#f1f1f3",
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
const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 2,
        paddingTop: 0,
    },
    containerBase: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 2,
    },
    inputBase: {
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 0,
    },
});
