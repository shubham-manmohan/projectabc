import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Bubble from './Bubble';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { getNoteBubblesPaginated } from '@/services/notes';
import { Note, NoteBubble } from '@/types/notetypes';

type Props = {
    note: Note;
};

export default function NoteView({ note }: Props) {
    const [bubbles, setBubbles] = useState<NoteBubble[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const fetchBubbles = useCallback(async (pageToLoad: number, skipIfLoading = false) => {
        setLoading(prev => {
            if (skipIfLoading && prev) return true; // exit early
            return true;
        });

        try {
            const response = await getNoteBubblesPaginated(note.id, pageToLoad, 10);
            setBubbles(prev => [...prev, ...response.bubbles]);
            setHasMore(response.hasMore);
            setPage(pageToLoad);
        } catch (err) {
            console.error("Error loading bubbles:", err);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, [note.id]);


    useEffect(() => {
        setBubbles([]); // reset when note changes
        setPage(1);
        setHasMore(true);
        setInitialLoading(true);
        fetchBubbles(1, false);
    }, [note.id, fetchBubbles]);

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchBubbles(page + 1); // use latest page state
        }
    };

    if (initialLoading) {
        return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    return (
        <ThemedView style={styles.container}>
            {bubbles.length === 0 ? (
                <ThemedView style={styles.emptyState}>
                    <ThemedText type="default" style={styles.emptyText}>
                        No note content available.
                    </ThemedText>
                </ThemedView>
            ) : (
                <FlatList
                    data={bubbles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Bubble bubble={item} />}
                    contentContainerStyle={styles.listContent}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="small" style={{ marginVertical: 12 }} /> : null
                    }
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
