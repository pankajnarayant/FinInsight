import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
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

const BankIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M3 21h18M3 10h18M5 10v7M9 10v7M15 10v7M19 10v7M12 3L2 8h20L12 3z" fill="#00A8FF" fillOpacity="0.2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#004AAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
  </svg>
);

export default function LoanOfferDetailsScreen() {
  const navigate = useNavigate();
  const { offerId } = useParams();
  const context = useFinInsight();
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const [toastVisible, setToastVisible] = useState(false);

  // Find exact offer by URL param or context selectedOffer fallback
  const offer =
    loanOffers.find((o) => o.id === offerId) ||
    context?.selectedOffer ||
    loanOffers[0];

  const principal = Number(context?.needAmount) || 200000;
  const tenureMonths =
    offer.tenureMonths || Number(context?.tenureMonths) || 24;

  // Financial Calculations (Pure JavaScript functions)
  const emi = calculateEMI(principal, offer.interestRate, tenureMonths);
  const totalRepayment = calculateTotalRepayment(emi, tenureMonths);
  const totalInterest = calculateTotalInterest(totalRepayment, principal);
  const processingFeeAmount = Math.round(
    (principal * offer.processingFeePercent) / 100
  );

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
            Loan Offer Details
          </div>
          <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 1, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {offer.lenderName}
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
        {/* 1. Lender Header Card */}
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
            <BankIcon />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 900, color: '#002970', lineHeight: 1.2 }}>
              {offer.lenderName}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#004AAD', marginTop: 2 }}>
              {offer.loanProduct || offer.loanType}
            </div>
            <div style={{ fontSize: 11, color: '#8A9BB0', marginTop: 2 }}>
              Type: {offer.loanType}
            </div>
          </div>
        </div>

        {/* 2. Key Summary Card (EMI, Principal & Rate) */}
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
            Monthly EMI
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, marginTop: 4, lineHeight: 1.1 }}>
            {formatINR(emi)}
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
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Requested Amount</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>{formatINR(principal)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Interest Rate</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>
                {offer.interestRate}% p.a. {offer.rateType ? `(${offer.rateType})` : ''}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Detailed Repayment Breakdown */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: 16,
            border: '1px solid #E8EFF7',
            boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: '#002970', borderBottom: '1px solid #F0F4F8', paddingBottom: 8 }}>
            Repayment Breakdown
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ color: '#5F6B7A' }}>Tenure</span>
            <span style={{ fontWeight: 700, color: '#172B4D' }}>{tenureMonths} Months</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ color: '#5F6B7A' }}>Monthly EMI</span>
            <span style={{ fontWeight: 700, color: '#172B4D' }}>{formatINR(emi)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ color: '#5F6B7A' }}>Total Interest Payable</span>
            <span style={{ fontWeight: 700, color: '#004AAD' }}>{formatINR(totalInterest)}</span>
          </div>

          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              fontSize: 13,
              paddingTop: 8,
              borderTop: '1px dashed #E8EFF7',
            }}
          >
            <span style={{ fontWeight: 700, color: '#002970' }}>Total Repayment</span>
            <span style={{ fontWeight: 900, color: '#002970' }}>{formatINR(totalRepayment)}</span>
          </div>
        </div>

        {/* 4. Fees and Charges */}
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
            Fees & Charges
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
            <span style={{ color: '#5F6B7A' }}>Processing Fee ({offer.processingFeePercent}%)</span>
            <span style={{ fontWeight: 700, color: '#172B4D' }}>{formatINR(processingFeeAmount)}</span>
          </div>

          {offer.otherCharges && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, background: '#FAFCFF', padding: '8px 10px', borderRadius: 8, border: '1px solid #F0F4F8' }}>
              <span style={{ color: '#5F6B7A' }}>Other Charges</span>
              <span style={{ fontWeight: 600, color: '#004AAD', textAlign: 'right' }}>{offer.otherCharges}</span>
            </div>
          )}

          <div style={{ fontSize: 10, color: '#8A9BB0', fontStyle: 'italic', marginTop: 2 }}>
            * Note: All fee values shown above are demo/example estimates.
          </div>
        </div>

        {/* 5. Eligibility & Demo Requirements */}
        {offer.eligibility && (
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
                Eligibility Criteria
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#004AAD', background: '#EEF4FB', padding: '2px 7px', borderRadius: 999 }}>
                Demo Criteria
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
              <div style={{ background: '#FAFCFF', padding: 10, borderRadius: 10, border: '1px solid #F0F4F8' }}>
                <div style={{ color: '#8A9BB0', fontSize: 10 }}>Min Income</div>
                <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 2 }}>{offer.eligibility.minIncome}</div>
              </div>
              <div style={{ background: '#FAFCFF', padding: 10, borderRadius: 10, border: '1px solid #F0F4F8' }}>
                <div style={{ color: '#8A9BB0', fontSize: 10 }}>Age Limit</div>
                <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 2 }}>{offer.eligibility.ageRange}</div>
              </div>
            </div>

            <div style={{ background: '#FAFCFF', padding: 10, borderRadius: 10, border: '1px solid #F0F4F8', fontSize: 12 }}>
              <div style={{ color: '#8A9BB0', fontSize: 10 }}>Employment Type</div>
              <div style={{ fontWeight: 700, color: '#172B4D', marginTop: 2 }}>{offer.eligibility.employment}</div>
            </div>

            {offer.eligibility.documents && (
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#002970', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileTextIcon />
                  <span>Required Documents (Demo)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {offer.eligibility.documents.map((doc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#5F6B7A' }}>
                      <CheckCircleIcon />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. Key Features */}
        {offer.features && (
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
              Product Features
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {offer.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#172B4D', lineHeight: 1.4 }}>
                  <div style={{ marginTop: 2 }}>
                    <CheckCircleIcon />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* 8. Primary CTA Button */}
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
          Demo information for illustration only. Actual lender terms, eligibility, rates and approval may differ.
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
          This would continue to {offer.lenderName}&apos;s application flow.
        </div>
      )}

      <BottomNav />
    </>
  );
}
