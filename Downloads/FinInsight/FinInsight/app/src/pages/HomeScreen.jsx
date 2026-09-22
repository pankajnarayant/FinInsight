import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   Inline SVG Icons
───────────────────────────────────────────── */
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
    <path d="M5 3l.74 2.22L8 6l-2.26.78L5 9l-.74-2.22L2 6l2.26-.78L5 3z" opacity="0.5"/>
    <path d="M19 13l.74 2.22L22 16l-2.26.78L19 19l-.74-2.22L16 16l2.26-.78L19 13z" opacity="0.5"/>
  </svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);
const ArrowRightSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
  </svg>
);
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const LoanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const HomeNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);
const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ServicesNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);
const ShieldTinyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Toast
───────────────────────────────────────────── */
function Toast({ message, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
      backgroundColor: '#002970', color: '#fff', padding: '9px 20px',
      borderRadius: 999, fontSize: 12, fontWeight: 600, zIndex: 200,
      whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      animation: 'fadeIn 0.2s ease',
    }}>
      {message}
    </div>
  );
}

/* ─────────────────────────────────────────────
   App Content
───────────────────────────────────────────── */
function AppContent({ showToast }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F5F8FC', fontFamily: font, fontSize: 14 }}>

      {/* ── Header ── */}
      <div style={{ background: '#fff', padding: '12px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E8EFF7', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px', color: '#002970' }}>Fin<span style={{ color: '#00A8FF' }}>Insight</span></span>
          <span style={{ fontSize: 9, fontWeight: 700, background: '#E6F6FF', color: '#00A8FF', padding: '2px 7px', borderRadius: 999, letterSpacing: 0.5 }}>AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ background: 'none', border: 'none', color: '#5F6B7A', cursor: 'pointer', padding: 2 }}><BellIcon /></button>
          <button style={{ background: '#EEF4FB', border: 'none', borderRadius: 999, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#002970', cursor: 'pointer' }}><UserIcon /></button>
        </div>
      </div>

      {/* ── Greeting strip ── */}
      <div style={{ background: 'linear-gradient(90deg, #002970 0%, #004AAD 100%)', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: font }}>{greeting},</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: font }}>Rahul Sharma 👋</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 10, padding: '6px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)', fontFamily: font, marginBottom: 1 }}>Pre-approved</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: font }}>₹2,40,000</div>
        </div>
      </div>

      {/* ── Scrollable Body ── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Hero */}
        <div style={{ margin: '14px 14px 0', background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F8FF 100%)', borderRadius: 20, padding: '18px 18px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: 10 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#002970', lineHeight: 1.35 }}>Your AI-powered<br />Financial Journey<br />Assistant</div>
              <div style={{ fontSize: 12, color: '#5F6B7A', marginTop: 7, lineHeight: 1.6 }}>Making financial decisions simple,<br />personalized and understandable.</div>
            </div>
            <div style={{ color: '#00A8FF', flexShrink: 0, marginTop: 2 }}><SparkleIcon /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
            {[
              { icon: <CheckIcon />, label: 'Ask in\nsimple words' },
              { icon: <MessageIcon />, label: 'Get clear\nexplanations' },
              { icon: <ArrowRightSmall />, label: 'Find the right\nnext steps' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <span style={{ color: '#00A8FF' }}>{item.icon}</span>
                <span style={{ fontSize: 10, color: '#5F6B7A', textAlign: 'center', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Snapshot Card */}
        <div style={{ margin: '14px 14px 0', background: '#fff', borderRadius: 18, padding: '14px 16px', border: '1px solid #E3ECF5', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ flex: 1, borderRight: '1px solid #E8EFF7', paddingRight: 14, marginRight: 14 }}>
            <div style={{ fontSize: 10, color: '#8A9BB0', marginBottom: 3 }}>Credit Score</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#002970', lineHeight: 1 }}>742</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: 999, background: '#16A34A' }} />
              <span style={{ fontSize: 10, color: '#16A34A', fontWeight: 600 }}>Good</span>
            </div>
          </div>
          <div style={{ flex: 1, borderRight: '1px solid #E8EFF7', paddingRight: 14, marginRight: 14 }}>
            <div style={{ fontSize: 10, color: '#8A9BB0', marginBottom: 3 }}>Active Loans</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#002970', lineHeight: 1 }}>1</div>
            <div style={{ fontSize: 10, color: '#5F6B7A', marginTop: 4 }}>₹8,200/mo EMI</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#8A9BB0', marginBottom: 3 }}>Savings</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#002970', lineHeight: 1 }}>₹1.2L</div>
            <div style={{ fontSize: 10, color: '#5F6B7A', marginTop: 4 }}>FD + Savings</div>
          </div>
        </div>

        {/* Section heading */}
        <div style={{ padding: '16px 18px 10px' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#172B4D' }}>What can we help you with today?</div>
          <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 2 }}>Choose a financial need to get started</div>
        </div>

        {/* Quick-action chips */}
        <div style={{ overflowX: 'auto', padding: '0 14px 12px', display: 'flex', gap: 8, scrollbarWidth: 'none' }}>
          {['Personal Loan', 'Home Loan', 'Car Loan', 'Credit Card', 'Mutual Fund', 'Fixed Deposit'].map((chip) => (
            <div key={chip} onClick={() => showToast(`${chip} journey coming next.`)} style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: 999, background: '#EEF4FB', border: '1px solid #D0E8FB', fontSize: 11, fontWeight: 600, color: '#004AAD', cursor: 'pointer', flexShrink: 0 }}>
              {chip}
            </div>
          ))}
        </div>

        {/* Service Cards */}
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Primary card — Loan */}
          <div onClick={() => showToast('Loan journey coming next.')} style={{ background: '#fff', border: '1.5px solid #00A8FF', borderRadius: 18, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: '0 4px 18px rgba(0,168,255,0.13)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: 'linear-gradient(135deg, #00A8FF, #0080CC)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <LoanIcon />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#002970' }}>I need a Loan</div>
              <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 2, lineHeight: 1.4 }}>Understand your options, costs and eligibility.</div>
            </div>
            <div style={{ color: '#00A8FF', flexShrink: 0 }}><ChevronRight /></div>
          </div>

          {/* Insurance */}
          <div onClick={() => showToast('Insurance journey coming next.')} style={{ background: '#fff', border: '1px solid #E3ECF5', borderRadius: 18, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: '#EEF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00A8FF', flexShrink: 0 }}>
              <ShieldIcon />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D' }}>I need Insurance</div>
              <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 2, lineHeight: 1.4 }}>Understand coverage and find the right plan.</div>
            </div>
            <div style={{ color: '#B0C4D8', flexShrink: 0 }}><ChevronRight /></div>
          </div>

          {/* Other Services */}
          <div onClick={() => showToast('More financial services coming soon.')} style={{ background: '#fff', border: '1px solid #E3ECF5', borderRadius: 18, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: '#EEF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00A8FF', flexShrink: 0 }}>
              <ChartIcon />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D' }}>Explore other Financial Services</div>
              <div style={{ fontSize: 11, color: '#5F6B7A', marginTop: 2, lineHeight: 1.4 }}>Investments, credit cards and more.</div>
            </div>
            <div style={{ color: '#B0C4D8', flexShrink: 0 }}><ChevronRight /></div>
          </div>
        </div>

        {/* Primary CTA */}
        <div style={{ padding: '18px 14px 6px' }}>
          <button
            onClick={() => showToast('AI financial assistant coming next.')}
            style={{ width: '100%', padding: '14px 0', borderRadius: 999, background: 'linear-gradient(90deg, #00A8FF 0%, #0055CC 100%)', color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 18px rgba(0,168,255,0.38)', letterSpacing: 0.3, fontFamily: 'inherit', transition: 'opacity 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            ✦  Talk to FinInsight  →
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#8A9BB0', marginTop: 8 }}>Tell us what you need in your own words.</div>
        </div>

        {/* Trust badges */}
        <div style={{ margin: '4px 14px 14px', background: '#F5F8FC', borderRadius: 14, padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {[
              { stat: '10K+', label: 'Users Helped' },
              { stat: 'RBI', label: 'Guidelines' },
              { stat: 'AI', label: 'Powered' },
              { stat: '256-bit', label: 'Encryption' },
            ].map((b) => (
              <div key={b.stat} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#002970' }}>{b.stat}</div>
                <div style={{ fontSize: 9, color: '#8A9BB0', marginTop: 1 }}>{b.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8, color: '#8A9BB0', fontSize: 9 }}>
            <ShieldTinyIcon />
            <span>Your data is secure and used only to personalize your journey.</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div style={{ background: '#fff', borderTop: '1px solid #E8EFF7', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '6px 0 10px', flexShrink: 0 }}>
        {[
          { label: 'Home', icon: <HomeNavIcon />, active: true },
          { label: 'Scan', icon: <ScanIcon /> },
          { label: 'Pay', icon: <PlusIcon />, center: true },
          { label: 'History', icon: <HistoryIcon /> },
          { label: 'Services', icon: <ServicesNavIcon /> },
        ].map((item) =>
          item.center ? (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 46, height: 46, borderRadius: 999, background: 'linear-gradient(135deg, #00A8FF, #002970)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginTop: -18, boxShadow: '0 4px 16px rgba(0,168,255,0.5)' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 9, color: '#B0C4D8' }}>{item.label}</span>
            </div>
          ) : (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
              <span style={{ color: item.active ? '#00A8FF' : '#B0C4D8' }}>{item.icon}</span>
              <span style={{ fontSize: 9, fontWeight: item.active ? 700 : 400, color: item.active ? '#00A8FF' : '#B0C4D8' }}>{item.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function HomeScreen() {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [scale, setScale] = useState(1);
  const PHONE_W = 393;
  const PHONE_H = 852;

  useEffect(() => {
    const compute = () => {
      const scaleW = window.innerWidth / (PHONE_W + 20);
      const scaleH = window.innerHeight / (PHONE_H + 20);
      setScale(Math.min(scaleW, scaleH, 1)); // never upscale beyond 1
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: '' }), 2500);
  };

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    /* Full page dark background — nothing visible outside the phone */
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      background: 'linear-gradient(160deg, #0d1117 0%, #161b26 50%, #0a1628 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; background: #0d1117; }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      `}</style>

      {/* Scaled phone wrapper */}
      <div style={{
        width: PHONE_W,
        height: PHONE_H,
        flexShrink: 0,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}>
        {/* Outer bezel */}
        <div style={{
          width: '100%', height: '100%',
          background: '#1a1a1a',
          borderRadius: 54,
          boxShadow: '0 0 0 1px #3a3a3a, 0 0 0 2px #222, 0 40px 80px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
          padding: 5,
          position: 'relative',
        }}>
          {/* Side buttons */}
          <div style={{ position: 'absolute', left: -3, top: 140, width: 3, height: 32, background: '#2e2e2e', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', left: -3, top: 188, width: 3, height: 58, background: '#2e2e2e', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', left: -3, top: 256, width: 3, height: 58, background: '#2e2e2e', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', right: -3, top: 200, width: 3, height: 80, background: '#2e2e2e', borderRadius: '0 3px 3px 0' }} />

          {/* Screen glass */}
          <div style={{ width: '100%', height: '100%', borderRadius: 50, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>

            {/* Status bar */}
            <div style={{ background: '#F5F8FC', padding: '10px 22px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#172B4D' }}>{timeStr}</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                  <rect x="0" y="7" width="3" height="4" rx="0.5" fill="#172B4D" />
                  <rect x="4" y="4.5" width="3" height="6.5" rx="0.5" fill="#172B4D" />
                  <rect x="8" y="2" width="3" height="9" rx="0.5" fill="#172B4D" />
                  <rect x="12" y="0" width="3" height="11" rx="0.5" fill="#D0D8E4" />
                </svg>
                <svg width="15" height="11" viewBox="0 0 24 18" fill="none">
                  <path d="M1 5.5C5.73 1.44 10.87 0 12 0s6.27 1.44 11 5.5" stroke="#172B4D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M4 9.5C6.9 6.9 9.45 6 12 6s5.1.9 8 3.5" stroke="#172B4D" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M7.5 13c1.2-1.2 2.8-1.8 4.5-1.8s3.3.6 4.5 1.8" stroke="#172B4D" strokeWidth="2.5" strokeLinecap="round" />
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
            <div style={{ background: '#F5F8FC', display: 'flex', justifyContent: 'center', paddingBottom: 6, flexShrink: 0 }}>
              <div style={{ width: 118, height: 30, background: '#111', borderRadius: 20 }} />
            </div>

            {/* App content */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <AppContent showToast={showToast} />
              <Toast message={toast.message} visible={toast.visible} />
            </div>

            {/* Home indicator */}
            <div style={{ background: '#fff', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 120, height: 4, background: '#111', borderRadius: 999 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

