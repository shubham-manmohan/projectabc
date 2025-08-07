// types/note.ts

export type NoteOld = {
    id: string;
    title: string;
    type: "Diagnosis" | "Prescription" | "Follow-Up";
    date: string; // formatted like "Jul 09, 2025"
    preview: string;
    actions?: string[];

};


export type NoteBubble = {
    id: number;
    note_bubble_type: string;
    content: string;
    audio_path: string;
    timestamp: string;
    owner: string;
    is_edited: boolean;
};

export type Note = {
    id: number;
    title: string;
    note_type: string;
    preview: string;
    timestamp: string;
    actions?: string[];
    bubbles?: NoteBubble[];
};

export interface PaginatedNoteResponse {
    notes: Note[];
    page: number;
    hasMore: boolean;
    total: number;
}