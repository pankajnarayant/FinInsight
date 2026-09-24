/**
 * Calls analyze-financial-message Netlify Function (which invokes Sarvam AI).
 * @param {string} message - User's chat message text
 * @param {Array<{role: string, content: string}>} conversationHistory - Optional history array
 * @returns {Promise<{reply: string, financialData: object, missingFields: string[], isComplete: boolean}>}
 */
export async function analyzeFinancialMessage(message, conversationHistory = []) {
  try {
    const endpoint = "/.netlify/functions/analyze-financial-message";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationHistory,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `Server returned status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error calling analyzeFinancialMessage function:", error);
    throw error;
  }
}
