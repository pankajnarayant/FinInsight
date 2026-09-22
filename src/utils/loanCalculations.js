/**
 * Utility functions for loan calculation and affordability assessment.
 */

/**
 * Calculates monthly EMI for a loan principal, annual interest rate, and tenure in months.
 * Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
 * @param {number} principal - Loan amount in INR
 * @param {number} annualRate - Interest rate in % per annum
 * @param {number} tenureMonths - Loan tenure in months
 * @returns {number} Rounded monthly EMI in INR
 */
export function calculateEMI(principal, annualRate, tenureMonths) {
  if (!principal || !annualRate || !tenureMonths) return 0;
  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

/**
 * Calculates total repayment amount over the loan tenure.
 * @param {number} emi - Monthly EMI in INR
 * @param {number} tenureMonths - Loan tenure in months
 * @returns {number} Total repayment in INR
 */
export function calculateTotalRepayment(emi, tenureMonths) {
  return Math.round(emi * tenureMonths);
}

/**
 * Calculates total interest payable over the loan tenure.
 * @param {number} totalRepayment - Total repayment in INR
 * @param {number} principal - Principal loan amount in INR
 * @returns {number} Total interest in INR
 */
export function calculateTotalInterest(totalRepayment, principal) {
  return Math.max(0, Math.round(totalRepayment - principal));
}

/**
 * Calculates affordability based on combined EMI vs monthly income.
 * @param {number} newEmi - New loan EMI in INR
 * @param {number} existingEmi - Existing active EMIs in INR
 * @param {number} monthlyIncome - Total monthly income in INR
 * @returns {{ combinedEmi: number, ratio: number, status: 'Good'|'Moderate'|'Tight' }}
 */
export function calculateAffordability(newEmi, existingEmi = 0, monthlyIncome = 35000) {
  const combinedEmi = Math.round(newEmi + existingEmi);
  const safeIncome = Math.max(1, monthlyIncome);
  const ratio = (combinedEmi / safeIncome) * 100;

  let status = "Good";
  if (ratio > 50) {
    status = "Tight";
  } else if (ratio > 35) {
    status = "Moderate";
  }

  return {
    combinedEmi,
    ratio: Math.round(ratio),
    status,
  };
}

/**
 * Helper to format currency values cleanly in INR format (e.g. ₹2,00,000)
 * @param {number} val 
 * @returns {string}
 */
export function formatINR(val) {
  if (val === undefined || val === null || isNaN(val)) return "₹0";
  return "₹" + Math.round(val).toLocaleString("en-IN");
}
