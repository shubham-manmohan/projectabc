// app/(auth)/signup.tsx

import React, { useState } from "react";
import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import axios from "axios";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SignupScreen() {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const scrollToInput = (y: number) => {
        scrollRef.current?.scrollTo({ y, animated: true });
    };

    const handleSignup = async () => {
        if (!username || !email || !password || !mobile) {
            Alert.alert("All fields are required.");
            return;
        }

        try {
            await axios.post(`${API_URL}/register`, {
                username,
                email,
                password,
                mobile,
            });

            Alert.alert("Success", "Account created successfully!", [
                { text: "OK", onPress: () => router.replace("/(auth)/login") },
            ]);
        } catch (error: any) {
            const message = error?.response?.data?.detail || "Something went wrong";
            Alert.alert("Registration Failed", message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Animated.ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <ThemedView style={styles.container}>
                    <ThemedView style={styles.card}>
                        <ThemedView style={styles.iconCircle}>
                            <AntDesign name="user" size={48} color={useThemeColor({}, "text")} />
                        </ThemedView>

                        <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
                        <ThemedText type="subtitle" style={styles.subtitle}>Join Voice Notes now</ThemedText>

                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            onFocus={() => scrollToInput(100)}
                            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                            autoCapitalize="words"
                        />
                        <TextInput
                            placeholder="Mobile"
                            value={mobile}
                            onChangeText={setMobile}
                            onFocus={() => scrollToInput(150)}
                            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => scrollToInput(200)}
                            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => scrollToInput(250)}
                            style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                            secureTextEntry
                        />

                        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
                            <ThemedText style={styles.signupButtonText}>Create Account</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                            <ThemedText style={styles.loginLink}>Already have an account? Login</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            </Animated.ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: "100%",
        borderRadius: 16,
        padding: 24,
        elevation: 4,
        alignItems: "center",
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
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    signupButton: {
        backgroundColor: "#635BFF",
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginTop: 12,
        width: "100%",
    },
    signupButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
    loginLink: {
        marginTop: 20,
        fontSize: 14,
        color: "#635BFF",
        textAlign: "center",
    },
});
