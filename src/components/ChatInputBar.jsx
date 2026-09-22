import React, { useState } from 'react';

const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function ChatInputBar({ onSend, disabled = false, placeholder = "Type your response..." }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        borderTop: '1px solid #E8EFF7',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          background: '#F0F4F9',
          borderRadius: 999,
          padding: '4px 14px',
          border: '1px solid #E1EAF2',
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 13,
            color: '#172B4D',
            padding: '7px 4px',
            fontFamily: 'inherit',
          }}
        />
        <button
          type="button"
          title="Voice input (coming soon)"
          aria-label="Voice input"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            opacity: 0.7,
          }}
        >
          <MicIcon />
        </button>
      </div>

      <button
        type="submit"
        disabled={disabled || !text.trim()}
        aria-label="Send message"
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          background: text.trim() && !disabled
            ? 'linear-gradient(135deg, #00A8FF 0%, #002970 100%)'
            : '#D0D8E4',
          color: '#fff',
          border: 'none',
          cursor: text.trim() && !disabled ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: text.trim() && !disabled
            ? '0 3px 10px rgba(0, 168, 255, 0.35)'
            : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <SendIcon />
      </button>
    </form>
  );
}
