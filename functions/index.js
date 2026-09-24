const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");

initializeApp();

/**
 * analyzeFinancialMessage — Callable Firebase Cloud Function to analyze user text
 * using Sarvam AI (sarvam-105b model).
 *
 * Receives: { message: string, conversationHistory?: Array<{role, content}> }
 * Returns: { reply, financialData, missingFields, isComplete }
 */
exports.analyzeFinancialMessage = onCall({ cors: true }, async (request) => {
  const { message, conversationHistory = [] } = request.data || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    throw new HttpsError(
      "invalid-argument",
      "The 'message' field is required and must be a non-empty string."
    );
  }

  const sarvamApiKey = process.env.SARVAM_API_KEY;
  if (!sarvamApiKey) {
    console.error("SARVAM_API_KEY is not configured in functions environment.");
    throw new HttpsError(
      "failed-precondition",
      "SARVAM_API_KEY is not configured on the server environment. Please set it in functions/.env.local"
    );
  }

  const systemPrompt = `You are FinInsight AI, a smart financial assistant helping users analyze their loan and insurance requirements in India.
Your goal is to understand the user's natural-language input and extract financial parameters into a structured JSON response.

Return ONLY a valid JSON object matching this exact schema:
{
  "reply": "A helpful, friendly conversational response in simple English. If any critical info is missing, politely ask a short follow-up question for it.",
  "financialData": {
    "purpose": "Loan or Insurance purpose extracted from conversation (e.g. 'Personal Loan', 'Education Loan', 'Health Insurance', 'Car Loan') or null if not specified",
    "requestedAmount": number or null (e.g. 200000),
    "monthlyIncome": number or null (e.g. 50000),
    "comfortableEmi": number or null (e.g. 10000),
    "existingEmi": number or null (e.g. 5000),
    "tenureMonths": number or null (e.g. 24)
  },
  "missingFields": ["list of field names missing from financialData that are needed for loan planning, e.g. 'requestedAmount', 'monthlyIncome', 'tenureMonths'"],
  "isComplete": boolean (true ONLY if purpose, requestedAmount, and tenureMonths are present)
}

RULES:
1. NEVER invent or hallucinate financial amounts or numbers not stated or implied by the user. Use null if not present.
2. Convert human terms like '2 lakhs', '2L', '200k' to numbers (200000).
3. Convert tenure terms like '2 years', '24 months' to number of months (24).
4. NEVER perform mathematical EMI calculations or calculate total interest in your text reply.
5. NEVER claim loan pre-approval, guaranteed sanction, or official lender approval.
6. Keep the reply short, helpful, and natural.
7. Return ONLY the raw JSON string without any markdown backticks, markdown formatting, or HTML.`;

  const messages = [
    { role: "system", content: systemPrompt }
  ];

  // Append conversation history if provided
  if (Array.isArray(conversationHistory)) {
    for (const msg of conversationHistory) {
      if (msg && msg.role && msg.content) {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: String(msg.content)
        });
      }
    }
  }

  messages.push({ role: "user", content: message.trim() });

  try {
    const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": sarvamApiKey
      },
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: messages,
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sarvam AI API error response:", response.status, errorText);
      throw new HttpsError(
        "internal",
        `Sarvam AI API returned status ${response.status}: ${errorText}`
      );
    }

    const sarvamData = await response.json();
    const contentText = sarvamData.choices?.[0]?.message?.content;

    if (!contentText) {
      throw new HttpsError("internal", "Sarvam AI API returned empty content response.");
    }

    let parsedResult;
    try {
      const cleanedJson = contentText
        .replace(/^```json\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();
      parsedResult = JSON.parse(cleanedJson);
    } catch (parseErr) {
      console.error("Failed to parse Sarvam AI response as JSON:", contentText);
      parsedResult = {
        reply: contentText,
        financialData: {
          purpose: null,
          requestedAmount: null,
          monthlyIncome: null,
          comfortableEmi: null,
          existingEmi: null,
          tenureMonths: null
        },
        missingFields: [],
        isComplete: false
      };
    }

    return {
      reply: parsedResult.reply || "I have analyzed your financial details.",
      financialData: {
        purpose: parsedResult.financialData?.purpose || null,
        requestedAmount:
          typeof parsedResult.financialData?.requestedAmount === "number"
            ? parsedResult.financialData.requestedAmount
            : null,
        monthlyIncome:
          typeof parsedResult.financialData?.monthlyIncome === "number"
            ? parsedResult.financialData.monthlyIncome
            : null,
        comfortableEmi:
          typeof parsedResult.financialData?.comfortableEmi === "number"
            ? parsedResult.financialData.comfortableEmi
            : null,
        existingEmi:
          typeof parsedResult.financialData?.existingEmi === "number"
            ? parsedResult.financialData.existingEmi
            : null,
        tenureMonths:
          typeof parsedResult.financialData?.tenureMonths === "number"
            ? parsedResult.financialData.tenureMonths
            : null
      },
      missingFields: Array.isArray(parsedResult.missingFields) ? parsedResult.missingFields : [],
      isComplete: Boolean(parsedResult.isComplete)
    };
  } catch (error) {
    if (error instanceof HttpsError) {
      throw error;
    }
    console.error("Error invoking Sarvam AI:", error);
    throw new HttpsError(
      "internal",
      error.message || "An unexpected error occurred while communicating with Sarvam AI."
    );
  }
});
