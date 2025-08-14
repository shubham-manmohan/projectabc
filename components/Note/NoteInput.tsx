import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface NoteInputProps extends TextInputProps {
    label: string;
}

export default function NoteInput({ label, ...props }: NoteInputProps) {
    const borderColor = useThemeColor({}, 'tint');
    const backgroundColor = useThemeColor({}, 'background');

    return (
        <ThemedView style={styles.wrapper}>
            <ThemedText style={styles.label}>{label}</ThemedText>
            <TextInput
                style={[styles.input, { borderColor, backgroundColor }]}
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
    input: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 6,
        fontSize: 16,
    },
});
