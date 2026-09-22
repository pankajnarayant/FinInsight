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

export default function ChatBubble({ sender = 'ai', message, timestamp, accentGrad }) {
  const isAi = sender === 'ai';
  const userBg = accentGrad || 'linear-gradient(90deg, #002970 0%, #004AAD 100%)';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isAi ? 'flex-start' : 'flex-end',
        margin: '6px 0',
        width: '100%',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          maxWidth: '84%',
          flexDirection: isAi ? 'row' : 'row-reverse',
        }}
      >
        {isAi && <AiSparkleAvatar />}

        <div
          style={{
            background: isAi ? '#EEF4FB' : userBg,
            color: isAi ? '#172B4D' : '#ffffff',
            borderRadius: 16,
            borderBottomLeftRadius: isAi ? 4 : 16,
            borderBottomRightRadius: isAi ? 16 : 4,
            padding: '11px 15px',
            fontSize: 13,
            lineHeight: 1.5,
            fontWeight: 500,
            boxShadow: isAi ? '0 2px 8px rgba(0,0,0,0.04)' : '0 3px 12px rgba(0,0,0,0.18)',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
          }}
        >
          {message}
        </div>
      </div>

      {timestamp && (
        <span
          style={{
            fontSize: 10,
            color: '#8A9BB0',
            marginTop: 3,
            marginRight: isAi ? 0 : 6,
            marginLeft: isAi ? 36 : 0,
          }}
        >
          {timestamp}
        </span>
      )}
    </div>
  );
}
