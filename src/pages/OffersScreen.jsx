import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import { loanOffers } from '../data/loanOffers';
import { useFinInsight } from '../context/FinInsightContext';
import {
  calculateEMI,
  calculateTotalRepayment,
  formatINR,
} from '../utils/loanCalculations';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const BankIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M3 21h18M3 10h18M5 10v7M9 10v7M15 10v7M19 10v7M12 3L2 8h20L12 3z" fill="#00A8FF" fillOpacity="0.2" />
  </svg>
);

const InfoCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
  </svg>
);

function LoanOfferCard({ offer, principal, tenure, onViewOffer, onApply }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  const effectiveTenure = offer.tenureMonths || tenure;
  const emi = calculateEMI(principal, offer.interestRate, effectiveTenure);
  const totalRepayment = calculateTotalRepayment(emi, effectiveTenure);
  const processingFee = Math.round((principal * offer.processingFeePercent) / 100);

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
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header: lender name + type */}
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
          }}
        >
          <BankIcon />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#002970', lineHeight: 1.2 }}>
            {offer.lenderName}
          </div>
          <div style={{ fontSize: 11, color: '#8A9BB0', fontWeight: 500, marginTop: 1 }}>
            {offer.loanType}
          </div>
        </div>
        <div style={{ background: '#EEF4FB', borderRadius: 8, padding: '4px 8px', fontSize: 10, fontWeight: 700, color: '#004AAD', flexShrink: 0 }}>
          {offer.interestRate}% p.a.
        </div>
      </div>

      {/* EMI Highlight Strip */}
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
          <div style={{ fontSize: 10, fontWeight: 600, color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Estimated EMI
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#002970', lineHeight: 1.2, marginTop: 2 }}>
            {formatINR(emi)}
            <span style={{ fontSize: 12, fontWeight: 600, color: '#5F6B7A', marginLeft: 2 }}>/mo</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: '#8A9BB0' }}>Interest Rate</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#004AAD' }}>{offer.interestRate}% p.a.</div>
        </div>
      </div>

      {/* Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          background: '#FAFCFF',
          borderRadius: 12,
          padding: 12,
          border: '1px solid #F0F4F8',
          fontSize: 12,
        }}
      >
        <div>
          <div style={{ color: '#8A9BB0', fontSize: 10 }}>Loan Amount</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>{formatINR(principal)}</div>
        </div>
        <div>
          <div style={{ color: '#8A9BB0', fontSize: 10 }}>Tenure</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>{effectiveTenure} Months</div>
        </div>
        <div>
          <div style={{ color: '#8A9BB0', fontSize: 10 }}>Processing Fee</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>{formatINR(processingFee)} ({offer.processingFeePercent}%)</div>
        </div>
        <div>
          <div style={{ color: '#8A9BB0', fontSize: 10 }}>Total Repayment</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>{formatINR(totalRepayment)}</div>
        </div>
      </div>

      {/* Tag */}
      <div
        style={{
          background: '#EEF4FB',
          border: '1px solid #D0E8FB',
          borderRadius: 10,
          padding: '8px 12px',
          fontSize: 11,
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

      {/* Buttons Row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onViewOffer(offer)}
          style={{
            flex: 1,
            background: '#EEF4FB',
            color: '#004AAD',
            border: '1px solid #D0E8FB',
            borderRadius: 12,
            padding: '11px 14px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: font,
            transition: 'all 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          View Offer
        </button>
        <button
          onClick={() => onApply(offer)}
          style={{
            flex: 1,
            background: 'linear-gradient(90deg, #002970 0%, #004AAD 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 12,
            padding: '11px 14px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: font,
            boxShadow: '0 4px 14px rgba(0, 41, 112, 0.2)',
            transition: 'opacity 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <span>Apply</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

export default function OffersScreen() {
  const navigate = useNavigate();
  const context = useFinInsight();

  const userPrincipal = Number(context?.needAmount) || 200000;
  const userTenure = Number(context?.tenureMonths) || 24;
  const selectedGoal = context?.selectedGoal || 'Personal Loan';
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const handleViewOffer = (offer) => {
    if (context?.setSelectedOffer) {
      context.setSelectedOffer(offer);
    }
    navigate(`/offers/${offer.id}`);
  };

  const handleApply = (offer) => {
    if (context?.setSelectedOffer) {
      context.setSelectedOffer(offer);
    }
    navigate('/journey');
  };

  return (
    <>
      <TopAppBar />

      {/* Sub-header / Back Navigation Bar */}
      <div
        style={{
          background: '#ffffff',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid #E8EFF7',
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate('/chat')}
          title="Back to your plan"
          aria-label="Back to your plan"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#EEF4FB',
            border: '1px solid #D0E8FB',
            color: '#002970',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
            boxSizing: 'border-box',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#002970';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#EEF4FB';
            e.currentTarget.style.color = '#002970';
          }}
        >
          <ArrowLeftIcon />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#002970', lineHeight: 1.2 }}>
            Loan Offers
          </div>
          <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 1, fontWeight: 500 }}>
            Options based on the financial details you provided
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div
        style={{
          flex: 1,
          padding: 14,
          overflowY: 'auto',
          background: '#F5F8FC',
          fontFamily: font,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* Summary strip */}
        <div
          style={{
            background: 'linear-gradient(135deg, #002970 0%, #004AAD 100%)',
            borderRadius: 14,
            padding: '14px 16px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {selectedGoal}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 2 }}>
              {formatINR(userPrincipal)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Tenure</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>{userTenure} Months</div>
          </div>
        </div>

        {/* Offers count badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#002970' }}>
            {loanOffers.length} Matching Offers
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#16A34A', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '3px 10px', borderRadius: 999 }}>
            Demo Offers
          </span>
        </div>

        {/* Lender Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          {loanOffers.map((offer) => (
            <LoanOfferCard
              key={offer.id}
              offer={offer}
              principal={userPrincipal}
              tenure={userTenure}
              onViewOffer={handleViewOffer}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <div
          style={{
            textAlign: 'center',
            fontSize: 10,
            color: '#8A9BB0',
            lineHeight: 1.5,
            padding: '4px 8px 16px',
          }}
        >
          Demo offers for illustration. Actual rates, eligibility and approval depend on the lender.
        </div>
      </div>

      <BottomNav />
    </>
  );
}
