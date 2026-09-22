import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import HeroEmiCard from '../components/HeroEmiCard';
import AffordabilityCard from '../components/AffordabilityCard';
import SummaryCard from '../components/SummaryCard';
import DetailsListCard from '../components/DetailsListCard';
import { useFinInsight } from '../context/FinInsightContext';
import {
  calculateEMI,
  calculateTotalRepayment,
  calculateTotalInterest,
  calculateAffordability,
  formatINR,
} from '../utils/loanCalculations';

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function ChatScreen() {
  const navigate = useNavigate();
  const context = useFinInsight();

  // Retrieve initial values from context or fallbacks
  const defaultPurpose = context?.selectedGoal || 'Education Loan';
  const defaultAmount = Number(context?.needAmount) || 200000;
  const defaultTenure = Number(context?.tenureMonths) || 24;
  const existingEmi = Number(context?.existingEmi) || 8200;

  // Step state: 1 = Purpose selection, 2 = Amount selection, 3 = Tenure selection, 4 = Finalized
  const [chatStep, setChatStep] = useState(1);
  const [capturedPurpose, setCapturedPurpose] = useState(defaultPurpose);
  const [capturedAmount, setCapturedAmount] = useState(defaultAmount);
  const [capturedTenure, setCapturedTenure] = useState(defaultTenure);

  // Calculation readiness & typing indicator states
  const [isCalculating, setIsCalculating] = useState(false);
  const [isPlanReady, setIsPlanReady] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(35000);

  const chatEndRef = useRef(null);

  // Auto-scroll chat stream to bottom whenever steps or plan readiness update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatStep, isCalculating, isPlanReady, monthlyIncome]);

  // Mobile phone scaling calculation for desktop presentation frame
  const [scale, setScale] = useState(1);
  const PHONE_W = 393;
  const PHONE_H = 852;

  useEffect(() => {
    const computeScale = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const fitScale = Math.min(vh / (PHONE_H + 40), vw / (PHONE_W + 40), 1);
      setScale(vw < 500 ? 1 : Math.max(0.45, fitScale));
    };
    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, []);

  // Handler when Purpose is selected
  const handleSelectPurpose = (p) => {
    setCapturedPurpose(p);
    if (context?.setSelectedGoal) context.setSelectedGoal(p);
    setChatStep(2);
  };

  // Handler when Amount is selected
  const handleSelectAmount = (amt) => {
    setCapturedAmount(amt);
    if (context?.setNeedAmount) context.setNeedAmount(amt);
    setChatStep(3);
  };

  // Handler when Tenure is selected -> triggers instant calculation & inline plan display
  const handleSelectTenure = (tenureVal) => {
    setCapturedTenure(tenureVal);
    if (context?.setTenureMonths) context.setTenureMonths(tenureVal);
    setChatStep(4);

    // Show brief typing indicator delay (750ms), then render full inline plan card
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setIsPlanReady(true);
    }, 750);
  };

  // Compute dynamic live numbers using loanCalculations.js
  const interestRate = 14;
  const computedEmi = calculateEMI(capturedAmount, interestRate, capturedTenure);
  const computedTotalRepayment = calculateTotalRepayment(computedEmi, capturedTenure);
  const computedTotalInterest = calculateTotalInterest(computedTotalRepayment, capturedAmount);
  const computedAffordability = calculateAffordability(computedEmi, existingEmi, monthlyIncome);

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, #0F172A 0%, #020617 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ width: PHONE_W, height: PHONE_H, transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <div style={{ width: '100%', height: '100%', background: '#1a1a1a', borderRadius: 54, padding: 5, position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 50, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            
            {/* Status bar */}
            <div style={{ background: '#F5F8FC', padding: '10px 22px 4px', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#172B4D' }}>{timeStr}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#172B4D' }}>5G</span>
            </div>

            {/* Dynamic Island */}
            <div style={{ background: '#F5F8FC', display: 'flex', justifyContent: 'center', paddingBottom: 6, flexShrink: 0 }}>
              <div style={{ width: 118, height: 30, background: '#111', borderRadius: 20 }} />
            </div>

            <TopAppBar />

            {/* AI Conversation Scroll Body */}
            <div style={{ flex: 1, padding: 14, overflowY: 'auto', background: '#F5F8FC', fontFamily: font, display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              <div style={{ fontSize: 11, textAlign: 'center', color: '#8A99AD', margin: '2px 0' }}>FinInsight AI Assistant</div>

              {/* Step 1: Initial AI Greeting */}
              <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                Hello Rahul 👋 I'm your AI financial assistant. Let's personalize your plan!
              </div>

              <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                What is your primary borrowing goal or requirement?
              </div>

              {/* Step 1 Purpose Choices */}
              {chatStep === 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '4px 0' }}>
                  {['Education Loan', 'Personal Loan', 'Business Loan', 'Home Improvement', 'Medical Emergency'].map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSelectPurpose(p)}
                      style={{ background: '#002970', color: '#fff', border: 'none', borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {/* Display User Selection for Step 1 */}
              {chatStep > 1 && (
                <div style={{ alignSelf: 'flex-end', background: '#002970', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '8px 14px', maxWidth: '80%', fontSize: 13, fontWeight: 600 }}>
                  Goal: {capturedPurpose}
                </div>
              )}

              {/* Step 2: Amount Prompt */}
              {chatStep >= 2 && (
                <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                  Got it! What loan amount do you require for <strong>{capturedPurpose}</strong>?
                </div>
              )}

              {/* Step 2 Amount Choices */}
              {chatStep === 2 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '4px 0' }}>
                  {[100000, 200000, 240000, 350000, 500000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleSelectAmount(amt)}
                      style={{ background: '#00A8FF', color: '#fff', border: 'none', borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      {formatINR(amt)}
                    </button>
                  ))}
                </div>
              )}

              {/* Display User Selection for Step 2 */}
              {chatStep > 2 && (
                <div style={{ alignSelf: 'flex-end', background: '#00A8FF', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '8px 14px', maxWidth: '80%', fontSize: 13, fontWeight: 600 }}>
                  Amount: {formatINR(capturedAmount)}
                </div>
              )}

              {/* Step 3: Tenure Prompt */}
              {chatStep >= 3 && (
                <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                  What repayment tenure (in months) fits your comfortable monthly budget?
                </div>
              )}

              {/* Step 3 Tenure Choices */}
              {chatStep === 3 && (
                <div style={{ display: 'flex', gap: 8, margin: '4px 0' }}>
                  {[12, 24, 36, 48].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleSelectTenure(t)}
                      style={{ background: '#002970', color: '#fff', border: 'none', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flex: 1 }}
                    >
                      {t} Months
                    </button>
                  ))}
                </div>
              )}

              {/* Display User Selection for Step 3 */}
              {chatStep > 3 && (
                <div style={{ alignSelf: 'flex-end', background: '#002970', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '8px 14px', maxWidth: '80%', fontSize: 13, fontWeight: 600 }}>
                  Tenure: {capturedTenure} Months
                </div>
              )}

              {/* Typing Indicator Bubble during calculation */}
              {isCalculating && (
                <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 16px', border: '1px solid #E8EFF7', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A8FF', animation: 'bounce 1s infinite 0s' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A8FF', animation: 'bounce 1s infinite 0.2s' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A8FF', animation: 'bounce 1s infinite 0.4s' }} />
                  </div>
                  <span style={{ fontSize: 12, color: '#5F6B7A', fontWeight: 500 }}>Calculating your personalized plan...</span>
                </div>
              )}

              {/* AUTOMATIC INLINE FINANCIAL PLAN CARD RENDERED DIRECTLY INSIDE CHAT */}
              {isPlanReady && (
                <>
                  <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '90%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                    🎉 Here is your complete calculated <strong>Financial Plan & EMI Breakdown</strong> for <strong>{capturedPurpose}</strong> ({formatINR(capturedAmount)} over {capturedTenure} months):
                  </div>

                  {/* RICH INLINE CALCULATION CONTAINER */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', margin: '4px 0' }}>
                    
                    {/* 1. HERO EMI CARD */}
                    <HeroEmiCard
                      emi={computedEmi}
                      amount={capturedAmount}
                      tenure={capturedTenure}
                      interestRate={interestRate}
                    />

                    {/* 2. COMBINED BURDEN & AFFORDABILITY CARD */}
                    <AffordabilityCard
                      newEmi={computedEmi}
                      existingEmi={existingEmi}
                      affordability={computedAffordability}
                      monthlyIncome={monthlyIncome}
                      onIncomeChange={setMonthlyIncome}
                    />

                    {/* 3. PLAIN-LANGUAGE SUMMARY CARD */}
                    <SummaryCard
                      totalRepayment={computedTotalRepayment}
                      tenure={capturedTenure}
                      totalInterest={computedTotalInterest}
                    />

                    {/* 4. EXPANDABLE DETAILS LIST CARD */}
                    <DetailsListCard
                      interestRate={interestRate}
                      processingFee={2000}
                      tenure={capturedTenure}
                      totalInterest={computedTotalInterest}
                    />

                    {/* 5. PRIMARY CTA BUTTON TO ROUTE TO OFFERS (SCREEN 4) */}
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
                </>
              )}

              <div ref={chatEndRef} />
            </div>

            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
}
