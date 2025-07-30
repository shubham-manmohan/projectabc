// app/(auth)/login.tsx

import React, { useEffect, useState } from "react";
import {
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";



export default function LoginScreen() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [biometricAvailable, setBiometricAvailable] = useState(false);

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    // Check if biometric auth is available
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            setBiometricAvailable(compatible && enrolled);
        })();
    }, []);

    // Attempt biometric + token login
    const handleBiometricLogin = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Login with Face ID / PIN",
        });

        if (!result.success) {
            Alert.alert("Biometric login failed");
            return;
        }

        const savedEmail = await SecureStore.getItemAsync("email");
        const savedPassword = await SecureStore.getItemAsync("password");

        if (!savedEmail || !savedPassword) {
            Alert.alert(
                "Stored credentials not found",
                "Please log in manually first to enable Face ID login."
            );
            return;
        }

        try {
            await login(savedEmail, savedPassword);
            router.replace("/");
        } catch (error) {
            console.log(error);
            Alert.alert("Login failed", "Please log in manually again.");
        }
    };


    const handleEmailPasswordLogin = async () => {
        try {
            await login(email, password);
            await SecureStore.setItemAsync("email", email);
            await SecureStore.setItemAsync("password", password);
            router.replace("/");
        } catch (error) {
            console.log(error);
            Alert.alert("Login failed", "Invalid email or password");
        }
    };



    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Animated.ScrollView
                ref={scrollRef}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
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

                        <TextInput
                            placeholder="Email"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                        />
                        <TouchableOpacity onPress={handleEmailPasswordLogin} style={styles.loginButton}>
                            <ThemedText style={styles.loginButtonText}>Login with Email</ThemedText>
                        </TouchableOpacity>

                        {biometricAvailable && (
                            <TouchableOpacity onPress={handleBiometricLogin} style={styles.biometricsButton}>
                                <ThemedText style={styles.loginButtonText}>Login with Face ID / PIN</ThemedText>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                            <ThemedText style={styles.signupLink}>Don&apos;t have an account? Sign up</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            </Animated.ScrollView>
        </KeyboardAvoidingView>
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
        padding: 24,
        alignItems: "center",
        width: "90%",
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
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === "ios" ? 12 : 8,
        marginBottom: 12,
    },
    loginButton: {
        backgroundColor: "#635BFF",
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 12,
        width: "100%",
    },
    biometricsButton: {
        backgroundColor: "#333",
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: "100%",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
    signupLink: {
        marginTop: 20,
        fontSize: 14,
        color: "#635BFF",
        textAlign: "center",
    },

});
