import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

export default function OffersScreen() {
  const navigate = useNavigate();
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

            {/* Placeholder Content */}
            <div style={{ flex: 1, padding: 20, background: '#F5F8FC', fontFamily: font, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: '#E6F6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 16 }}>
                🎁
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#002970', margin: '0 0 8px 0' }}>
                Pre-Approved Loan Offers
              </h2>
              <p style={{ fontSize: 13, color: '#5F6B7A', lineHeight: 1.5, marginBottom: 20 }}>
                Screen 4 placeholder — Curated bank offers & instant disbursement options matching your ₹2,00,000 personal loan plan.
              </p>
              <button
                onClick={() => navigate('/plan')}
                style={{ background: '#002970', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                ← Back to Financial Plan
              </button>
            </div>

            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
}
