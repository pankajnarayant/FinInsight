import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import { useFinInsight } from '../context/FinInsightContext';
import { calculateEMI, formatINR } from '../utils/loanCalculations';

export default function ChatScreen() {
  const navigate = useNavigate();
  const context = useFinInsight();

  // Retrieve context setters & getters
  const selectedGoal = context?.selectedGoal || 'Personal Loan';
  const needAmount = context?.needAmount || 200000;
  const tenureMonths = context?.tenureMonths || 24;
  const existingEmi = context?.existingEmi || 8200;

  // Local chat step state
  const [chatStep, setChatStep] = useState(1); // 1: Purpose, 2: Amount, 3: Tenure, 4: Prompt for calculation
  const [localPurpose, setLocalPurpose] = useState(selectedGoal);
  const [localAmount, setLocalAmount] = useState(needAmount);
  const [localTenure, setLocalTenure] = useState(tenureMonths);
  const [showInChatSummary, setShowInChatSummary] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatStep, showInChatSummary]);

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

  const handleSelectPurpose = (p) => {
    setLocalPurpose(p);
    if (context?.setSelectedGoal) context.setSelectedGoal(p);
    setChatStep(2);
  };

  const handleSelectAmount = (amt) => {
    setLocalAmount(amt);
    if (context?.setNeedAmount) context.setNeedAmount(amt);
    setChatStep(3);
  };

  const handleSelectTenure = (t) => {
    setLocalTenure(t);
    if (context?.setTenureMonths) context.setTenureMonths(t);
    setChatStep(4);
  };

  const currentEmi = calculateEMI(localAmount, 14, localTenure);

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

            {/* AI Assistant Chat Stream */}
            <div style={{ flex: 1, padding: 14, overflowY: 'auto', background: '#F5F8FC', fontFamily: font, display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              <div style={{ fontSize: 11, textAlign: 'center', color: '#8A99AD', margin: '2px 0' }}>AI Financial Assistant</div>

              {/* Step 1: Initial AI Greeting */}
              <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                Hello Rahul 👋 I'm your FinInsight AI assistant. Let's personalize your financial decision!
              </div>

              <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                What is your primary borrowing goal or financial requirement?
              </div>

              {/* Purpose choices if step >= 1 */}
              {chatStep === 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '4px 0' }}>
                  {['Personal Loan', 'Education Loan', 'Business', 'Home Improvement', 'Medical Emergency'].map((p) => (
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

              {/* User selected Purpose */}
              {chatStep > 1 && (
                <div style={{ alignSelf: 'flex-end', background: '#002970', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '8px 14px', maxWidth: '80%', fontSize: 13, fontWeight: 600 }}>
                  Selected Goal: {localPurpose}
                </div>
              )}

              {/* Step 2: Amount Prompt */}
              {chatStep >= 2 && (
                <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                  Got it! What loan amount do you require for <strong>{localPurpose}</strong>?
                </div>
              )}

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

              {chatStep > 2 && (
                <div style={{ alignSelf: 'flex-end', background: '#00A8FF', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '8px 14px', maxWidth: '80%', fontSize: 13, fontWeight: 600 }}>
                  Amount: {formatINR(localAmount)}
                </div>
              )}

              {/* Step 3: Tenure Prompt */}
              {chatStep >= 3 && (
                <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                  What repayment tenure (in months) fits your comfortable monthly budget?
                </div>
              )}

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

              {chatStep > 3 && (
                <div style={{ alignSelf: 'flex-end', background: '#002970', color: '#fff', borderRadius: '16px 16px 4px 16px', padding: '8px 14px', maxWidth: '80%', fontSize: 13, fontWeight: 600 }}>
                  Tenure: {localTenure} Months
                </div>
              )}

              {/* Step 4: AI Asks User Before Opening Financial Calculation Plan */}
              {chatStep >= 4 && (
                <>
                  <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
                    Thank you! I have captured all your details for <strong>{localPurpose}</strong> ({formatINR(localAmount)} over {localTenure} months).
                  </div>

                  <div style={{ alignSelf: 'flex-start', background: '#EEF8FF', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #BAE6FD', fontSize: 13, color: '#004AAD', lineHeight: 1.45, fontWeight: 600 }}>
                    💡 Would you like to view your complete calculated Financial Plan and combined EMI burden breakdown now?
                  </div>

                  {/* Primary Interactive Options before going to detail breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '4px 0' }}>
                    <button
                      onClick={() => navigate('/plan')}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(90deg, #002970 0%, #004AAD 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 14,
                        padding: '13px 16px',
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: 8,
                        boxShadow: '0 4px 14px rgba(0,41,112,0.25)',
                      }}
                    >
                      <span>View Personalized Financial Plan & EMI Breakdown</span>
                      <span>→</span>
                    </button>

                    <button
                      onClick={() => setShowInChatSummary(!showInChatSummary)}
                      style={{
                        width: '100%',
                        background: '#ffffff',
                        color: '#002970',
                        border: '1px solid #CBD5E1',
                        borderRadius: 12,
                        padding: '10px 14px',
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {showInChatSummary ? 'Hide Captured Details' : 'Show Captured Details'}
                    </button>
                  </div>

                  {/* Inline Captured Data Section when requested */}
                  {showInChatSummary && (
                    <div style={{ background: '#ffffff', borderRadius: 16, padding: 14, border: '1px solid #E2E8F0', marginTop: 4, fontFamily: font }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#002970', marginBottom: 10 }}>Captured Requirement Summary</div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Borrowing Purpose:</span>
                          <strong style={{ color: '#002970' }}>{localPurpose}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Target Amount:</span>
                          <strong style={{ color: '#00A8FF' }}>{formatINR(localAmount)}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Comfortable New EMI:</span>
                          <strong style={{ color: '#002970' }}>{formatINR(currentEmi)}/month</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Repayment Tenure:</span>
                          <strong style={{ color: '#002970' }}>{localTenure} months</strong>
                        </div>
                        <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: 6, marginTop: 2, display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Credit Score:</span>
                          <strong style={{ color: '#16A34A' }}>742 (Good)</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Existing Monthly EMI:</span>
                          <strong style={{ color: '#002970' }}>{formatINR(existingEmi)}/month</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('/plan')}
                        style={{
                          width: '100%',
                          background: '#00A8FF',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 10,
                          padding: '10px',
                          fontWeight: 700,
                          fontSize: 13,
                          cursor: 'pointer',
                          marginTop: 12,
                        }}
                      >
                        Open Full Financial Calculation Plan →
                      </button>
                    </div>
                  )}
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
