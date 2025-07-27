// constants/dummydata.ts

export type Note = {
    id: string;
    title: string;
    type: "Diagnosis" | "Prescription" | "Follow-Up";
    date: string; // formatted like "Jul 09, 2025"
    preview: string;
};

export const notes: Note[] = [
    {
        id: "1",
        title: "John Doe - Fever Diagnosis",
        type: "Diagnosis",
        date: "Jul 26, 2025",
        preview: "Patient exhibits symptoms of high fever, fatigue...",
    },
    {
        id: "2",
        title: "Jane Smith - Blood Pressure Medication",
        type: "Prescription",
        date: "Jul 25, 2025",
        preview: "Prescribed 5mg Amlodipine daily after meals...",
    },
    {
        id: "3",
        title: "Carlos Lee - Post-Surgery Checkup",
        type: "Follow-Up",
        date: "Jul 24, 2025",
        preview: "Stitches healing well, no signs of infection...",
    },
    {
        id: "4",
        title: "Emily White - Migraine History",
        type: "Diagnosis",
        date: "Jul 23, 2025",
        preview: "Frequent migraines triggered by stress and dehydration...",
    },
    {
        id: "5",
        title: "Adam Khan - Hypertension Plan",
        type: "Prescription",
        date: "Jul 22, 2025",
        preview: "Continue current dose, next review in 2 weeks...",
    },
    {
        id: "6",
        title: "Sara Patel - Annual Physical Exam",
        type: "Follow-Up",
        date: "Jul 21, 2025",
        preview: "All vital signs normal, recommended vitamin D supplements...",
    },
    {
        id: "7",
        title: "Michael Brown - Diabetes Monitoring",
        type: "Diagnosis",
        date: "Jul 20, 2025",
        preview: "Blood sugar levels stabilizing after medication change...",
    },
    {
        id: "8",
        title: "Olivia Green - Allergy Medication",
        type: "Prescription",
        date: "Jul 19, 2025",
        preview: "Started on antihistamines, follow up in 1 month...",
    },
    {
        id: "9",
        title: "David Clark - Post-Op Recovery",
        type: "Follow-Up",
        date: "Jul 18, 2025",
        preview: "Recovery progressing well, advised light exercise...",
    },
    {
        id: "10",
        title: "Sophia Wilson - Asthma Management",
        type: "Diagnosis",
        date: "Jul 17, 2025",
        preview: "Inhaler usage reviewed; patient advised to avoid triggers...",
    },
    {
        id: "11",
        title: "Liam Johnson - Cholesterol Control",
        type: "Prescription",
        date: "Jul 16, 2025",
        preview: "Prescribed statins, diet plan reviewed...",
    },
    {
        id: "12",
        title: "Emma Martinez - Follow-up on Surgery",
        type: "Follow-Up",
        date: "Jul 15, 2025",
        preview: "Wound healing well, no signs of complications...",
    },
    {
        id: "13",
        title: "Noah Davis - Anxiety Diagnosis",
        type: "Diagnosis",
        date: "Jul 14, 2025",
        preview: "Patient reports increased anxiety, recommended counseling...",
    },
    {
        id: "14",
        title: "Ava Rodriguez - Medication Adjustment",
        type: "Prescription",
        date: "Jul 13, 2025",
        preview: "Reduced dosage due to side effects...",
    },
    {
        id: "15",
        title: "James Lewis - Cardiac Checkup",
        type: "Follow-Up",
        date: "Jul 12, 2025",
        preview: "EKG normal, continue current medication...",
    },
    {
        id: "16",
        title: "Mia Walker - Cold Symptoms",
        type: "Diagnosis",
        date: "Jul 11, 2025",
        preview: "Mild cold, advised rest and fluids...",
    },
    {
        id: "17",
        title: "Benjamin Hall - Prescription Refill",
        type: "Prescription",
        date: "Jul 10, 2025",
        preview: "Refilled medication for hypertension...",
    },
    {
        id: "18",
        title: "Isabella Allen - Postpartum Checkup",
        type: "Follow-Up",
        date: "Jul 09, 2025",
        preview: "Patient recovering well after childbirth...",
    },
    {
        id: "19",
        title: "Elijah Young - Skin Rash Diagnosis",
        type: "Diagnosis",
        date: "Jul 08, 2025",
        preview: "Prescribed topical cream for eczema...",
    },
    {
        id: "20",
        title: "Charlotte King - Vitamin Deficiency",
        type: "Follow-Up",
        date: "Jul 07, 2025",
        preview: "Recommended iron supplements, diet adjustments...",
    },
];
