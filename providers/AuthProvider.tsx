import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '@/services/api';

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Auto-login if token is stored

    useEffect(() => {
        console.log("check auth..")
        const checkToken = async () => {
            const token = await SecureStore.getItemAsync('token');
            if (token) setIsAuthenticated(true);
        };
        checkToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/login', { email, password });
            const token = response.data.access_token;
            if (token) {
                await SecureStore.setItemAsync("token", token);
                await SecureStore.setItemAsync("email", email);
                await SecureStore.setItemAsync("password", password);
                setIsAuthenticated(true);
            } else {
                throw new Error("Login failed");
            }
        } catch (err: any) {
            console.error('Login failed:', err?.response?.data || err.message);
            throw err;
        }
    };

    const logout = async () => {
        console.log("logout called")
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("email");
        await SecureStore.deleteItemAsync("password");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
