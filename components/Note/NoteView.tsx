import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Bubble from './Bubble';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { getNoteBubblesPaginated } from '@/services/notes';
import { Note, NoteBubble } from '@/types/notetypes';

type Props = {
    note: Note;
};

const PAGE_LIMIT = 10;

export default function NoteView({ note }: Props) {
    const [bubbles, setBubbles] = useState<NoteBubble[]>([]);
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const isFetchingNextPageRef = useRef(false);
    const lastFetchedPageRef = useRef(0);

    const fetchBubbles = useCallback(
        async (pageToLoad: number, skipIfLoading = false) => {
            if (skipIfLoading && loadingRef.current) return;
            if (pageToLoad === lastFetchedPageRef.current) return;

            lastFetchedPageRef.current = pageToLoad;
            setLoading(true);
            loadingRef.current = true;

            try {
                console.log("calling to get notes bubble:", note.id, pageToLoad, PAGE_LIMIT);
                const response = await getNoteBubblesPaginated(note.id, pageToLoad, PAGE_LIMIT);
                setBubbles(prev => [...prev, ...response.bubbles]);
                hasMoreRef.current = response.hasMore;
                setPage(pageToLoad);
            } catch (err) {
                console.error("Error loading bubbles:", err);
            } finally {
                setLoading(false);
                loadingRef.current = false;
                setInitialLoading(false);
            }
        },
        [note.id]
    );

    useEffect(() => {
        setBubbles([]);
        setPage(1);
        hasMoreRef.current = true;
        setInitialLoading(true);
        fetchBubbles(1, false);
    }, [fetchBubbles]);



    const loadMore = () => {
        if (loading || isFetchingNextPageRef.current || !hasMoreRef.current) return;

        isFetchingNextPageRef.current = true;
        fetchBubbles(page + 1).finally(() => {
            isFetchingNextPageRef.current = false;
        });
    };
    if (initialLoading) {
        return <ActivityIndicator size="small" style={{ marginTop: 20 }} />;
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
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="small" style={{ marginVertical: 12 }} /> : null
                    }
                    inverted // ✅ Show latest bubbles at bottom
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 2,
    },
    listContent: {
        paddingBottom: 8,
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
