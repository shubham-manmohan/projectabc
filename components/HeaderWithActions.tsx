import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

type Props = {
    onAdd?: () => void;
};

export default function HeaderWithActions({ onAdd }: Props) {
    const textColor = useThemeColor({}, "text");
    const { logout } = useAuth();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>
                My Notes
            </ThemedText>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onAdd} style={styles.iconButton}>
                    <AntDesign name="pluscircle" size={24} color={textColor} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={async () => {
                        await logout();
                        router.replace("/login");
                    }}
                    style={styles.iconButton}
                >
                    <Feather name="log-out" size={24} color={textColor} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 2,
        paddingVertical: 4,
        width: "100%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        gap: 12,
    },
    iconButton: {
        paddingHorizontal: 0,
        // backgroundColor: "#635BFF20",
        // borderRadius: 999,
    },


});
