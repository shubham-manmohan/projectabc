// components/Note/NoteView.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Note } from '@/types/notetypes';
import Bubble from './Bubble';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

type Props = {
    note: Note;
};

export default function NoteView({ note }: Props) {
    const hasBubbles = note.bubbles && note.bubbles.length > 0;

    return (
        <ThemedView style={styles.container}>
            {!hasBubbles ? (
                <ThemedView style={styles.emptyState}>
                    <ThemedText type="default" style={styles.emptyText}>
                        No note content available.
                    </ThemedText>
                </ThemedView>
            ) : (
                <FlatList
                    data={note.bubbles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Bubble bubble={item} />}
                    contentContainerStyle={styles.listContent}
                    initialNumToRender={30}
                    maxToRenderPerBatch={50}
                    removeClippedSubviews
                    windowSize={30}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 8,
    },
    listContent: {
        paddingBottom: 24,
    },
    emptyState: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    emptyText: {
        opacity: 0.6,
        fontSize: 14,
        textAlign: 'center',
    },
});
