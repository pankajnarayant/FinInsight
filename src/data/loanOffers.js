export const loanOffers = [
  {
    id: "offer_hdfc",
    lenderName: "HDFC Bank",
    loanProduct: "Pre-Approved Personal Loan",
    loanType: "Personal Loan",
    interestRate: 11.5,
    rateType: "Fixed Rate",
    processingFeePercent: 1.5,
    otherCharges: "Documentation fee: ₹500 (Demo charge example)",
    tenureMonths: null,
    tag: "Lowest interest rate offer",
    eligibility: {
      minIncome: "₹25,000 / month (Demo criteria)",
      ageRange: "21 - 60 years (Demo criteria)",
      employment: "Salaried or Self-Employed Professional (Demo criteria)",
      documents: ["Aadhaar Card", "PAN Card", "3 Months Salary Slips / Bank Statement"]
    },
    features: [
      "Collateral-free personal loan with minimal documentation",
      "Instant digital eligibility check & quick disbursal",
      "Flexible repayment tenure up to 60 months",
      "Option to pre-close loan after 6 EMIs"
    ]
  },
  {
    id: "offer_icici",
    lenderName: "ICICI Bank",
    loanProduct: "Instant Disbursal Personal Loan",
    loanType: "Personal Loan",
    interestRate: 11.75,
    rateType: "Fixed Rate",
    processingFeePercent: 1.0,
    otherCharges: "Stamp duty fee: ₹300 (Demo charge example)",
    tenureMonths: null,
    tag: "Flexible tenure & instant disbursal",
    eligibility: {
      minIncome: "₹30,000 / month (Demo criteria)",
      ageRange: "21 - 58 years (Demo criteria)",
      employment: "Salaried employee at registered firm (Demo criteria)",
      documents: ["PAN Card", "Aadhaar Card", "Form 16 / IT Returns"]
    },
    features: [
      "100% digital end-to-end loan application flow",
      "Special rate discount for salary account holders",
      "Zero foreclosure penalty options available",
      "Disbursement straight into verified Paytm Bank / savings account"
    ]
  },
  {
    id: "offer_axis",
    lenderName: "Axis Bank",
    loanProduct: "Express Personal Loan",
    loanType: "Personal Loan",
    interestRate: 12.0,
    rateType: "Fixed Rate",
    processingFeePercent: 1.2,
    otherCharges: "Loan agreement charge: ₹450 (Demo charge example)",
    tenureMonths: null,
    tag: "Zero foreclosure charges after 12 months",
    eligibility: {
      minIncome: "₹20,000 / month (Demo criteria)",
      ageRange: "21 - 60 years (Demo criteria)",
      employment: "Salaried / Business Owner (Demo criteria)",
      documents: ["Aadhaar Card", "PAN Card", "6 Months Bank Statement"]
    },
    features: [
      "Zero pre-payment penalty after completing 12 monthly EMIs",
      "Flexible EMI payment dates each month",
      "No hidden hidden charges or upfront deposit",
      "Dedicated relationship support for existing customers"
    ]
  },
  {
    id: "offer_kotak",
    lenderName: "Kotak Mahindra Bank",
    loanProduct: "Smart Personal Loan",
    loanType: "Personal Loan",
    interestRate: 12.25,
    rateType: "Fixed Rate",
    processingFeePercent: 0.8,
    otherCharges: "Processing admin fee: ₹350 (Demo charge example)",
    tenureMonths: null,
    tag: "Minimal documentation & fast processing",
    eligibility: {
      minIncome: "₹22,000 / month (Demo criteria)",
      ageRange: "21 - 60 years (Demo criteria)",
      employment: "Salaried or Self-Employed (Demo criteria)",
      documents: ["Aadhaar Card", "PAN Card", "3 Months Bank Statement"]
    },
    features: [
      "Lowest processing fee structure among partner lenders",
      "Quick approval decision in under 15 minutes",
      "Customizable EMI schedules tailored to monthly income",
      "Paperless verification via Video KYC"
    ]
  }
];
