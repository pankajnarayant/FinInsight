import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import OfferCard from '../components/OfferCard';
import { loanOffers } from '../data/loanOffers';
import { useFinInsight } from '../context/FinInsightContext';
import {
  calculateEMI,
  calculateTotalRepayment,
  calculateTotalInterest,
  formatINR,
} from '../utils/loanCalculations';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const InfoSubtleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
  </svg>
);

export default function OffersScreen() {
  const navigate = useNavigate();
  const context = useFinInsight();

  const userPrincipal = Number(context?.needAmount) || 200000;
  const userTenure = Number(context?.tenureMonths) || 24;
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const handleSelectOffer = (offer) => {
    if (context?.setSelectedOffer) {
      context.setSelectedOffer(offer);
    }
    navigate('/journey');
  };

  return (
    <>
      <TopAppBar />

      {/* ── Sub-header / Back Navigation Bar ── */}
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
            Compare Loan Offers
          </div>
          <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 1, fontWeight: 500 }}>
            Based on your calculated plan
          </div>
        </div>
      </div>

      {/* ── Scrollable Body ── */}
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
        {/* Title & Subtext Section */}
        <div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#002970',
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            Compare your options
          </h1>
          <p
            style={{
              fontSize: 12.5,
              color: '#5F6B7A',
              marginTop: 4,
              marginBottom: 0,
              lineHeight: 1.45,
            }}
          >
            Here's how each offer stacks up — no single option is the 'best' for everyone.
          </p>

          {/* Sample offers subtle label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              color: '#5F6B7A',
              marginTop: 10,
              background: '#EEF4FB',
              border: '1px solid #D0E8FB',
              padding: '4px 10px',
              borderRadius: 8,
              fontWeight: 500,
            }}
          >
            <InfoSubtleIcon />
            <span>Sample offers — for demonstration purposes</span>
          </div>
        </div>

        {/* Section Header: Pre-Approved / Matching Offers */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: -2 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#002970', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🏦</span>
            <span>Pre-Approved / Matching Offers</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '3px 10px', borderRadius: 999 }}>
            {loanOffers.length} Offers Available
          </span>
        </div>

        {/* Stacked Offer Cards (Natural Order) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          {loanOffers.map((offer) => {
            const effectiveTenure =
              offer.tenureMonths !== null && offer.tenureMonths !== undefined
                ? offer.tenureMonths
                : userTenure;

            const calculatedEmi = calculateEMI(userPrincipal, offer.interestRate, effectiveTenure);
            const calculatedTotalRepayment = calculateTotalRepayment(calculatedEmi, effectiveTenure);
            const calculatedProcessingFee = Math.round((userPrincipal * offer.processingFeePercent) / 100);

            return (
              <OfferCard
                key={offer.id}
                offer={offer}
                calculatedEmi={calculatedEmi}
                calculatedTotalRepayment={calculatedTotalRepayment}
                calculatedProcessingFee={calculatedProcessingFee}
                effectiveTenure={effectiveTenure}
                principal={userPrincipal}
                onSelect={handleSelectOffer}
              />
            );
          })}
        </div>

        {/* Bottom Link back to Chat */}
        <div style={{ textAlign: 'center', margin: '8px 0 16px' }}>
          <button
            onClick={() => navigate('/chat')}
            style={{
              background: 'none',
              border: 'none',
              color: '#004AAD',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
              fontFamily: font,
            }}
          >
            None of these fit? Go back to adjust your plan
          </button>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
