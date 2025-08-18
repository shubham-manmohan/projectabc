import authClient from "./authClient";

const patientNames = [
    'John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis',
    'Robert Brown', 'Linda Wilson', 'William Taylor', 'Patricia Martinez',
    'James Anderson', 'Barbara Thomas', 'David Jackson', 'Susan White',
    'Joseph Harris', 'Sarah Martin', 'Charles Thompson', 'Lisa Garcia',
    'Thomas Clark', 'Karen Lewis', 'Christopher Lee', 'Nancy Walker'
];

// const noteTypes = ['Diagnosis', 'Prescription', 'Follow-Up'];

const dummyNotes = [
    {
        note_type: 'Diagnosis',
        preview: 'Diagnosed with mild asthma following shortness of breath.',
        bubble_content: 'Patient reported wheezing and tight chest. Spirometry confirms mild asthma.',
    },
    {
        note_type: 'Prescription',
        preview: 'Prescribed antibiotics for sinus infection.',
        bubble_content: 'Amoxicillin 500mg 3x daily for 7 days. Hydration and rest advised.',
    },
    {
        note_type: 'Follow-Up',
        preview: 'Reviewed recovery from minor ankle sprain.',
        bubble_content: 'Swelling reduced. Recommended light exercises and ice application.',
    },
    {
        note_type: 'Diagnosis',
        preview: 'Confirmed seasonal allergies during exam.',
        bubble_content: 'Patient shows allergic response to pollen. Advised antihistamines and nasal spray.',
    },
    {
        note_type: 'Prescription',
        preview: 'Issued pain relievers for back pain.',
        bubble_content: 'Ibuprofen 400mg as needed. Suggested posture correction.',
    },
    {
        note_type: 'Follow-Up',
        preview: 'Follow-up on blood pressure medication.',
        bubble_content: 'Blood pressure stable. Continue meds and monitor weekly.',
    },
    {
        note_type: 'Diagnosis',
        preview: 'Diagnosed with tension headaches.',
        bubble_content: 'Symptoms linked to stress. Recommended relaxation techniques and hydration.',
    },
    {
        note_type: 'Prescription',
        preview: 'Prescribed iron supplements for anemia.',
        bubble_content: 'Ferrous sulfate once daily with meals. Review in 1 month.',
    },
    {
        note_type: 'Follow-Up',
        preview: 'Checked progress after flu.',
        bubble_content: 'No fever. Appetite returning. Advised full return to routine.',
    },
    {
        note_type: 'Diagnosis',
        preview: 'Identified signs of early diabetes.',
        bubble_content: 'Fasting glucose elevated. Recommend lifestyle change and diet control.',
    },
    {
        note_type: 'Prescription',
        preview: 'Prescribed eye drops for irritation.',
        bubble_content: 'Artificial tears recommended every 4 hours. Follow-up in a week.',
    },
    {
        note_type: 'Follow-Up',
        preview: 'Post-op review for minor surgery.',
        bubble_content: 'Healing well. No signs of infection. Remove stitches next week.',
    },
    {
        note_type: 'Diagnosis',
        preview: 'Diagnosed with mild eczema flare-up.',
        bubble_content: 'Dry, itchy patches observed. Prescribed topical corticosteroids.',
    },
    {
        note_type: 'Prescription',
        preview: 'Started statins for high cholesterol.',
        bubble_content: 'Simvastatin 20mg at bedtime. Blood tests in 2 weeks.',
    },
    {
        note_type: 'Follow-Up',
        preview: 'Assessed post-COVID recovery.',
        bubble_content: 'Breathing normal. Advised gradual exercise reintroduction.',
    },
    {
        note_type: 'Diagnosis',
        preview: 'Patient presents with urinary tract infection.',
        bubble_content: 'Symptoms confirm UTI. Sent urine for culture. Prescribed nitrofurantoin.',
    },
    {
        note_type: 'Prescription',
        preview: 'Provided anti-nausea medication.',
        bubble_content: 'Ondansetron 4mg as needed. Observe for dehydration.',
    },
    {
        note_type: 'Follow-Up',
        preview: 'Checked healing of skin rash.',
        bubble_content: 'Inflammation reduced. Moisturizing routine advised.',
    },
    {
        note_type: 'Diagnosis',
        preview: 'Detected early signs of arthritis.',
        bubble_content: 'Joint stiffness noted. Start low-impact exercises.',
    },
    {
        note_type: 'Prescription',
        preview: 'Issued sleep aid for insomnia.',
        bubble_content: 'Melatonin 3mg at night. Sleep hygiene tips discussed.',
    }
];

// Build final note list with patient names in titles
const notesToSend = patientNames.map((name, i) => {
    const note = dummyNotes[i];
    return {
        title: `Note for ${name}`,
        note_type: note.note_type,
        preview: note.preview,
        timestamp: new Date().toISOString(),
        actions: [],
        bubbles: [
            {
                note_bubble_type: 'text',
                content: note.bubble_content,
                audio_path: '',
                timestamp: new Date().toISOString(),
                owner: 'USER',
                is_edited: false
            }
        ]
    };
});

// Function to post notes
export default async function createDummyNotes() {
    for (const note of notesToSend) {
        try {
            await authClient.post('/api/notes', note);
            console.log(`✅ Created: ${note.title}`);
        } catch (error) {
            console.error(`❌ Failed: ${note.title}`, error);
        }
    }
}

// createDummyNotes();
