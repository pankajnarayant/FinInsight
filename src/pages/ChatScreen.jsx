import React, { useState, useEffect, useRef } from 'react';
import { useFinInsight } from '../context/FinInsightContext';
import PhoneContainer from '../components/PhoneContainer';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import QuickReplyChips from '../components/QuickReplyChips';
import ChatInputBar from '../components/ChatInputBar';

const getTimeString = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

const parseAmount = (text) => {
  if (!text) return null;
  const clean = text.toLowerCase().replace(/,/g, '').trim();
  if (clean.includes('lakh') || clean.match(/\d+\s*l\b/)) {
    const num = parseFloat(clean);
    if (!isNaN(num)) return Math.round(num * 100000);
  }
  if (clean.includes('k')) {
    const num = parseFloat(clean);
    if (!isNaN(num)) return Math.round(num * 1000);
  }
  const match = clean.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

const formatCurrency = (num) => {
  if (!num || isNaN(num)) return '';
  return `₹${Number(num).toLocaleString('en-IN')}`;
};

// ─── INSURANCE conversation stages ───────────────────────────────────────────
// INS_TYPE → INS_COVERAGE → INS_MEMBERS → INS_CONFIRM → INS_DONE

export default function ChatScreen() {
  const {
    name,
    credit_score,
    pre_approved_amount,
    pre_approved_formatted,
    existing_emi_formatted,
    entryBranch,
    initialPurpose,
    updatePlan,
    navigate,
  } = useFinInsight();

  const isInsurance = entryBranch === 'INSURANCE';
  const isOther     = entryBranch === 'OTHER';

  // Derive initial stage
  const deriveInitialStage = () => {
    if (isOther)      return 'BRANCH_B_INTRO';
    if (isInsurance) {
      return initialPurpose ? 'INS_COVERAGE' : 'INS_TYPE';
    }
    // LOAN branch
    return initialPurpose ? 'ASK_AMOUNT' : 'ASK_PURPOSE';
  };

  const [stage, setStage] = useState(deriveInitialStage);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeChips, setActiveChips] = useState([]);

  // Loan data
  const [capturedData, setCapturedData] = useState({
    purpose: initialPurpose || '',
    amount: null,
    amount_formatted: '',
    new_emi: '',
    tenure: '',
  });

  // Insurance data
  const [insuranceData, setInsuranceData] = useState({
    type: initialPurpose || '',   // Health / Life / Vehicle / Home / Term
    coverage: '',                 // ₹5L / ₹10L / ₹25L / ₹50L+
    members: '',                  // Just me / Me + Spouse / Family
  });

  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, activeChips]);

  // ─── Opening greeting ─────────────────────────────────────────────────────
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      const t = getTimeString();

      /* ── Branch: OTHER (Mutual Fund / FD / Credit Card) ── */
      if (isOther) {
        setStage('BRANCH_B_INTRO');
        setMessages([{
          id: 1, sender: 'ai', time: t,
          text: 'Mutual Funds, Fixed Deposits, and Credit Cards are coming soon to FinInsight. For now, I can help you build a personal loan plan — want to explore that?',
        }]);
        setActiveChips(["Yes, let's explore a loan", 'Not now']);
        return;
      }

      /* ── Branch: INSURANCE ── */
      if (isInsurance) {
        if (initialPurpose) {
          // Came from Health Insurance / Life Insurance chip
          setStage('INS_COVERAGE');
          const typeLabel = initialPurpose === 'Health' ? 'Health Insurance'
            : initialPurpose === 'Life' ? 'Life Insurance'
            : `${initialPurpose} Insurance`;
          setMessages([{
            id: 1, sender: 'ai', time: t,
            text: `Hi ${name.split(' ')[0]}! Great choice — ${typeLabel} is one of the smartest financial decisions. What coverage amount are you looking for?`,
          }]);
          setActiveChips(['₹5 Lakh', '₹10 Lakh', '₹25 Lakh', '₹50 Lakh+']);
        } else {
          // Came from "I need Insurance" card
          setStage('INS_TYPE');
          setMessages([{
            id: 1, sender: 'ai', time: t,
            text: `Hi ${name.split(' ')[0]}! Insurance is one of the smartest things you can do for your family's security. What type of insurance are you looking for?`,
          }]);
          setActiveChips(['🏥 Health', '🛡️ Life', '🚗 Vehicle', '🏠 Home', '📋 Term Plan']);
        }
        return;
      }

      /* ── Branch: LOAN (default) ── */
      if (initialPurpose) {
        setStage('ASK_AMOUNT');
        const purposeLabel = initialPurpose === 'Car'      ? 'a Car Loan'
          : initialPurpose === 'Home'     ? 'a Home Loan'
          : initialPurpose === 'Personal' ? 'a Personal Loan'
          : `a ${initialPurpose} Loan`;
        setMessages([{
          id: 1, sender: 'ai', time: t,
          text: `Hi ${name.split(' ')[0]}! I see you're interested in ${purposeLabel}. Great choice! You're pre-approved for up to ${pre_approved_formatted} with a credit score of ${credit_score}. How much are you looking to borrow?`,
        }]);
        setActiveChips(['₹50,000', '₹1,00,000', '₹1,50,000', '₹2,40,000']);
      } else {
        setStage('ASK_PURPOSE');
        setMessages([{
          id: 1, sender: 'ai', time: t,
          text: `Hi ${name.split(' ')[0]}! Based on your profile, you're pre-approved for up to ${pre_approved_formatted} with a great credit score of ${credit_score}. Let's build your financial plan — what do you need this for?`,
        }]);
        setActiveChips(['🎓 Education', '🏥 Medical', '💼 Business', '🏠 Personal', '🔧 Other']);
      }
    }, 700);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── User response handler ────────────────────────────────────────────────
  const handleUserResponse = (text) => {
    if (!text.trim() || isTyping || stage === 'FINALIZING' || stage === 'INS_DONE') return;

    const t = getTimeString();
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text, time: t }]);
    setActiveChips([]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiTime = getTimeString();

      // ── OTHER branch ──────────────────────────────────────────────────────
      if (stage === 'BRANCH_B_INTRO') {
        if (text.toLowerCase().includes('not now') || text.toLowerCase().includes('no')) {
          setMessages((prev) => [...prev, {
            id: Date.now() + 1, sender: 'ai', time: aiTime,
            text: 'No problem! Feel free to come back whenever you need financial guidance.',
          }]);
          setTimeout(() => navigate('/'), 1200);
        } else {
          setStage('ASK_PURPOSE');
          setMessages((prev) => [...prev, {
            id: Date.now() + 1, sender: 'ai', time: aiTime,
            text: `Great! You're pre-approved for up to ${pre_approved_formatted} with a credit score of ${credit_score}. What do you need this loan for?`,
          }]);
          setActiveChips(['🎓 Education', '🏥 Medical', '💼 Business', '🏠 Personal', '🔧 Other']);
        }
        return;
      }

      // ── INSURANCE stages ──────────────────────────────────────────────────
      if (stage === 'INS_TYPE') {
        const cleanType = text.replace(/^[^\w]+/, '').trim();
        setInsuranceData((prev) => ({ ...prev, type: cleanType }));
        setStage('INS_COVERAGE');
        setMessages((prev) => [...prev, {
          id: Date.now() + 1, sender: 'ai', time: aiTime,
          text: `${cleanType} is a great choice! What sum-assured (coverage) amount are you looking for?`,
        }]);
        setActiveChips(['₹5 Lakh', '₹10 Lakh', '₹25 Lakh', '₹50 Lakh+']);
        return;
      }

      if (stage === 'INS_COVERAGE') {
        setInsuranceData((prev) => ({ ...prev, coverage: text.trim() }));
        setStage('INS_MEMBERS');
        setMessages((prev) => [...prev, {
          id: Date.now() + 1, sender: 'ai', time: aiTime,
          text: 'Perfect. Who would you like this policy to cover?',
        }]);
        setActiveChips(['Just me', 'Me + Spouse', 'Me + Family', 'Me + Parents']);
        return;
      }

      if (stage === 'INS_MEMBERS') {
        const members = text.trim();
        setInsuranceData((prev) => ({ ...prev, members }));
        setStage('INS_CONFIRM');
        const insType = insuranceData.type || initialPurpose || 'Insurance';
        const coverage = insuranceData.coverage || text;
        setMessages((prev) => [...prev, {
          id: Date.now() + 1, sender: 'ai', time: aiTime,
          text: `Got it! Here's your insurance preference:\n\n🛡️ Type: ${insType}\n💰 Coverage: ${coverage}\n👨‍👩‍👧 Covers: ${members}\n\nShall I have our insurance expert call you back with tailored plan options?`,
        }]);
        setActiveChips(['✅ Yes, call me back', '🔄 Change preferences', '❌ Not now']);
        return;
      }

      if (stage === 'INS_CONFIRM') {
        if (text.toLowerCase().includes('change') || text.toLowerCase().includes('🔄')) {
          setStage('INS_TYPE');
          setInsuranceData({ type: '', coverage: '', members: '' });
          setMessages((prev) => [...prev, {
            id: Date.now() + 1, sender: 'ai', time: aiTime,
            text: 'No problem! Let\'s start over. What type of insurance are you looking for?',
          }]);
          setActiveChips(['🏥 Health', '🛡️ Life', '🚗 Vehicle', '🏠 Home', '📋 Term Plan']);
        } else if (text.toLowerCase().includes('not now') || text.toLowerCase().includes('❌')) {
          setMessages((prev) => [...prev, {
            id: Date.now() + 1, sender: 'ai', time: aiTime,
            text: 'No problem! Your preferences are saved. You can request a callback anytime from the app.',
          }]);
          setStage('INS_DONE');
          setTimeout(() => navigate('/'), 2000);
        } else {
          // Booked!
          setStage('INS_DONE');
          setMessages((prev) => [...prev, {
            id: Date.now() + 1, sender: 'ai', time: aiTime,
            text: `🎉 Callback booked! Our insurance specialist will call you within 24 hours with plans tailored for ${insuranceData.coverage || 'your chosen'} coverage.\n\nIn the meantime, feel free to explore loan options on the Home screen.`,
          }]);
        }
        return;
      }

      // ── LOAN stages ───────────────────────────────────────────────────────
      if (stage === 'ASK_PURPOSE') {
        const cleanPurpose = text.replace(/^[^\w\s]+/, '').trim();
        setCapturedData((prev) => ({ ...prev, purpose: cleanPurpose }));
        setStage('ASK_AMOUNT');
        setMessages((prev) => [...prev, {
          id: Date.now() + 1, sender: 'ai', time: aiTime,
          text: 'How much are you looking to borrow?',
        }]);
        setActiveChips(['₹50,000', '₹1,00,000', '₹1,50,000', '₹2,40,000']);
        return;
      }

      if (stage === 'ASK_AMOUNT' || stage === 'EXCEED_LIMIT') {
        let num = parseAmount(text);
        if (!num || isNaN(num)) num = 150000;
        const formatted = formatCurrency(num);

        if (num > pre_approved_amount) {
          setStage('EXCEED_LIMIT');
          setCapturedData((prev) => ({ ...prev, amount: num, amount_formatted: formatted }));
          setMessages((prev) => [...prev, {
            id: Date.now() + 1, sender: 'ai', time: aiTime,
            text: `That's above your current pre-approved limit of ${pre_approved_formatted} — I can still help you plan around ${pre_approved_formatted}, or you can adjust the amount.`,
          }]);
          setActiveChips([`Plan around ${pre_approved_formatted}`, 'Adjust to ₹2,00,000', 'Adjust to ₹1,50,000']);
        } else {
          setCapturedData((prev) => ({ ...prev, amount: num, amount_formatted: formatted }));
          setStage('ASK_EMI');
          const currentPurpose = capturedData.purpose || 'your goal';
          setMessages((prev) => [...prev, {
            id: Date.now() + 1, sender: 'ai', time: aiTime,
            text: `Got it — ${formatted} for ${currentPurpose}. What monthly EMI would be comfortable on top of your existing ${existing_emi_formatted} commitment?`,
          }]);
          setActiveChips(['₹3,000/month', '₹5,000/month', '₹7,000/month', '₹10,000/month']);
        }
        return;
      }

      if (stage === 'ASK_EMI') {
        setCapturedData((prev) => ({ ...prev, new_emi: text.trim() }));
        setStage('ASK_TENURE');
        setMessages((prev) => [...prev, {
          id: Date.now() + 1, sender: 'ai', time: aiTime,
          text: 'Over how many years would you like to repay?',
        }]);
        setActiveChips(['1 year', '2 years', '3 years', '5 years']);
        return;
      }

      if (stage === 'ASK_TENURE') {
        const tenureText = text.trim();
        const finalPlan = {
          purpose: capturedData.purpose || 'Personal',
          amount: capturedData.amount || pre_approved_amount,
          amount_formatted: capturedData.amount_formatted || pre_approved_formatted,
          new_emi_preference: capturedData.new_emi || '₹5,000/month',
          new_emi_formatted: capturedData.new_emi || '₹5,000/month',
          tenure: tenureText,
        };
        setCapturedData((prev) => ({ ...prev, tenure: tenureText }));
        setStage('FINALIZING');
        setMessages((prev) => [...prev, {
          id: Date.now() + 1, sender: 'ai', time: aiTime,
          text: 'Putting together your financial plan...',
        }]);
        updatePlan(finalPlan);
        setTimeout(() => navigate('/plan'), 1500);
      }
    }, 750);
  };

  // theme token for insurance vs loan
  const accentColor  = isInsurance ? '#16A34A' : '#00A8FF';
  const accentGrad   = isInsurance
    ? 'linear-gradient(90deg, #16A34A 0%, #059669 100%)'
    : 'linear-gradient(90deg, #002970 0%, #004AAD 100%)';
  const statusLabel  = isInsurance ? '🛡️ Insurance Advisor' : '⚡ AI Financial Advisor';

  return (
    <PhoneContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: '#F5F8FC',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          position: 'relative',
        }}
      >
        {/* 1. Reused TopAppBar */}
        <TopAppBar />

        {/* 2. Slim back nav with context-aware label */}
        <div
          style={{
            background: '#fff',
            borderBottom: '1px solid #E8EFF7',
            padding: '7px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#002970',
              fontWeight: 700,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: 16 }}>←</span> Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accentColor }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#5F6B7A' }}>{statusLabel}</span>
          </div>
        </div>

        {/* Insurance context banner */}
        {isInsurance && (
          <div
            style={{
              background: 'linear-gradient(90deg, #F0FDF4 0%, #DCFCE7 100%)',
              borderBottom: '1px solid #BBF7D0',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 14 }}>🛡️</span>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D' }}>Insurance Section</span>
              <span style={{ fontSize: 10, color: '#16A34A', marginLeft: 6 }}>Health · Life · Vehicle · Home · Term</span>
            </div>
          </div>
        )}

        {/* 3. Scrollable chat area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '14px 14px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              sender={msg.sender}
              message={msg.text}
              timestamp={msg.time}
              accentGrad={msg.sender === 'user' ? accentGrad : undefined}
            />
          ))}

          {isTyping && <TypingIndicator />}

          {/* 4. Quick-reply chips */}
          {!isTyping && activeChips.length > 0 && (
            <QuickReplyChips
              options={activeChips}
              onSelect={handleUserResponse}
              isInsurance={isInsurance}
            />
          )}

          {/* Finalizing loader */}
          {stage === 'FINALIZING' && (
            <div
              style={{
                margin: '12px 0 6px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#E6F6FF',
                padding: '8px 14px',
                borderRadius: 12,
                border: '1px solid #BEE4FD',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  border: '2px solid #00A8FF',
                  borderTopColor: 'transparent',
                  animation: 'pulseDot 1s linear infinite',
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#004AAD' }}>
                Analysing rates and EMI schedules...
              </span>
            </div>
          )}

          {/* Insurance done confirmation banner */}
          {stage === 'INS_DONE' && (
            <div
              style={{
                margin: '12px 0 6px 36px',
                background: '#F0FDF4',
                border: '1px solid #86EFAC',
                borderRadius: 12,
                padding: '10px 14px',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D' }}>
                ✅ Returning to home screen...
              </span>
            </div>
          )}

          <div ref={chatEndRef} style={{ height: 4 }} />
        </div>

        {/* 5. Fixed input bar */}
        <ChatInputBar
          onSend={handleUserResponse}
          disabled={isTyping || stage === 'FINALIZING' || stage === 'INS_DONE'}
          accentColor={accentColor}
          placeholder={
            stage === 'ASK_AMOUNT'    ? 'Enter amount (e.g. ₹1,50,000)...'
            : stage === 'ASK_EMI'    ? 'Enter comfortable EMI...'
            : stage === 'INS_COVERAGE' ? 'Enter coverage amount...'
            : 'Type your message...'
          }
        />

        {/* 6. Reused BottomNav */}
        <BottomNav activeTab={isInsurance ? 'Services' : 'Services'} />
      </div>
    </PhoneContainer>
  );
}
