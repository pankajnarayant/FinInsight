import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import HeroEmiCard from '../components/HeroEmiCard';
import AffordabilityCard from '../components/AffordabilityCard';
import SummaryCard from '../components/SummaryCard';
import DetailsListCard from '../components/DetailsListCard';
import { useFinInsight } from '../context/FinInsightContext';
import { saveFinancialJourney } from '../services/firestore';
import { analyzeFinancialMessage } from '../services/aiService';
import { getFastPathResponse } from '../utils/chatFastPath';
import {
  calculateEMI,
  calculateTotalRepayment,
  calculateTotalInterest,
  calculateAffordability,
  formatINR,
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

export default function ChatScreen() {
  const navigate = useNavigate();
  const context = useFinInsight();

  // Retrieve initial values from context or fallbacks
  const selectedGoal = context?.selectedGoal || 'Personal Loan';
  const defaultAmount = Number(context?.needAmount) || 200000;
  const defaultTenure = Number(context?.tenureMonths) || 24;
  const existingEmi = Number(context?.existingEmi) || 8200;

  // Determine if context mode is Insurance vs Loan
  const isInsuranceMode = selectedGoal.toLowerCase().includes('insurance');

  // Step state: 1 = Purpose/Category selection, 2 = Amount selection, 3 = Tenure selection, 4 = Calculation complete
  const [chatStep, setChatStep] = useState(1);
  const [capturedPurpose, setCapturedPurpose] = useState(
    isInsuranceMode ? 'Health Insurance' : selectedGoal
  );
  const [capturedAmount, setCapturedAmount] = useState(defaultAmount);
  const [capturedTenure, setCapturedTenure] = useState(defaultTenure);

  // Calculation readiness & typing indicator states
  const [isCalculating, setIsCalculating] = useState(false);
  const [isPlanReady, setIsPlanReady] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(35000);

  // Dynamic Chat messages stream state
  const [dynamicMessages, setDynamicMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll chat stream to bottom whenever messages or calculation state updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatStep, isCalculating, isPlanReady, monthlyIncome, dynamicMessages, isAiThinking]);

  // Handlers for chip selection
  const handleSelectPurpose = (p) => {
    setCapturedPurpose(p);
    if (context?.setSelectedGoal) context.setSelectedGoal(p);
    setChatStep(2);
  };

  const handleSelectAmount = (amt) => {
    setCapturedAmount(amt);
    if (context?.setNeedAmount) context.setNeedAmount(amt);
    setChatStep(3);
  };

  const handleSelectTenure = (tenureVal) => {
    setCapturedTenure(tenureVal);
    if (context?.setTenureMonths) context.setTenureMonths(tenureVal);
    setChatStep(4);

    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setIsPlanReady(true);
    }, 750);
  };

  // Handler for text input sending message to Sarvam AI Cloud Function
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text || !text.trim() || isAiThinking) return;

    const trimmedText = text.trim();
    setInputMessage('');

    // Append user message to dynamic conversation stream
    const userMsgObj = { id: Date.now(), sender: 'user', text: trimmedText };
    setDynamicMessages((prev) => [...prev, userMsgObj]);

    // Check fast-path local response BEFORE showing loader or calling Sarvam AI
    const fastPathReply = getFastPathResponse(trimmedText);
    if (fastPathReply) {
      setDynamicMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'assistant', text: fastPathReply },
      ]);
      return;
    }

    setIsAiThinking(true);

    try {
      // Build conversation history format for Sarvam AI
      const history = dynamicMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      // Call Sarvam AI callable function
      const res = await analyzeFinancialMessage(trimmedText, history);

      if (res && res.reply) {
        // Append AI response bubble
        setDynamicMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: 'assistant', text: res.reply },
        ]);
      }

      // Update state with extracted financial parameters
      if (res && res.financialData) {
        const { purpose, requestedAmount, tenureMonths, monthlyIncome: inc, existingEmi: exEmi } = res.financialData;

        if (purpose) {
          setCapturedPurpose(purpose);
          if (context?.setSelectedGoal) context.setSelectedGoal(purpose);
        }

        if (typeof requestedAmount === 'number' && requestedAmount > 0) {
          setCapturedAmount(requestedAmount);
          if (context?.setNeedAmount) context.setNeedAmount(requestedAmount);
        }

        if (typeof tenureMonths === 'number' && tenureMonths > 0) {
          setCapturedTenure(tenureMonths);
          if (context?.setTenureMonths) context.setTenureMonths(tenureMonths);
        }

        if (typeof inc === 'number' && inc > 0) {
          setMonthlyIncome(inc);
        }

        if (typeof exEmi === 'number' && exEmi >= 0 && context?.setExistingEmi) {
          context.setExistingEmi(exEmi);
        }

        // Determine if essential requirements are present
        const hasAmount = typeof requestedAmount === 'number' && requestedAmount > 0;
        const hasTenure = typeof tenureMonths === 'number' && tenureMonths > 0;

        if (res.isComplete || (hasAmount && hasTenure)) {
          setChatStep(4);
          setIsPlanReady(true);
        } else if (hasAmount) {
          setChatStep(3);
        } else if (purpose) {
          setChatStep(2);
        }
      }
    } catch (err) {
      console.error('Sarvam AI call error:', err);
      setDynamicMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: 'I encountered a temporary connection issue. You can continue using the options below or try typing again.',
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  // Live Loan numbers calculation (deterministic JS utility functions)
  const interestRate = 14;
  const computedEmi = calculateEMI(capturedAmount, interestRate, capturedTenure);
  const computedTotalRepayment = calculateTotalRepayment(computedEmi, capturedTenure);
  const computedTotalInterest = calculateTotalInterest(computedTotalRepayment, capturedAmount);
  const computedAffordability = calculateAffordability(computedEmi, existingEmi, monthlyIncome);

  // Firestore saving & loading state
  const [isSaving, setIsSaving] = useState(false);

  const handleSeeOffers = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const journeyData = {
      selectedGoal,
      purpose: capturedPurpose,
      isInsuranceMode,
      requestedAmount: capturedAmount,
      tenureMonths: capturedTenure,
      monthlyIncome,
      existingEmi,
      computedEmi: isInsuranceMode ? null : computedEmi,
      computedTotalRepayment: isInsuranceMode ? null : computedTotalRepayment,
      computedTotalInterest: isInsuranceMode ? null : computedTotalInterest,
    };

    try {
      await saveFinancialJourney(journeyData);
    } catch (error) {
      console.error('Failed to save financial journey to Firestore:', error);
    }

    // ALWAYS navigate after the save attempt whether it succeeds or fails
    navigate(isInsuranceMode ? '/insurance-offers' : '/offers');
  };

  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  // Category options lists
  const loanOptions = [
    'Education Loan',
    'Personal Loan',
    'Business Loan',
    'Home Loan',
    'Car Loan',
  ];

  const insuranceOptions = [
    'Health Insurance',
    'Term Life Insurance',
    'Car Insurance',
    'Bike Insurance',
    'Home Insurance',
  ];

  return (
    <>
      <TopAppBar />

      {/* Slim Header Navigation Bar with Back Button */}
      <div
        style={{
          background: '#ffffff',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E8EFF7',
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate('/home')}
          title="Back to Home"
          aria-label="Back to Home"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#EEF4FB',
            border: '1px solid #D0E8FB',
            color: '#002970',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            flexShrink: 0,
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

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#002970' }}>FinInsight AI Guide</div>
          <div style={{ fontSize: 9, color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, fontWeight: 600, marginTop: 1 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16A34A' }} />
            <span>Ready to help</span>
          </div>
        </div>

        <div style={{ width: 32 }} />
      </div>

      {/* AI Conversation Scroll Body */}
      <div style={{ flex: 1, padding: 14, overflowY: 'auto', background: '#F5F8FC', fontFamily: font, display: 'flex', flexDirection: 'column', gap: 12 }}>
        
        <div style={{ fontSize: 11, textAlign: 'center', color: '#8A99AD', margin: '2px 0' }}>Chat Assistant</div>

        {/* Step 1: Initial AI Greeting */}
        <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
          Hello Rahul 👋 I'm your AI financial assistant powered by Sarvam AI. Tell me your requirement or select an option below!
        </div>

        <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
          {isInsuranceMode
            ? 'What type of Insurance coverage are you looking for?'
            : 'What is your primary borrowing goal or requirement?'}
        </div>

        {/* Step 1 Purpose Choices */}
        {chatStep === 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '4px 0' }}>
            {(isInsuranceMode ? insuranceOptions : loanOptions).map((p) => (
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
            Selected: {capturedPurpose}
          </div>
        )}

        {/* Step 2: Amount / Coverage Prompt */}
        {chatStep >= 2 && (
          <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
            {isInsuranceMode
              ? `Got it! What total sum insured coverage do you require for ${capturedPurpose}?`
              : `Got it! What loan amount do you require for ${capturedPurpose}?`}
          </div>
        )}

        {/* Step 2 Amount Choices */}
        {chatStep === 2 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '4px 0' }}>
            {(isInsuranceMode ? [500000, 1000000, 2500000, 5000000] : [100000, 200000, 240000, 350000, 500000]).map((amt) => (
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
            {isInsuranceMode ? 'Sum Insured: ' : 'Amount: '} {formatINR(capturedAmount)}
          </div>
        )}

        {/* Step 3: Tenure Prompt */}
        {chatStep >= 3 && (
          <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', maxWidth: '85%', border: '1px solid #E8EFF7', fontSize: 13, color: '#002970', lineHeight: 1.45 }}>
            {isInsuranceMode
              ? 'What policy duration works best for your coverage?'
              : 'What repayment tenure (in months) fits your comfortable monthly budget?'}
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

        {/* Render dynamic Sarvam AI conversation messages */}
        {dynamicMessages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              background: m.sender === 'user' ? '#002970' : '#ffffff',
              color: m.sender === 'user' ? '#ffffff' : '#002970',
              borderRadius: m.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              padding: '12px 14px',
              maxWidth: '85%',
              border: m.sender === 'user' ? 'none' : '1px solid #E8EFF7',
              fontSize: 13,
              lineHeight: 1.45,
              fontWeight: m.sender === 'user' ? 600 : 400,
            }}
          >
            {m.text}
          </div>
        ))}

        {/* Sarvam AI Typing Indicator */}
        {isAiThinking && (
          <div style={{ alignSelf: 'flex-start', background: '#ffffff', borderRadius: '16px 16px 16px 4px', padding: '12px 16px', border: '1px solid #E8EFF7', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A8FF', animation: 'bounce 1s infinite 0s' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A8FF', animation: 'bounce 1s infinite 0.2s' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A8FF', animation: 'bounce 1s infinite 0.4s' }} />
            </div>
            <span style={{ fontSize: 12, color: '#5F6B7A', fontWeight: 500 }}>Sarvam AI is analyzing your financial details...</span>
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
              🎉 Here is your complete calculated <strong>Financial Plan & Breakdown</strong> for <strong>{capturedPurpose}</strong> ({formatINR(capturedAmount)} over {capturedTenure} months):
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

              {/* 5. MATCHING OFFERS SUMMARY CARD */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: 14,
                  border: '1px solid #E8EFF7',
                  boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#002970', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{isInsuranceMode ? '🛡️' : '🏦'}</span>
                    <span>{isInsuranceMode ? 'Matching Insurance Plans' : 'Matching Loan Offers'}</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#16A34A', background: '#ECFDF5', padding: '2px 8px', borderRadius: 999, border: '1px solid #A7F3D0' }}>
                    4 {isInsuranceMode ? 'Plans' : 'Offers'} Found
                  </span>
                </div>

                <div style={{ fontSize: 11.5, color: '#5F6B7A', lineHeight: 1.45 }}>
                  {isInsuranceMode
                    ? <>Based on your requested coverage of <strong>{formatINR(capturedAmount)}</strong>, 4 insurance providers match your criteria.</>
                    : <>Based on your requested <strong>{formatINR(capturedAmount)}</strong> over <strong>{capturedTenure} months</strong>, 4 lenders match your criteria with rates starting from <strong>11.5% p.a.</strong></>
                  }
                </div>
              </div>

              {/* 6. PRIMARY CTA BUTTON — ROUTES TO OFFERS OR INSURANCE OFFERS */}
              <button
                onClick={handleSeeOffers}
                disabled={isSaving}
                style={{
                  width: '100%',
                  background: isSaving
                    ? '#8A9BB0'
                    : 'linear-gradient(90deg, #002970 0%, #004AAD 100%)',
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
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 41, 112, 0.25)',
                  transition: 'transform 0.1s ease',
                  marginTop: 4,
                  opacity: isSaving ? 0.7 : 1,
                }}
              >
                <span>{isInsuranceMode ? 'See Insurance Offers' : 'See Loan Offers'}</span>
                <ArrowRightIcon />
              </button>
            </div>
          </>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Chat Text Input Bar for Sarvam AI Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{
          padding: '10px 14px',
          background: '#ffffff',
          borderTop: '1px solid #E8EFF7',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask AI or type details (e.g. 5 lakh for car)..."
          disabled={isAiThinking}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 24,
            border: '1px solid #D0E8FB',
            background: '#F5F8FC',
            fontSize: 13,
            outline: 'none',
            color: '#002970',
            fontFamily: font,
          }}
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isAiThinking}
          title="Send message"
          aria-label="Send message"
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: !inputMessage.trim() || isAiThinking ? '#EEF4FB' : 'linear-gradient(90deg, #002970 0%, #004AAD 100%)',
            color: !inputMessage.trim() || isAiThinking ? '#8A9BB0' : '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: !inputMessage.trim() || isAiThinking ? 'default' : 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s ease',
          }}
        >
          <ArrowRightIcon />
        </button>
      </form>

      <BottomNav />
    </>
  );
}
