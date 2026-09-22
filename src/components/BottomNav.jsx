import React from 'react';
import { useFinInsight } from '../context/FinInsightContext';

export const HomeNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

export const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ServicesNavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

export default function BottomNav({ activeTab = 'Home', onTabClick }) {
  const { navigate } = useFinInsight();

  const handleTab = (label) => {
    if (onTabClick) {
      onTabClick(label);
    }
    if (label === 'Home') {
      navigate('/');
    }
  };

  const navItems = [
    { label: 'Home', icon: <HomeNavIcon />, active: activeTab === 'Home' },
    { label: 'Scan', icon: <ScanIcon />, active: activeTab === 'Scan' },
    { label: 'Pay', icon: <PlusIcon />, center: true },
    { label: 'History', icon: <HistoryIcon />, active: activeTab === 'History' },
    { label: 'Services', icon: <ServicesNavIcon />, active: activeTab === 'Services' },
  ];

  return (
    <div
      style={{
        background: '#fff',
        borderTop: '1px solid #E8EFF7',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '6px 0 10px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 20,
      }}
    >
      {navItems.map((item) =>
        item.center ? (
          <div
            key={item.label}
            onClick={() => handleTab(item.label)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 999,
                background: 'linear-gradient(135deg, #00A8FF, #002970)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginTop: -18,
                boxShadow: '0 4px 16px rgba(0,168,255,0.5)',
              }}
            >
              {item.icon}
            </div>
            <span style={{ fontSize: 9, color: '#B0C4D8' }}>{item.label}</span>
          </div>
        ) : (
          <div
            key={item.label}
            onClick={() => handleTab(item.label)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}
          >
            <span style={{ color: item.active ? '#00A8FF' : '#B0C4D8' }}>{item.icon}</span>
            <span
              style={{
                fontSize: 9,
                fontWeight: item.active ? 700 : 400,
                color: item.active ? '#00A8FF' : '#B0C4D8',
              }}
            >
              {item.label}
            </span>
          </div>
        )
      )}
    </div>
  );
}
