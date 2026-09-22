import React from 'react';
import { formatINR } from '../utils/loanCalculations';

const SparkleSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#00A8FF">
    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
  </svg>
);

/**
 * SummaryCard — Plain-language overview generated dynamically from computed numbers.
 */
export default function SummaryCard({ totalRepayment, tenure, totalInterest }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 16,
        border: '1px solid #E8EFF7',
        boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
        fontFamily: font,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <SparkleSmall />
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#002970', margin: 0 }}>
          In simple terms
        </h3>
      </div>

      <p style={{ fontSize: 13, color: '#334155', lineHeight: '1.5', margin: 0 }}>
        You'll repay approximately{' '}
        <strong style={{ color: '#002970' }}>{formatINR(totalRepayment)}</strong> over{' '}
        <strong style={{ color: '#002970' }}>{tenure} months</strong>, which includes{' '}
        <strong style={{ color: '#004AAD' }}>{formatINR(totalInterest)}</strong> in interest, before applicable fees/taxes.
      </p>
    </div>
  );
}
