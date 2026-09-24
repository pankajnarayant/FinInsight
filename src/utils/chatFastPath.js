/**
 * Quick local fast-path check for simple greetings, help requests, acknowledgements,
 * and unclear/non-financial inputs.
 *
 * @param {string} message - Raw message input from user
 * @param {boolean} isAwaitingContext - True if AI is currently awaiting a response to a financial question
 * @returns {string|null} Predefined response or null (if Sarvam AI should process the message)
 */
export function getFastPathResponse(message, isAwaitingContext = false) {
  if (!message || typeof message !== 'string') return null;

  const raw = message.trim();
  if (!raw) return null;

  // 1. Check for explicit financial keywords or currency symbols
  const financialKeywordsRegex = /(lakh|lac|k|rs|₹|\$|loan|insurance|emi|income|salary|month|yr|year|budget|car|home|edu|health|term|personal|business|spend|borrow|afford|tenure|coverage|insured|principal|repay)/i;
  const hasFinancialKeywords = financialKeywordsRegex.test(raw);

  // 2. Check for numbers
  const hasNumbers = /\d/.test(raw);

  // 3. Normalize text: lowercase, remove non-alphanumeric punctuation, collapse 3+ repeated characters
  const normalized = raw
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/(.)\1{2,}/g, '$1$1')
    .trim();

  // If input is purely special characters (e.g. "!!!", "???", emojis)
  if (!normalized && !hasNumbers) {
    return "I’d be happy to help! Could you tell me a little more about your financial requirement?";
  }

  // Fast-path match lists
  const greetings = [
    'hi',
    'hii',
    'hey',
    'heyy',
    'hello',
    'hlo',
    'hola',
    'good morning',
    'good afternoon',
    'good evening',
    'greetings',
    'namaste',
    'yo',
  ];

  const helpRequests = [
    'help',
    'help me',
    'can you help',
    'need help',
    'what can you do',
    'how does this work',
    'guide me',
    'assist me',
  ];

  const acknowledgements = [
    'thanks',
    'thank you',
    'thx',
    'thanku',
    'ok',
    'okay',
    'got it',
    'cool',
    'great',
    'awesome',
    'perfect',
    'sure',
  ];

  // A) Match greetings
  if (greetings.includes(normalized) || /^greetings?\b/.test(normalized) || /^hello\b/.test(normalized)) {
    return "Hello! 👋 I'm your FinInsight AI Guide. Tell me about your loan or insurance requirements (e.g. 'I need a 5 lakh car loan'), or select an option below!";
  }

  // B) Match help requests
  if (helpRequests.includes(normalized) || /^help\b/.test(normalized)) {
    return "I'm here to help you personalize your financial plan! Simply type your loan amount or goal (e.g. 'I earn 35,000 per month and need a personal loan'), or select an option below.";
  }

  // C) Match acknowledgements
  if (acknowledgements.includes(normalized)) {
    return "You're welcome! Feel free to share your financial requirements anytime.";
  }

  // D) Financial routing logic:
  // - If message contains explicit financial terms (e.g. "car loan", "5 lakh", "health insurance") -> Sarvam
  // - If message contains numbers AND AI is actively awaiting a response to a financial question (e.g. "500000", "24") -> Sarvam
  if (hasFinancialKeywords || (hasNumbers && isAwaitingContext)) {
    return null; // Send to Sarvam AI
  }

  // E) Check for common goal keywords (e.g. "car", "wedding", "medical", "education", "house")
  const commonGoalWords = ['car', 'home', 'house', 'wedding', 'medical', 'education', 'college', 'school', 'bike', 'travel', 'gold'];
  if (commonGoalWords.some((w) => normalized.includes(w))) {
    return null; // Send to Sarvam AI
  }

  // F) Unclear, non-financial, or standalone random numbers out of context -> Return instant prompt
  return "I’d be happy to help! Could you tell me a little more about your financial requirement?";
}
