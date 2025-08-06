import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function AppLayout() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    return (
        <Stack >
            <Stack.Screen name="(tabs)" options={{ "headerShown": false }}></Stack.Screen>
            {/* <Stack.Screen name="(note)" options={{ "headerShown": false }}></Stack.Screen> */}
            <Stack.Screen
                name="(note)/new"
                options={{
                    "headerShown": true,
                    "headerTitle": "New Note",
                    "headerBackTitle": "Back",
                }}>
            </Stack.Screen>
            <Stack.Screen
                name="(note)/[noteid]"
                options={{ "headerBackTitle": "Back", "headerTitle": "Note Details" }}
            >
            </Stack.Screen>
        </Stack>
    );
}
