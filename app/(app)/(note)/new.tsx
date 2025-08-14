import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import authClient from '@/services/authClient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function NewNoteScreen() {
    const [title, setTitle] = useState('');
    const [noteType, setNoteType] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreateNote = async () => {
        if (!title || !noteType || !note) {
            Alert.alert('Missing fields', 'Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await authClient.post('/api/notes', {
                title,
                note_type: noteType,
                "preview": note,
                timestamp: new Date().toISOString(),
                actions: [],
                bubbles: [{
                    "note_bubble_type": "text",
                    "content": note,
                    "audio_path": "",
                    "owner": "USER",
                    "is_edited": false
                }],
            });

            Alert.alert('Success', 'Note created successfully...');
            console.log(response.data);
            router.back(); // or navigate somewhere else
        } catch (error: any) {
            console.error(error?.response?.data || error.message);
            Alert.alert('Error', 'Failed to create note.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>Title</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Enter note title"
                value={title}
                onChangeText={setTitle}
            />

            <ThemedText style={styles.label}>Note Type</ThemedText>
            <TextInput
                style={styles.input}
                placeholder="Enter note type"
                value={noteType}
                onChangeText={setNoteType}
            />

            <ThemedText style={styles.label}>Note</ThemedText>
            <TextInput
                style={[styles.input, styles.noteInput]}
                placeholder="Enter Note Content"
                value={note}
                multiline
                numberOfLines={4}
                onChangeText={setNote}
            />

            <Button title={loading ? 'Creating...' : 'Create Note'} onPress={handleCreateNote} disabled={loading} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        marginTop: 8,
        padding: 10,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    noteInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});
