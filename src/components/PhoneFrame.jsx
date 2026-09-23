import React, { useState, useEffect } from 'react';

/**
 * Global PhoneFrame container rendered at the App level.
 * Locks the iPhone 18 Pro Max frame to the EXACT GEOMETRIC DEAD-CENTER of the webpage
 * using position: fixed + translate(-50%, -50%). The position NEVER shifts across routes.
 */
export default function PhoneFrame({ children }) {
  const [scale, setScale] = useState(1);
  const PHONE_W = 393;
  const PHONE_H = 852;

  useEffect(() => {
    const compute = () => {
      const scaleW = window.innerWidth / (PHONE_W + 20);
      const scaleH = window.innerHeight / (PHONE_H + 20);
      setScale(Math.min(scaleW, scaleH, 1));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #0d1117 0%, #161b26 50%, #0a1628 100%)',
        margin: 0,
        padding: 0,
        zIndex: 9999,
      }}
    >
      {/* Scaled phone frame container — LOCKED TO DEAD-CENTER OF WEBPAGE */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: PHONE_W,
          height: PHONE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
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
            boxSizing: 'border-box',
          }}
        >
          {/* Side buttons */}
          <div style={{ position: 'absolute', left: -3, top: 140, width: 3, height: 32, background: '#2e2e2e', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', left: -3, top: 188, width: 3, height: 58, background: '#2e2e2e', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', left: -3, top: 256, width: 3, height: 58, background: '#2e2e2e', borderRadius: '3px 0 0 3px' }} />
          <div style={{ position: 'absolute', right: -3, top: 200, width: 3, height: 80, background: '#2e2e2e', borderRadius: '0 3px 3px 0' }} />

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
                justifyContent: 'space-between',
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

            {/* Main Page Content */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {children}
            </div>

            {/* Bottom Home Indicator */}
            <div style={{ background: '#fff', height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 120, height: 4, background: '#111', borderRadius: 999 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
