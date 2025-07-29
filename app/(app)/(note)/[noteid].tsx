import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { notes } from '@/services/dummydata';

export default function NoteDetailsScreen() {
    const { noteid } = useLocalSearchParams();
    const navigation = useNavigation();

    const note = notes.find((n) => n.id === noteid);

    useLayoutEffect(() => {
        if (note) {
            navigation.setOptions({
                headerTitle: () => (
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            maxWidth: 250, // tweak as needed
                        }}
                    >
                        {note.title}
                    </Text>
                ),
            });
        }
    }, [note, navigation]);

    if (!note) {
        return (
            <View>
                <Text>Note not found</Text>
            </View>
        );
    }

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24 }}>{note.title}</Text>
            <Text style={{ marginTop: 12 }}>{note.preview}</Text>
        </View>
    );
}
