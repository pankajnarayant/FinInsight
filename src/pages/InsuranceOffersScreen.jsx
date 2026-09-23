import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import { insuranceOffers } from '../data/insuranceOffers';
import { useFinInsight } from '../context/FinInsightContext';
import { formatINR } from '../utils/loanCalculations';

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

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#00A8FF" fillOpacity="0.2" />
    <path d="M9 12l2 2 4-4" strokeWidth="2.5" />
  </svg>
);

const InfoCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
  </svg>
);

function InsuranceOfferCard({ offer, coverageAmount, onViewPlan }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  const monthlyPremium = Math.round(coverageAmount * offer.monthlyPremiumFactor);
  const annualPremium = monthlyPremium * 12;

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
      {/* Header: Provider name + type */}
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
          <ShieldIcon />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#002970', lineHeight: 1.2 }}>
            {offer.providerName}
          </div>
          <div style={{ fontSize: 11, color: '#8A9BB0', fontWeight: 500, marginTop: 1 }}>
            {offer.insuranceType}
          </div>
        </div>
        <div style={{ background: '#ECFDF5', borderRadius: 8, padding: '4px 8px', fontSize: 10, fontWeight: 700, color: '#16A34A', flexShrink: 0, border: '1px solid #A7F3D0' }}>
          {offer.policyTerm}
        </div>
      </div>

      {/* Premium Highlight Strip */}
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
            Est. Monthly Premium
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#002970', lineHeight: 1.2, marginTop: 2 }}>
            {formatINR(monthlyPremium)}
            <span style={{ fontSize: 12, fontWeight: 600, color: '#5F6B7A', marginLeft: 2 }}>/mo</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: '#8A9BB0' }}>Annual Premium</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#004AAD' }}>{formatINR(annualPremium)}</div>
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
          <div style={{ color: '#8A9BB0', fontSize: 10 }}>Coverage Amount</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>{formatINR(coverageAmount)}</div>
        </div>
        <div>
          <div style={{ color: '#8A9BB0', fontSize: 10 }}>Policy Term</div>
          <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 1 }}>{offer.policyTerm}</div>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ color: '#8A9BB0', fontSize: 10 }}>Key Benefit</div>
          <div style={{ fontWeight: 600, color: '#172B4D', marginTop: 1, lineHeight: 1.4 }}>{offer.keyBenefit}</div>
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
          onClick={() => onViewPlan(offer)}
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
          View Plan
        </button>
        <button
          onClick={() => onViewPlan(offer)}
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

export default function InsuranceOffersScreen() {
  const navigate = useNavigate();
  const context = useFinInsight();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const coverageAmount = Number(context?.needAmount) || 500000;
  const selectedGoal = context?.selectedGoal || 'Health Insurance';
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const handleViewPlan = (offer) => {
    setToastMsg(`Demo: This would proceed to ${offer.providerName}'s application on Paytm.`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
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
            Insurance Options
          </div>
          <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 1, fontWeight: 500 }}>
            Options based on the information you provided
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
              {formatINR(coverageAmount)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Coverage</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>Sum Insured</div>
          </div>
        </div>

        {/* Offers count badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#002970' }}>
            {insuranceOffers.length} Matching Plans
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#16A34A', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '3px 10px', borderRadius: 999 }}>
            Demo Plans
          </span>
        </div>

        {/* Insurance Provider Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          {insuranceOffers.map((offer) => (
            <InsuranceOfferCard
              key={offer.id}
              offer={offer}
              coverageAmount={coverageAmount}
              onViewPlan={handleViewPlan}
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
          Demo plans for illustration. Actual premiums, coverage terms and eligibility depend on the insurer.
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
          {toastMsg}
        </div>
      )}

      <BottomNav />
    </>
  );
}
