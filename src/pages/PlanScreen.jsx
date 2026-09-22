import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinInsight } from '../context/FinInsightContext';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import HeroEmiCard from '../components/HeroEmiCard';
import AffordabilityCard from '../components/AffordabilityCard';
import SummaryCard from '../components/SummaryCard';
import DetailsListCard from '../components/DetailsListCard';
import {
  calculateEMI,
  calculateTotalRepayment,
  calculateTotalInterest,
  calculateAffordability,
} from '../utils/loanCalculations';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

/**
 * Toast component for notifications inside PlanScreen
 */
function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#002970',
        color: '#fff',
        padding: '9px 20px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        zIndex: 200,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      {message}
    </div>
  );
}

/**
 * Inner content for PlanScreen
 */
function PlanScreenContent({ showToast }) {
  const navigate = useNavigate();
  const contextData = useFinInsight() || {};

  // Context variables with demo defaults fallback
  const purpose = contextData.selectedGoal || 'Education';
  const amount = Number(contextData.needAmount) || 200000;
  const tenure = 24; // months
  const interestRate = 14; // % p.a.
  const existingEmi = Number(contextData.emiAmount) || 8200;
  
  const [monthlyIncome, setMonthlyIncome] = useState(35000);

  // Dynamic calculations
  const emi = calculateEMI(amount, interestRate, tenure);
  const totalRepayment = calculateTotalRepayment(emi, tenure);
  const totalInterest = calculateTotalInterest(totalRepayment, amount);
  const affordability = calculateAffordability(emi, existingEmi, monthlyIncome);

  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#F5F8FC',
        fontFamily: font,
        fontSize: 14,
      }}
    >
      {/* 1. Reused TopAppBar */}
      <TopAppBar
        onNotificationClick={() => showToast('Notifications cleared')}
        onProfileClick={() => showToast('Viewing Profile')}
      />

      {/* Scrollable Main Section */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '14px 14px 20px' }}>
        
        {/* 2. Slim back navigation */}
        <button
          onClick={() => navigate('/chat')}
          style={{
            background: 'none',
            border: 'none',
            color: '#002970',
            fontWeight: 600,
            fontSize: 13,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            padding: 0,
            marginBottom: 12,
          }}
        >
          <ArrowLeftIcon />
          <span>Back to chat</span>
        </button>

        {/* 3. Section Heading */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#002970',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Your Financial Plan
            </h1>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: '#E6F6FF',
                color: '#00A8FF',
                padding: '2px 8px',
                borderRadius: 999,
              }}
            >
              {purpose}
            </span>
          </div>
          <p style={{ fontSize: 12, color: '#5F6B7A', margin: 0, lineHeight: '1.4' }}>
            Based on your conversation, here's what this looks like for you.
          </p>
        </div>

        {/* Layout stack of cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* 4. HERO CARD */}
          <HeroEmiCard
            emi={emi}
            amount={amount}
            tenure={tenure}
            interestRate={interestRate}
          />

          {/* 5. COMBINED BURDEN CARD */}
          <AffordabilityCard
            newEmi={emi}
            existingEmi={existingEmi}
            affordability={affordability}
            monthlyIncome={monthlyIncome}
            onIncomeChange={setMonthlyIncome}
          />

          {/* 6. PLAIN-LANGUAGE SUMMARY CARD */}
          <SummaryCard
            totalRepayment={totalRepayment}
            tenure={tenure}
            totalInterest={totalInterest}
          />

          {/* 7. DETAILS CARD (Expandable/List style) */}
          <DetailsListCard
            interestRate={interestRate}
            processingFee={2000}
            tenure={tenure}
            totalInterest={totalInterest}
          />

          {/* 8. Primary CTA Button */}
          <button
            onClick={() => navigate('/offers')}
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
              justify: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 41, 112, 0.25)',
              transition: 'transform 0.1s ease',
              marginTop: 4,
            }}
          >
            <span>See loan offers</span>
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* Reused BottomNav */}
      <BottomNav />
    </div>
  );
}

/**
 * PlanScreen — Full page layout contained inside the iPhone 18 Pro Max device frame on desktop
 */
export default function PlanScreen() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [scale, setScale] = useState(1);
  const PHONE_W = 393;
  const PHONE_H = 852;

  useEffect(() => {
    const computeScale = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const targetH = PHONE_H + 40;
      const targetW = PHONE_W + 40;

      if (vw < 500) {
        setScale(1);
        return;
      }

      const scaleH = vh / targetH;
      const scaleW = vw / targetW;
      const fitScale = Math.min(scaleH, scaleW, 1);
      setScale(Math.max(0.45, fitScale));
    };

    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, []);

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 2600);
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at center, #0F172A 0%, #020617 100%)',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Scaled phone wrapper */}
      <div
        style={{
          width: PHONE_W,
          height: PHONE_H,
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Outer bezel */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#1a1a1a',
            borderRadius: 54,
            boxShadow:
              '0 0 0 1px #3a3a3a, 0 0 0 2px #222, 0 40px 80px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
            padding: 5,
            position: 'relative',
          }}
        >
          {/* Side buttons */}
          <div
            style={{
              position: 'absolute',
              left: -3,
              top: 140,
              width: 3,
              height: 32,
              background: '#2e2e2e',
              borderRadius: '3px 0 0 3px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -3,
              top: 188,
              width: 3,
              height: 58,
              background: '#2e2e2e',
              borderRadius: '3px 0 0 3px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -3,
              top: 256,
              width: 3,
              height: 58,
              background: '#2e2e2e',
              borderRadius: '3px 0 0 3px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -3,
              top: 200,
              width: 3,
              height: 80,
              background: '#2e2e2e',
              borderRadius: '0 3px 3px 0',
            }}
          />

          {/* Screen glass */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 50,
              overflow: 'hidden',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Status bar */}
            <div
              style={{
                background: '#F5F8FC',
                padding: '10px 22px 4px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: '#172B4D' }}>{timeStr}</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                  <rect x="0" y="7" width="3" height="4" rx="0.5" fill="#172B4D" />
                  <rect x="4" y="4.5" width="3" height="6.5" rx="0.5" fill="#172B4D" />
                  <rect x="8" y="2" width="3" height="9" rx="0.5" fill="#172B4D" />
                  <rect x="12" y="0" width="3" height="11" rx="0.5" fill="#D0D8E4" />
                </svg>
                <svg width="15" height="11" viewBox="0 0 24 18" fill="none">
                  <path
                    d="M1 5.5C5.73 1.44 10.87 0 12 0s6.27 1.44 11 5.5"
                    stroke="#172B4D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 9.5C6.9 6.9 9.45 6 12 6s5.1.9 8 3.5"
                    stroke="#172B4D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.5 13c1.2-1.2 2.8-1.8 4.5-1.8s3.3.6 4.5 1.8"
                    stroke="#172B4D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="17" r="1.5" fill="#172B4D" />
                </svg>
                <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                  <rect x="0.5" y="0.5" width="17" height="10" rx="2" stroke="#172B4D" />
                  <rect x="1.5" y="1.5" width="13" height="8" rx="1.5" fill="#172B4D" />
                  <path d="M18.5 3.5v4a2 2 0 000-4z" fill="#172B4D" />
                </svg>
              </div>
            </div>

            {/* Dynamic Island */}
            <div
              style={{
                background: '#F5F8FC',
                display: 'flex',
                justify: 'center',
                paddingBottom: 6,
                flexShrink: 0,
              }}
            >
              <div style={{ width: 118, height: 30, background: '#111', borderRadius: 20 }} />
            </div>

            {/* App content */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <PlanScreenContent showToast={showToast} />
              <Toast message={toast.message} visible={toast.visible} />
            </div>

            {/* Home indicator */}
            <div
              style={{
                background: '#fff',
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{ width: 120, height: 4, background: '#111', borderRadius: 999 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
