// app/(auth)/login.tsx
import { TouchableOpacity, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function LoginScreen() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login with Face ID / PIN",
        });

        if (result.success) {
            login();
            router.replace("/");
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.card}>
                <ThemedView style={styles.iconCircle}>
                    <AntDesign name="plus" size={48} color={useThemeColor({}, "text")} />
                </ThemedView>

                <ThemedText type="title" style={styles.title}>
                    Voice Notes
                </ThemedText>

                <ThemedText type="subtitle" style={styles.subtitle}>
                    Capture thoughts, effortlessly.
                </ThemedText>

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <ThemedText style={styles.loginButtonText}>
                        Login with (Face ID / PIN)
                    </ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
    },
    card: {
        borderRadius: 16,
        padding: 2,
        alignItems: "center",

        elevation: 4,

    },
    iconCircle: {
        backgroundColor: "#635BFF20",
        borderRadius: 999,
        padding: 16,
        marginBottom: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 32,
        textAlign: "center",
    },
    loginButton: {
        backgroundColor: "#635BFF",
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 24,
        width: "100%",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
    note: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
});
