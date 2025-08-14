import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface NoteTextAreaProps extends TextInputProps {
    label: string;
}

export default function NoteTextArea({ label, ...props }: NoteTextAreaProps) {
    const borderColor = useThemeColor({}, 'icon');
    const backgroundColor = useThemeColor({}, 'background');

    return (
        <ThemedView style={styles.wrapper}>
            <ThemedText style={styles.label}>{label}</ThemedText>
            <TextInput
                style={[styles.textArea, { borderColor, backgroundColor }]}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                placeholderTextColor="#999"
                {...props}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    textArea: {
        height: 140,
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        fontSize: 16,
        textAlignVertical: 'top',
    },
});
