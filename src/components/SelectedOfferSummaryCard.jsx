import React from 'react';
import { formatINR } from '../utils/loanCalculations';

const LightningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#00A8FF" fillOpacity="0.2" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#00A8FF" fillOpacity="0.2" />
    <path d="M9 12l2 2 4-4" strokeWidth="2.5" />
  </svg>
);

const BankIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M3 21h18M3 10h18M5 10v7M9 10v7M15 10v7M19 10v7M12 3L2 8h20L12 3z" fill="#00A8FF" fillOpacity="0.2" />
  </svg>
);

const getLenderIcon = (id) => {
  if (id === 'offer_a') return <LightningIcon />;
  if (id === 'offer_b') return <ShieldCheckIcon />;
  return <BankIcon />;
};

/**
 * SelectedOfferSummaryCard — Condensed read-only summary of the chosen offer.
 * Props:
 * - offer: the selectedOffer object from context
 * - emi: calculatedEmi number
 * - tenure: effective tenure in months
 * - processingFee: calculatedProcessingFee number
 * - principal: loan amount
 */
export default function SelectedOfferSummaryCard({ offer, emi, tenure, processingFee, principal }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  if (!offer) return null;

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 16,
        border: '1px solid #E8EFF7',
        boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
        fontFamily: font,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Header */}
      <div style={{ fontSize: 13, fontWeight: 700, color: '#002970' }}>
        Your selected offer
      </div>

      {/* Lender identity row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: '#EEF4FB',
            border: '1px solid #D0E8FB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          {getLenderIcon(offer.id)}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#002970', lineHeight: 1.2 }}>
            {offer.lenderName}
          </div>
          <div style={{ fontSize: 11, color: '#8A9BB0', fontWeight: 500, marginTop: 1 }}>
            Selected Loan Offer
          </div>
        </div>
      </div>

      {/* Key EMI highlight */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F5F8FC 0%, #EEF4FB 100%)',
          borderRadius: 12,
          padding: '12px 14px',
          border: '1px solid #E3ECF5',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Monthly EMI
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#002970', lineHeight: 1.2, marginTop: 2 }}>
            {formatINR(emi)}
            <span style={{ fontSize: 13, fontWeight: 600, color: '#5F6B7A', marginLeft: 2 }}>/mo</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#8A9BB0' }}>Interest Rate</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#004AAD' }}>
            {offer.interestRate}% p.a.
          </div>
        </div>
      </div>

      {/* 2x2 details grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          background: '#FAFCFF',
          borderRadius: 12,
          padding: 12,
          border: '1px solid #F0F4F8',
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: '#8A9BB0' }}>Loan Amount</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {formatINR(principal)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#8A9BB0' }}>Tenure</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {tenure} Months
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#8A9BB0' }}>Interest Rate</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {offer.interestRate}% p.a.
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#8A9BB0' }}>Processing Fee</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {formatINR(processingFee)}
          </div>
        </div>
      </div>
    </div>
  );
}
