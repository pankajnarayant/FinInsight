import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

export default function OffersScreen() {
  const navigate = useNavigate();
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <>
      <TopAppBar />

      {/* Placeholder Content */}
      <div
        style={{
          flex: 1,
          padding: 20,
          background: '#F5F8FC',
          fontFamily: font,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            background: '#E6F6FF',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontSize: 28,
            marginBottom: 16,
          }}
        >
          🎁
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#002970', margin: '0 0 8px 0' }}>
          Pre-Approved Offers
        </h2>
        <p style={{ fontSize: 13, color: '#5F6B7A', lineHeight: 1.5, marginBottom: 20 }}>
          Curated pre-approved bank offers & instant disbursement options matching your personalized plan.
        </p>
        <button
          onClick={() => navigate('/chat')}
          style={{
            background: '#002970',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '10px 18px',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          ← Back to Chat Assistant
        </button>
      </div>

      <BottomNav />
    </>
  );
}
