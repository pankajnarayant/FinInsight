/**
 * Netlify Function: analyze-financial-message.mjs
 * Serves as backend endpoint to invoke Sarvam AI (sarvam-105b) securely using
 * process.env.SARVAM_API_KEY.
 *
 * Endpoint: POST /.netlify/functions/analyze-financial-message
 */
export default async (req, context) => {
  // Allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body = {};
  try {
    const rawText = await req.text();
    if (rawText) {
      body = JSON.parse(rawText);
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body payload" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { message, conversationHistory = [] } = body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return new Response(
      JSON.stringify({ error: "The 'message' field is required and must be a non-empty string." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const sarvamApiKey = process.env.SARVAM_API_KEY;
  if (!sarvamApiKey) {
    console.error("SARVAM_API_KEY environment variable is missing.");
    return new Response(
      JSON.stringify({ error: "SARVAM_API_KEY is not configured on the server environment." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
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

  const messages = [{ role: "system", content: systemPrompt }];

  if (Array.isArray(conversationHistory)) {
    for (const msg of conversationHistory) {
      if (msg && msg.role && msg.content) {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: String(msg.content),
        });
      }
    }
  }

  messages.push({ role: "user", content: message.trim() });

  try {
    const sarvamRes = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": sarvamApiKey,
      },
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: messages,
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
    });

    if (!sarvamRes.ok) {
      const errText = await sarvamRes.text();
      console.error("Sarvam AI API error response:", sarvamRes.status, errText);
      return new Response(
        JSON.stringify({ error: `Sarvam AI API status ${sarvamRes.status}: ${errText}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const sarvamData = await sarvamRes.json();
    const contentText = sarvamData.choices?.[0]?.message?.content;

    if (!contentText) {
      return new Response(
        JSON.stringify({ error: "Sarvam AI API returned empty content response." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
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
          tenureMonths: null,
        },
        missingFields: [],
        isComplete: false,
      };
    }

    const resultPayload = {
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
            : null,
      },
      missingFields: Array.isArray(parsedResult.missingFields)
        ? parsedResult.missingFields
        : [],
      isComplete: Boolean(parsedResult.isComplete),
    };

    return new Response(JSON.stringify(resultPayload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-financial-message Netlify function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
