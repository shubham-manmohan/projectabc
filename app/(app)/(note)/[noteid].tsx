import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { notes } from '@/services/dummydata';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NoteDetailsScreen() {
    const { noteid } = useLocalSearchParams();
    const navigation = useNavigation();

    const note = notes.find((n) => n.id === noteid);

    useLayoutEffect(() => {
        if (note) {
            navigation.setOptions({
                headerTitle: () => (
                    <ThemedText
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            maxWidth: 250, // tweak as needed
                        }}
                    >
                        {note.title}
                    </ThemedText>
                ),
            });
        }
    }, [note, navigation]);

    if (!note) {
        return (
            <ThemedView>
                <ThemedText>Note not found</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={{ padding: 16 }}>
            <ThemedText style={{ fontSize: 24 }}>{note.title}</ThemedText>
            <ThemedText style={{ marginTop: 12 }}>{note.preview}</ThemedText>
        </ThemedView>
    );
}
