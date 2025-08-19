//File components/Note/NewNoteForm.tsx

import { useRef, useState } from 'react';
import {
    Alert,
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NoteInput from './NoteInput';
import NoteTextArea from './NoteTextArea';
import SubmitButton from './SubmitButton';
import { ThemedView } from '@/components/ThemedView';
import authClient from '@/services/authClient';
import VoiceRecorderSheet, { VoiceRecorderSheetHandle } from './voice/VoiceRecorderSheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NoteDropdown from './NoteDropdown';

export default function NewNoteForm() {
    const [title, setTitle] = useState('');
    const [noteType, setNoteType] = useState('Prescription');
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
                preview: note,
                timestamp: new Date().toISOString(),
                actions: [],
                bubbles: [
                    {
                        note_bubble_type: 'text',
                        content: note,
                        audio_path: '',
                        owner: 'USER',
                        is_edited: false,
                    },
                ],
            });

            Alert.alert('Success', 'Note created successfully.');
            console.log(response);
            router.back();
        } catch (error: any) {
            console.error(error?.response?.data || error.message);
            Alert.alert('Error', 'Failed to create note.');
        } finally {
            setLoading(false);
        }
    };

    const sheetRef = useRef<VoiceRecorderSheetHandle>(null);

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            contentContainerStyle={styles.scrollContent}
        >
            <ThemedView style={styles.formContainer}>
                <NoteInput label="Title" value={title} onChangeText={setTitle} placeholder="Enter title" />
                <NoteDropdown label="Note Type" value={noteType} onValueChange={setNoteType} />
                <NoteTextArea label="Note" value={note} onChangeText={setNote} placeholder="Enter content..." />
                <SubmitButton title="Create Note" onPress={handleCreateNote} loading={loading} />
            </ThemedView>
            <VoiceRecorderSheet ref={sheetRef} />
            <MaterialCommunityIcons
                style={{ position: "absolute", bottom: 40, right: 20 }}
                name="record-circle"
                size={50}
                color="red"
                onPress={() => sheetRef.current?.open()}
            />
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80,
        flexGrow: 1,
    },
    formContainer: {
        padding: 16,
    },
});
