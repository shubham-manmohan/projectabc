import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { NoteBubble } from '@/types/notetypes';
import { format } from 'date-fns';
import { enIN } from 'date-fns/locale';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type Props = {
    bubble: NoteBubble;
};

const Bubble: React.FC<Props> = ({ bubble }) => {
    const isUser = bubble.owner === 'USER';

    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];
    //   const isDark = colorScheme === 'dark';

    // Background for USER vs SYSTEM
    // Background for USER vs SYSTEM with gradient-like soft tones
    const backgroundColor = isUser
        ? colorScheme === 'dark'
            ? 'rgba(172, 167, 235, 0.15)'
            : 'rgba(99, 91, 255, 0.08)'
        : colorScheme === 'dark'
            ? 'rgba(249, 225, 255, 0.25)'
            : 'rgba(230, 140, 255, 0.1)';


    const getIconName = () => {
        switch (bubble.note_bubble_type) {
            case 'audio':
                return 'mic';
            case 'transcript':
                return 'subtitles';
            default:
                return 'text-fields';
        }
    };

    const formattedTime = format(new Date(bubble.timestamp), 'MMM dd, yyyy, hh:mm a', {
        locale: enIN,
    });

    return (
        <ThemedView
            style={[
                styles.container,
                {
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    backgroundColor,
                },
            ]}
        >
            <ThemedView style={styles.header}>
                <Icon
                    name={getIconName()}
                    type="material"
                    size={16}
                    color={themeColors.icon}
                    style={styles.icon}
                />
                <ThemedText style={[styles.ownerText, { color: themeColors.text }]}>
                    {bubble.owner}
                </ThemedText>
                {bubble.is_edited && (
                    <Icon
                        name="edit"
                        type="material"
                        size={14}
                        color={themeColors.icon}
                        style={styles.icon}
                    />
                )}
            </ThemedView>

            <ThemedText style={[styles.content, { color: themeColors.text }]}>
                {bubble.content}
            </ThemedText>

            <ThemedText style={[styles.timestamp, { color: themeColors.icon }]}>
                {formattedTime}
            </ThemedText>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '85%',
        minWidth: '50%',
        borderRadius: 10,
        padding: 10,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ownerText: {
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        fontSize: 15,
        marginBottom: 6,
        lineHeight: 20,
    },
    timestamp: {
        fontSize: 11,
        alignSelf: 'flex-end',
    },
    icon: {
        marginHorizontal: 4,
    },
});

export default Bubble;
