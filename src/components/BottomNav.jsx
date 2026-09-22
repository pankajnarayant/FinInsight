import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HomeNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ChatNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const OffersNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ServicesNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

/**
 * Shared BottomNav component matching FinInsight theme and routing.
 * Ensures equal 100% full-width distribution and crisp icon alignment.
 */
export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeNavIcon /> },
    { label: 'AI Chat', path: '/chat', icon: <ChatNavIcon /> },
    { label: 'Offers', path: '/offers', icon: <OffersNavIcon /> },
  ];

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        background: '#ffffff',
        borderTop: '1px solid #E8EFF7',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-around',
        padding: '10px 12px 8px',
        flexShrink: 0,
      }}
    >
      {navItems.map((item) => {
        const isActive =
          activePath === item.path ||
          (item.path === '/' && (activePath === '' || activePath === '/home'));
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              gap: 4,
              cursor: 'pointer',
              color: isActive ? '#00A8FF' : '#8A99AD',
              fontWeight: isActive ? 700 : 500,
              fontSize: 11,
              fontFamily: "'Inter', -apple-system, sans-serif",
              transition: 'color 0.15s ease',
              padding: 0,
            }}
          >
            <div style={{ color: isActive ? '#00A8FF' : '#8A99AD', display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
