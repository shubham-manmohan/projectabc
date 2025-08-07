//File components/app/NoteList.tsx

import React, { useEffect, useState } from "react";
import { FlatList, Alert, Modal, StyleSheet, ActivityIndicator } from "react-native";
import NoteItem from "./NoteItem";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";

import { useColorScheme } from '@/hooks/useColorScheme';
import { Note } from "@/types/notetypes";
import { getAllNotes } from "@/services/notes";

export default function NotesList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

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

    const handleArchive = (id: number) => {
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

    const handleDelete = (id: number) => {
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

    const handleEdit = (id: number) => {
        router.navigate({
            pathname: '/(app)/(note)/[noteid]',
            params: { noteid: id }
        })
    };



    const handlePin = (id: number) => {
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


    const loadMoreNotes = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await getAllNotes(page + 1, 10);
            setNotes((prev) => [...prev, ...response.notes]);
            setHasMore(response.hasMore);
            setPage((prevPage) => prevPage + 1); // ensure you're always incrementing based on latest state
        } catch (err) {
            console.error("Error loading notes:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // initial load
        const fetchInitialNotes = async () => {
            setLoading(true);
            try {
                const response = await getAllNotes(1, 10);
                setNotes(response.notes);
                setHasMore(response.hasMore);
                setPage(1);
            } catch (err) {
                console.error("Error loading initial notes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialNotes();
    }, []);





    return (
        <>
            <ThemedView style={styles.wrapper}>
                <SafeSearchBar
                    key="search-bar"
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
                    clearIcon={{ type: "material", name: "close", key: "close-icon-key" }}
                    searchIcon={{ type: "material", name: "search", key: "search-icon-key" }}
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
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <NoteItem
                        key={item.id}
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
                onEndReached={loadMoreNotes}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="small" style={{ marginVertical: 12 }} /> : null}
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
