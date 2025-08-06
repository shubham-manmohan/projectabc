// services/notes.ts
import authClient from './authClient';

export const getNoteById = async (id: number | string) => {
    const response = await authClient.get(`/api/notes/${id}`);
    return response.data;
};
