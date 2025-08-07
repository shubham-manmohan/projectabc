import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import authClient from '@/services/authClient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function NewNoteScreen() {
    const [title, setTitle] = useState('');
    const [noteType, setNoteType] = useState('');
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreateNote = async () => {
        if (!title || !noteType || !preview) {
            Alert.alert('Missing fields', 'Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await authClient.post('/api/notes', {
                title,
                note_type: noteType,
                preview,
                timestamp: new Date().toISOString(),
                actions: [],
                bubbles: [],
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

            <ThemedText style={styles.label}>Preview</ThemedText>
            <TextInput
                style={[styles.input, styles.previewInput]}
                placeholder="Enter preview text"
                value={preview}
                multiline
                numberOfLines={4}
                onChangeText={setPreview}
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
    previewInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});
