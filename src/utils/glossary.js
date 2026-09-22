/**
 * Glossary dictionary mapping financial terms to plain-language explanations.
 * Easy to extend for future RAG / dynamic content integrations.
 */
export const GLOSSARY_TERMS = {
  interestRate: {
    title: "Interest Rate (14% p.a.)",
    explanation:
      "Interest rate is the annual fee charged by the lender for borrowing money. A 14% rate means interest accrues daily on your remaining principal balance.",
  },
  processingFee: {
    title: "Processing Fee (₹2,000)",
    explanation:
      "A processing fee is a one-time charge applied by the lender for processing your loan application and document verification. It is separate from the interest you pay.",
  },
  tenure: {
    title: "Loan Tenure (24 months)",
    explanation:
      "Loan tenure is the total duration over which you agree to repay the loan in fixed monthly installments (EMIs). Shorter tenure means higher monthly EMI but lower overall interest.",
  },
  totalInterest: {
    title: "Total Interest",
    explanation:
      "Total interest is the extra amount paid to the lender above the original ₹2,00,000 principal over the complete 24-month duration.",
  },
  existingEmi: {
    title: "Existing EMI (₹8,200/mo)",
    explanation:
      "Your current active monthly loan or credit obligation already being paid every month before adding this new personal loan.",
  },
  affordabilityRatio: {
    title: "Affordability Ratio",
    explanation:
      "Financial experts recommend keeping total monthly EMI commitments below 35%–50% of net monthly income for financial comfort and emergency safety.",
  },
};

export default GLOSSARY_TERMS;
