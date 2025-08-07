import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { getNoteById } from '@/services/notes';
import { Note } from '@/types/notetypes';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NoteView from '@/components/Note/NoteView';

export default function NoteDetailsScreen() {
    const { noteid } = useLocalSearchParams();
    const navigation = useNavigation();

    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNote = async () => {
            try {
                const data = await getNoteById(noteid as string);
                setNote(data);
            } catch (error) {
                console.error('Failed to fetch note', error);
            } finally {
                setLoading(false);
            }
        };

        loadNote();
    }, [noteid]);

    // ✅ Safe header title update
    useLayoutEffect(() => {
        if (note?.title) {
            navigation.setOptions({
                headerTitle: () => (
                    <ThemedText
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            maxWidth: 250,
                        }}
                    >
                        {note.title}
                    </ThemedText>
                ),
            });
        }
    }, [note?.title, navigation]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    if (!note) {
        return (
            <ThemedView style={styles.emptyState}>
                <ThemedText type="default" style={styles.emptyText}>
                    Note Not Found.
                </ThemedText>
            </ThemedView>
        );
    }

    return (
        <NoteView note={note} />
    );
}


const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
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