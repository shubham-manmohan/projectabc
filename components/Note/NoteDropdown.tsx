// components/NoteDropdown.tsx

import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AntDesign } from '@expo/vector-icons';

interface NoteDropdownProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
}

export default function NoteDropdown({ label, value, onValueChange }: NoteDropdownProps) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Diagnosis', value: 'Diagnosis' },
        { label: 'Prescription', value: 'Prescription' },
        { label: 'Follow-Up', value: 'Follow-Up' },
    ]);

    const borderColor = useThemeColor({}, 'tint');
    const backgroundColor = useThemeColor({}, 'background');
    const color = useThemeColor({}, 'text');

    return (
        <View style={[styles.wrapper]}>
            <Text style={[styles.label, { color }]}>{label}</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => {
                    const val = callback(value);
                    onValueChange(val);
                }}
                setItems={setItems}
                placeholder="Select Note Type"
                style={{
                    borderColor,
                    backgroundColor,
                }}
                dropDownContainerStyle={{
                    borderColor,
                    backgroundColor,
                }}
                textStyle={{
                    color,
                    fontSize: 16,
                }}
                placeholderStyle={{
                    color: '#999',
                }}
                TickIconComponent={({ style }) => (
                    <AntDesign name='check' color={color} size={20} />
                )}
                ArrowUpIconComponent={({ style }) => (
                    <AntDesign name='arrowup' color={color} size={20} />
                )}
                ArrowDownIconComponent={({ style }) => (
                    <AntDesign name='arrowdown' color={color} size={20} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 16,
        zIndex: 1000, // important for avoiding overlap issues
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
});
