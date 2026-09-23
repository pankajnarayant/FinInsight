import React from 'react';
import { formatINR } from '../utils/loanCalculations';

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const LightningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#00A8FF" fillOpacity="0.2" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#00A8FF" fillOpacity="0.2" />
    <path d="M9 12l2 2 4-4" strokeWidth="2.5" />
  </svg>
);

const BankIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M3 21h18M3 10h18M5 10v7M9 10v7M15 10v7M19 10v7M12 3L2 8h20L12 3z" fill="#00A8FF" fillOpacity="0.2" />
  </svg>
);

const InfoCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
  </svg>
);

const getLenderIcon = (id) => {
  if (id === 'offer_a') return <LightningIcon />;
  if (id === 'offer_b') return <ShieldCheckIcon />;
  return <BankIcon />;
};

/**
 * OfferCard — Renders a single loan offer card with calculated live values.
 * Props:
 * - offer: { id, lenderName, interestRate, processingFeePercent, tenureMonths, tag }
 * - calculatedEmi: number
 * - calculatedTotalRepayment: number
 * - calculatedProcessingFee: number
 * - effectiveTenure: number
 * - principal: number
 * - onSelect: function(offer)
 */
export default function OfferCard({
  offer,
  calculatedEmi,
  calculatedTotalRepayment,
  calculatedProcessingFee,
  effectiveTenure,
  principal,
  onSelect,
}) {
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
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header: Lender Name with centered Lender Icon */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: '#EEF4FB',
              border: '1px solid #D0E8FB',
              color: '#002970',
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
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#002970', margin: 0, lineHeight: 1.2 }}>
              {offer.lenderName}
            </h3>
            <span style={{ fontSize: 11, color: '#8A9BB0', fontWeight: 500 }}>
              Loan Offer
            </span>
          </div>
        </div>
      </div>

      {/* Prominent Monthly EMI Display */}
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
            {formatINR(calculatedEmi)}
            <span style={{ fontSize: 13, fontWeight: 600, color: '#5F6B7A', marginLeft: 2 }}>/mo</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#8A9BB0' }}>Interest Rate</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#004AAD' }}>{offer.interestRate}% p.a.</div>
        </div>
      </div>

      {/* Details Key-Value Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          background: '#FAFCFF',
          borderRadius: 12,
          padding: 12,
          border: '1px solid #F0F4F8',
          fontSize: 12,
        }}
      >
        <div>
          <div style={{ color: '#8A9BB0', fontSize: 11 }}>Loan Amount</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {formatINR(principal)}
          </div>
        </div>

        <div>
          <div style={{ color: '#8A9BB0', fontSize: 11 }}>Tenure</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {effectiveTenure} Months
          </div>
        </div>

        <div>
          <div style={{ color: '#8A9BB0', fontSize: 11 }}>Processing Fee</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {formatINR(calculatedProcessingFee)} ({offer.processingFeePercent}%)
          </div>
        </div>

        <div>
          <div style={{ color: '#8A9BB0', fontSize: 11 }}>Total Repayment</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>
            {formatINR(calculatedTotalRepayment)}
          </div>
        </div>
      </div>

      {/* Trade-off Tag Line with aligned info icon */}
      <div
        style={{
          background: '#EEF4FB',
          border: '1px solid #D0E8FB',
          borderRadius: 10,
          padding: '10px 12px',
          fontSize: 11.5,
          color: '#004AAD',
          lineHeight: 1.4,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <InfoCircleIcon />
        </div>
        <span>{offer.tag}</span>
      </div>

      {/* Select Offer Primary Button */}
      <button
        onClick={() => onSelect(offer)}
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #002970 0%, #004AAD 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: 12,
          padding: '12px 18px',
          fontSize: 14,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0, 41, 112, 0.2)',
          fontFamily: font,
          transition: 'opacity 0.15s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
      >
        <span>Select this offer</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowRightIcon />
        </div>
      </button>
    </div>
  );
}
