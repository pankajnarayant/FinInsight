import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

export async function saveFinancialJourney(data) {
    try {
        const docRef = await addDoc(
            collection(db, "financialJourneys"),
            {
                ...data,
                createdAt: serverTimestamp()
            }
        );

        return docRef.id;
    } catch (error) {
        console.error("Error saving financial journey:", error);
        throw error;
    }
}