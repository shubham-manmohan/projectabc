// services/notes.ts
import { Note } from '@/types/notetypes';
import authClient from './authClient';

export const getNoteById = async (id: number | string) => {
    const response = await authClient.get(`/api/notes/${id}`);
    return response.data;
};


export const getAllNotes = async (): Promise<Note[]> => {
    const response = await authClient.get(`/api/notes`);
    return response.data;
};
