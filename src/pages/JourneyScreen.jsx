import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import ChecklistCard from '../components/ChecklistCard';
import SelectedOfferSummaryCard from '../components/SelectedOfferSummaryCard';
import { useFinInsight } from '../context/FinInsightContext';
import {
  calculateEMI,
  calculateTotalRepayment,
  formatINR,
} from '../utils/loanCalculations';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 2a9.96 9.96 0 014 8c0 5.25-4 9-4 9S8 15.25 8 10a9.96 9.96 0 014-8z" fill="#00A8FF" fillOpacity="0.18" />
    <circle cx="12" cy="10" r="2" fill="#004AAD" fillOpacity="0.5" stroke="none" />
    <path d="M8 17l-3 3M16 17l3 3" />
    <path d="M9 13.5l-3 1.5 1-3M15 13.5l3 1.5-1-3" fill="#EEF4FB" stroke="#004AAD" strokeWidth="1.5" />
  </svg>
);

/**
 * JourneyScreen — Screen 5: "Your Financial Journey"
 * Shows a checklist of steps completed, the selected offer summary,
 * a disclaimer, a primary CTA, and a "Start a new plan" reset link.
 */
export default function JourneyScreen() {
  const navigate = useNavigate();
  const context = useFinInsight();
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const [toastVisible, setToastVisible] = useState(false);

  const selectedOffer = context?.selectedOffer || null;
  const selectedGoal = context?.selectedGoal || 'Personal Loan';
  const needAmount = Number(context?.needAmount) || 200000;
  const tenureMonths = Number(context?.tenureMonths) || 24;

  // Derive effective tenure & EMI from selected offer, falling back to context
  const effectiveTenure =
    selectedOffer?.tenureMonths !== null && selectedOffer?.tenureMonths !== undefined
      ? selectedOffer.tenureMonths
      : tenureMonths;

  const calculatedEmi = selectedOffer
    ? calculateEMI(needAmount, selectedOffer.interestRate, effectiveTenure)
    : 0;

  const processingFee = selectedOffer
    ? Math.round((needAmount * selectedOffer.processingFeePercent) / 100)
    : 0;

  // Checklist items built from context data
  const checklistItems = [
    {
      label: 'Goal understood',
      description: `${selectedGoal} of ${formatINR(needAmount)}`,
    },
    {
      label: 'Affordability calculated',
      description: 'Combined EMI reviewed against your income',
    },
    {
      label: 'Options analyzed',
      description: '3 offers compared side by side',
    },
    {
      label: 'Terms explained',
      description: 'Interest, fees & tenure clarified',
    },
  ];

  const handleContinue = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleStartNew = () => {
    // Reset relevant state
    if (context?.setSelectedOffer) context.setSelectedOffer(null);
    if (context?.setSelectedGoal) context.setSelectedGoal('Personal Loan');
    if (context?.setNeedAmount) context.setNeedAmount(200000);
    if (context?.setTenureMonths) context.setTenureMonths(24);
    navigate('/');
  };

  return (
    <>
      <TopAppBar />

      {/* ── Sub-header / Back Navigation ── */}
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
          onClick={() => navigate('/offers')}
          title="Back to Offers"
          aria-label="Back to Offers"
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

        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#002970', lineHeight: 1.2 }}>
            Your Financial Journey
          </div>
          <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 1, fontWeight: 500 }}>
            Back to Offers
          </div>
        </div>
      </div>

      {/* ── Scrollable Body ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#F5F8FC',
          fontFamily: font,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Hero illustration strip */}
        <div
          style={{
            background: 'linear-gradient(135deg, #002970 0%, #004AAD 100%)',
            padding: '24px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            flexShrink: 0,
          }}
        >
          {/* Rocket icon container */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
              <path d="M12 2c2 1.5 4 4.5 4 8 0 4-4 9-4 9S8 14 8 10c0-3.5 2-6.5 4-8z" fill="rgba(255,255,255,0.2)" />
              <circle cx="12" cy="10" r="2" fill="rgba(255,255,255,0.5)" stroke="none" />
              <path d="M8 16l-3 3M16 16l3 3" />
            </svg>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>
              Your Financial Journey
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', marginTop: 4, lineHeight: 1.5 }}>
              Here's a summary of what we covered together.
            </div>
          </div>
        </div>

        {/* Content cards */}
        <div
          style={{
            flex: 1,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* 1. Checklist card */}
          <ChecklistCard items={checklistItems} />

          {/* 2. Selected offer summary card */}
          {selectedOffer ? (
            <SelectedOfferSummaryCard
              offer={selectedOffer}
              emi={calculatedEmi}
              tenure={effectiveTenure}
              processingFee={processingFee}
              principal={needAmount}
            />
          ) : (
            /* Fallback if user lands directly on /journey without selecting an offer */
            <div
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: 16,
                border: '1px solid #E8EFF7',
                boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 13, color: '#5F6B7A', lineHeight: 1.5 }}>
                No offer selected yet.{' '}
                <button
                  onClick={() => navigate('/offers')}
                  style={{ background: 'none', border: 'none', color: '#004AAD', fontWeight: 700, cursor: 'pointer', fontSize: 13, padding: 0 }}
                >
                  Go back to compare offers →
                </button>
              </div>
            </div>
          )}

          {/* 3. Disclaimer */}
          <div
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: '#8A9BB0',
              lineHeight: 1.5,
              padding: '0 8px',
            }}
          >
            Final eligibility, pricing and approval are determined by the lending partner.
          </div>

          {/* 4. Primary CTA */}
          <button
            onClick={handleContinue}
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #002970 0%, #004AAD 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 14,
              padding: '14px 20px',
              fontSize: 15,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0, 41, 112, 0.28)',
              fontFamily: font,
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            <span>Continue to Loan Application</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowRightIcon />
            </div>
          </button>

          {/* 5. Secondary text link */}
          <div style={{ textAlign: 'center', paddingBottom: 16 }}>
            <button
              onClick={handleStartNew}
              style={{
                background: 'none',
                border: 'none',
                color: '#004AAD',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: font,
              }}
            >
              Start a new plan
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#002970',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: 16,
            fontSize: 12,
            fontWeight: 600,
            zIndex: 200,
            whiteSpace: 'normal',
            textAlign: 'center',
            width: 'calc(100% - 32px)',
            maxWidth: 440,
            lineHeight: 1.4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            fontFamily: font,
          }}
        >
          This would hand off to {selectedOffer?.lenderName || 'the lender'}'s application flow on Paytm.
        </div>
      )}

      <BottomNav />
    </>
  );
}
