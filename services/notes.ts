// services/notes.ts
import { Note, PaginatedNoteResponse } from '@/types/notetypes';
import authClient from './authClient';

export const getNoteById = async (id: number | string) => {
    const response = await authClient.get(`/api/notes/${id}`);
    return response.data;
};


export const getAllNotesOld = async (): Promise<Note[]> => {
    const response = await authClient.get(`/api/notes`);
    return response.data;
};



export const getAllNotes = async (
    page: number = 1,
    limit: number = 10
): Promise<PaginatedNoteResponse> => {
    console.log("calling to get notes:",page,limit)
    const response = await authClient.get(`/api/notes/paginated`, {
        params: { page, limit },
    });
    return response.data;
};