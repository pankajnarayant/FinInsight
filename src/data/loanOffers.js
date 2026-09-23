export const loanOffers = [
  {
    id: "offer_a",
    lenderName: "QuickCash Finance",
    interestRate: 11.5,
    processingFeePercent: 1.5,
    tenureMonths: null, // null = use user's own chosen tenure from state
    tag: "Lower interest, higher monthly commitment",
  },
  {
    id: "offer_b",
    lenderName: "TrustLend NBFC",
    interestRate: 14,
    processingFeePercent: 1,
    tenureMonths: null,
    tag: "Slightly higher interest but lower processing fee",
  },
  {
    id: "offer_c",
    lenderName: "EasyEMI Capital",
    interestRate: 16.5,
    processingFeePercent: 0.5,
    tenureMonths: 36,
    tag: "Lower EMI but longer repayment period and higher overall interest",
  },
];
