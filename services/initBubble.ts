import authClient from "./authClient";

// Utility to get random item from array
const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Bubble types and owners
const bubbleTypes = ['text', 'audio', 'transcript'];
const owners = ['USER', 'SYSTEM'];

// Example contents
const bubbleContents = [
    'Patient mentioned experiencing mild chest discomfort.',
    'Audio recording discussing medication schedule.',
    'Transcript of doctor’s instructions regarding diet.',
    'System-generated summary of lab results.',
    'Follow-up recommended for next Monday.',
    'Audio log: Patient reaction to new prescription.',
    'Doctor advised increased water intake.',
    'Patient confirmed allergy to penicillin.',
    'Transcript of consultation about therapy options.',
    'Vitals recorded. No abnormal readings.',
    'System alert: Blood pressure spike.',
    'Patient asked about possible side effects.',
    'Audio: Patient walking through symptoms.',
    'Transcript: Review of current medications.',
    'System summary: Appointment confirmed.',
    'Doctor requested additional imaging tests.',
    'Patient reports improvement since last visit.',
    'Audio: Breathing exercise instructions.',
    'Transcript: Patient explaining sleeping issues.',
    'Reminder to schedule bloodwork.'
];

// Generate 20–30 bubbles
const generateNoteBubbles = () => {
    const count = Math.floor(Math.random() * 11) + 20; // between 20 and 30
    const bubbles = [];

    for (let i = 0; i < count; i++) {
        const type = randomItem(bubbleTypes);
        const content = randomItem(bubbleContents);
        const owner = randomItem(owners);

        bubbles.push({
            note_bubble_type: type,
            content,
            audio_path: type === 'audio' ? `audio_${i + 1}.mp3` : '',
            timestamp: new Date().toISOString(),
            owner,
            is_edited: false
        });
    }

    return bubbles;
};

// Function to insert bubbles for a specific note_id
export async function insertBubblesForNote(noteId: number) {
    const bubbles = generateNoteBubbles();

    for (const [index, bubble] of bubbles.entries()) {
        try {
            await authClient.post(`/api/notes/${noteId}/bubbles`, bubble);
            console.log(`✅ Bubble ${index + 1}/${bubbles.length} added:`, bubble.note_bubble_type, bubble.owner);
        } catch (error) {
            console.error(`❌ Failed to add bubble ${index + 1}:`, error);
        }
    }

    console.log(`🎉 Finished adding ${bubbles.length} bubbles to note ID ${noteId}`);
}

// Example usage:
// const noteId = 123;
// insertBubblesForNote(noteId);
