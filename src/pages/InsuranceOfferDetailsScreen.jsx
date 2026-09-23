import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#00A8FF" fillOpacity="0.2" />
    <path d="M9 12l2 2 4-4" strokeWidth="2.5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
  </svg>
);

export default function InsuranceOfferDetailsScreen() {
  const navigate = useNavigate();
  const { planId } = useParams();
  const context = useFinInsight();
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const [toastVisible, setToastVisible] = useState(false);

  // Find exact plan by URL param or context selectedOffer fallback
  const plan =
    insuranceOffers.find((p) => p.id === planId) ||
    context?.selectedOffer ||
    insuranceOffers[0];

  const coverageAmount = Number(context?.needAmount) || 500000;
  const monthlyPremium = Math.round(coverageAmount * plan.monthlyPremiumFactor);
  const annualPremium = monthlyPremium * 12;

  const handleContinue = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  return (
    <>
      <TopAppBar />

      {/* Sub-header Navigation Bar */}
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
          onClick={() => navigate('/insurance-offers')}
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
            Insurance Plan Details
          </div>
          <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 1, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {plan.providerName}
          </div>
        </div>
      </div>

      {/* Scrollable Details Body */}
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
        {/* 1. Provider Header Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: 16,
            border: '1px solid #E8EFF7',
            boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
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
            <div style={{ fontSize: 17, fontWeight: 900, color: '#002970', lineHeight: 1.2 }}>
              {plan.providerName}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#004AAD', marginTop: 2 }}>
              {plan.insuranceType}
            </div>
            <div style={{ fontSize: 11, color: '#8A9BB0', marginTop: 2 }}>
              Term: {plan.policyTerm}
            </div>
          </div>
        </div>

        {/* 2. Premium & Coverage Strip */}
        <div
          style={{
            background: 'linear-gradient(135deg, #002970 0%, #004AAD 100%)',
            borderRadius: 16,
            padding: 16,
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(0, 41, 112, 0.2)',
          }}
        >
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Est. Monthly Premium
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, marginTop: 4, lineHeight: 1.1 }}>
            {formatINR(monthlyPremium)}
            <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginLeft: 4 }}>/month</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Coverage (Sum Insured)</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>{formatINR(coverageAmount)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Annual Premium</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>{formatINR(annualPremium)}</div>
            </div>
          </div>
        </div>

        {/* 3. Key Highlight Benefit */}
        <div
          style={{
            background: '#EEF4FB',
            border: '1px solid #D0E8FB',
            borderRadius: 14,
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12.5,
            fontWeight: 700,
            color: '#004AAD',
          }}
        >
          <InfoIcon />
          <span>{plan.keyBenefit}</span>
        </div>

        {/* 4. Coverage Details */}
        {plan.coverageDetails && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 16,
              border: '1px solid #E8EFF7',
              boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: '#002970', borderBottom: '1px solid #F0F4F8', paddingBottom: 8 }}>
              Coverage Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {plan.coverageDetails.map((cov, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#172B4D', lineHeight: 1.4 }}>
                  <div style={{ marginTop: 2 }}>
                    <CheckCircleIcon />
                  </div>
                  <span>{cov}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Important Exclusions */}
        {plan.exclusions && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 16,
              border: '1px solid #E8EFF7',
              boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: '#002970', borderBottom: '1px solid #F0F4F8', paddingBottom: 8 }}>
              Important Exclusions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {plan.exclusions.map((ex, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#5F6B7A', lineHeight: 1.4 }}>
                  <div style={{ marginTop: 2 }}>
                    <XCircleIcon />
                  </div>
                  <span>{ex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Claim Information */}
        {plan.claimInfo && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 16,
              border: '1px solid #E8EFF7',
              boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: '#002970', borderBottom: '1px solid #F0F4F8', paddingBottom: 8 }}>
              Claim Settlement & Hospital Network
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
              <div style={{ background: '#ECFDF5', padding: 10, borderRadius: 10, border: '1px solid #A7F3D0' }}>
                <div style={{ color: '#16A34A', fontSize: 10, fontWeight: 700 }}>Settlement Ratio</div>
                <div style={{ fontWeight: 800, color: '#065F46', marginTop: 2 }}>{plan.claimInfo.claimSettlementRatio}</div>
              </div>
              <div style={{ background: '#FAFCFF', padding: 10, borderRadius: 10, border: '1px solid #F0F4F8' }}>
                <div style={{ color: '#8A9BB0', fontSize: 10 }}>Cashless Hospitals</div>
                <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 2 }}>{plan.claimInfo.cashlessHospitals}</div>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: '#5F6B7A', lineHeight: 1.4, background: '#FAFCFF', padding: 10, borderRadius: 10, border: '1px solid #F0F4F8' }}>
              <strong>Claim Process:</strong> {plan.claimInfo.claimProcess}
            </div>
          </div>
        )}

        {/* 7. Eligibility Requirements */}
        {plan.eligibility && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 16,
              border: '1px solid #E8EFF7',
              boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F0F4F8', paddingBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#002970' }}>
                Eligibility Requirements
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#004AAD', background: '#EEF4FB', padding: '2px 7px', borderRadius: 999 }}>
                Demo Criteria
              </span>
            </div>

            <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6, color: '#5F6B7A' }}>
              <div><strong>Age Range:</strong> {plan.eligibility.minAge} — {plan.eligibility.maxAge}</div>
              <div><strong>Medical Test:</strong> {plan.eligibility.medicalCheckup}</div>
            </div>
          </div>
        )}

        {/* 8. Disclaimer */}
        <div
          style={{
            background: '#FAFCFF',
            border: '1px solid #E8EFF7',
            borderRadius: 14,
            padding: 12,
            fontSize: 11,
            color: '#5F6B7A',
            lineHeight: 1.45,
          }}
        >
          <strong>Disclaimer:</strong> Demo information for illustration only. Actual provider terms, eligibility, premiums, coverage limits and claim approval are subject to insurer underwriting.
        </div>

        {/* 9. Primary CTA Button */}
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
            cursor: 'pointer',
            fontFamily: font,
            boxShadow: '0 4px 14px rgba(0, 41, 112, 0.25)',
            marginTop: 4,
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          Continue
        </button>

        {/* Bottom Disclaimer */}
        <div
          style={{
            textAlign: 'center',
            fontSize: 10,
            color: '#8A9BB0',
            lineHeight: 1.5,
            padding: '4px 8px 16px',
          }}
        >
          Demo information for illustration only. Actual lender/provider terms, eligibility, rates, premiums and approval may differ.
        </div>
      </div>

      {/* Toast popup */}
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
          This would hand off to {plan.providerName}&apos;s application flow on Paytm.
        </div>
      )}

      <BottomNav />
    </>
  );
}
