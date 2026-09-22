import React from 'react';

export const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default function TopAppBar({ onBellClick, onUserClick }) {
  return (
    <div
      style={{
        background: '#fff',
        padding: '12px 18px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E8EFF7',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px', color: '#002970' }}>
          Fin<span style={{ color: '#00A8FF' }}>Insight</span>
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            background: '#E6F6FF',
            color: '#00A8FF',
            padding: '2px 7px',
            borderRadius: 999,
            letterSpacing: 0.5,
          }}
        >
          AI
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={onBellClick}
          aria-label="Notifications"
          style={{ background: 'none', border: 'none', color: '#5F6B7A', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}
        >
          <BellIcon />
        </button>
        <button
          onClick={onUserClick}
          aria-label="User profile"
          style={{
            background: '#EEF4FB',
            border: 'none',
            borderRadius: 999,
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#002970',
            cursor: 'pointer',
          }}
        >
          <UserIcon />
        </button>
      </div>
    </div>
  );
}
