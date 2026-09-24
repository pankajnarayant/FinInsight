/**
 * Quick local fast-path check for simple greetings, help requests, and acknowledgements.
 * Returns an instant response string if the input is a simple non-financial message,
 * or returns null if Sarvam AI should process the message.
 *
 * @param {string} message - Raw message input from user
 * @returns {string|null} Predefined response or null
 */
export function getFastPathResponse(message) {
  if (!message || typeof message !== 'string') return null;

  const raw = message.trim();
  if (!raw) return null;

  // 1. CRITICAL: If message contains numbers or financial terms, ALWAYS route to Sarvam AI!
  const hasNumbers = /\d/.test(raw);
  const financialKeywordsRegex = /(lakh|lac|k|rs|₹|loan|insurance|emi|income|salary|month|yr|year|budget|car|home|edu|health|term|personal|business|spend|borrow|afford|tenure|coverage|insured|principal|repay)/i;

  if (hasNumbers || financialKeywordsRegex.test(raw)) {
    return null; // Sent to Sarvam AI
  }

  // 2. Normalize text: lowercase, remove non-alphanumeric punctuation, collapse 3+ repeated characters
  const normalized = raw
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/(.)\1{2,}/g, '$1$1') // e.g. "hiii" -> "hii", "hellooo" -> "hello"
    .trim();

  // 3. Fast-path match lists
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

  if (greetings.includes(normalized) || /^greetings?\b/.test(normalized) || /^hello\b/.test(normalized)) {
    return "Hello! 👋 I'm your FinInsight AI Guide. Tell me about your loan or insurance requirements (e.g. 'I need a 5 lakh car loan'), or select an option below!";
  }

  if (helpRequests.includes(normalized) || /^help\b/.test(normalized)) {
    return "I'm here to help you personalize your financial plan! Simply type your loan amount or goal (e.g. 'I earn 35,000 per month and need a personal loan'), or select an option below.";
  }

  if (acknowledgements.includes(normalized)) {
    return "You're welcome! Feel free to share your financial requirements anytime.";
  }

  return null; // Not a simple greeting — pass to Sarvam AI
}
