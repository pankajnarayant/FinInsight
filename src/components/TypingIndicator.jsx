import React from 'react';

const AiSparkleAvatar = () => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: 999,
      background: 'linear-gradient(135deg, #00A8FF 0%, #002970 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      flexShrink: 0,
      boxShadow: '0 2px 6px rgba(0, 168, 255, 0.3)',
    }}
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
    </svg>
  </div>
);

export default function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        margin: '6px 0',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <AiSparkleAvatar />
      <div
        style={{
          background: '#EEF4FB',
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#00A8FF',
            display: 'inline-block',
            animation: 'pulseDot 1.4s infinite ease-in-out both',
            animationDelay: '0s',
          }}
        />
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#00A8FF',
            display: 'inline-block',
            animation: 'pulseDot 1.4s infinite ease-in-out both',
            animationDelay: '0.2s',
          }}
        />
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#00A8FF',
            display: 'inline-block',
            animation: 'pulseDot 1.4s infinite ease-in-out both',
            animationDelay: '0.4s',
          }}
        />
      </div>
    </div>
  );
}
