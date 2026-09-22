import React from 'react';
import { formatINR } from '../utils/loanCalculations';

/**
 * HeroEmiCard — Most prominent card displaying estimated EMI & loan summary.
 */
export default function HeroEmiCard({ emi, amount, tenure, interestRate = 14 }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #002970 0%, #004AAD 100%)',
        borderRadius: 18,
        padding: '22px 20px',
        color: '#ffffff',
        boxShadow: '0 8px 24px rgba(0, 41, 112, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: font,
      }}
    >
      {/* Subtle background glow effect */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,168,255,0.25) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            color: '#76D0FF',
          }}
        >
          Estimated New Monthly EMI
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            background: 'rgba(255,255,255,0.15)',
            padding: '3px 8px',
            borderRadius: 999,
            color: '#E6F6FF',
          }}
        >
          {interestRate}% p.a. fixed
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>
          {formatINR(emi)}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
          / month
        </span>
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.85)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: 10,
          lineHeight: '1.4',
        }}
      >
        Estimated EMI for <strong style={{ color: '#fff' }}>{formatINR(amount)}</strong> over{' '}
        <strong style={{ color: '#fff' }}>{tenure} months</strong>
      </div>
    </div>
  );
}
