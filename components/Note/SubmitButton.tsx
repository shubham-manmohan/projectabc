import { StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SubmitButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
}

export default function SubmitButton({ title, onPress, loading }: SubmitButtonProps) {
    const background = useThemeColor({}, 'tint');
    const textColor = useThemeColor({}, 'background');

    return (
        <Pressable style={[styles.button, { backgroundColor: background }]} onPress={onPress} disabled={loading}>
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <ThemedText style={[styles.text, { color: textColor }]}>{title}</ThemedText>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 24,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
