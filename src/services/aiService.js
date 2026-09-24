import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

const analyzeCallable = httpsCallable(functions, "analyzeFinancialMessage");

/**
 * Calls analyzeFinancialMessage Firebase Cloud Function (which invokes Sarvam AI).
 * @param {string} message - User's chat message text
 * @param {Array<{role: string, content: string}>} conversationHistory - Optional history array
 * @returns {Promise<{reply: string, financialData: object, missingFields: string[], isComplete: boolean}>}
 */
export async function analyzeFinancialMessage(message, conversationHistory = []) {
  try {
    const result = await analyzeCallable({
      message,
      conversationHistory,
    });
    return result.data;
  } catch (error) {
    console.error("Error calling analyzeFinancialMessage function:", error);
    throw error;
  }
}
