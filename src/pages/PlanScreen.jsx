import React from 'react';
import { useFinInsight } from '../context/FinInsightContext';
import PhoneContainer from '../components/PhoneContainer';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

export default function PlanScreen() {
  const {
    name,
    credit_score,
    pre_approved_formatted,
    existing_emi_formatted,
    financialPlan,
    navigate,
  } = useFinInsight();

  return (
    <PhoneContainer>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F5F8FC', fontSize: 14 }}>
        <TopAppBar />

        {/* Top Header Strip */}
        <div
          style={{
            background: 'linear-gradient(90deg, #002970 0%, #004AAD 100%)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Personalized Plan for</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{name} ✨</div>
          </div>
          <button
            onClick={() => navigate('/chat')}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: 999,
              padding: '6px 12px',
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ← Modify Chat
          </button>
        </div>

        {/* Main Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px' }}>
          {/* Placeholder Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F8FF 100%)',
              border: '1.5px solid #00A8FF',
              borderRadius: 18,
              padding: '16px',
              marginBottom: 14,
              boxShadow: '0 4px 18px rgba(0, 168, 255, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>📋</span>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#002970' }}>
                Screen 3: Financial Plan
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#5F6B7A', lineHeight: 1.5 }}>
              Your financial plan data has been successfully collected via the AI conversation. Screen 3 placeholder is ready for development!
            </p>
          </div>

          {/* Captured Plan Card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: '16px',
              border: '1px solid #E3ECF5',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#172B4D', marginBottom: 12, borderBottom: '1px solid #EEF4FB', paddingBottom: 8 }}>
              Captured Conversation Data
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>Borrowing Purpose:</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#002970' }}>
                  {financialPlan.purpose || 'Not specified'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>Target Amount:</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#00A8FF' }}>
                  {financialPlan.amount_formatted || (financialPlan.amount ? `₹${financialPlan.amount.toLocaleString('en-IN')}` : 'Not set')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>Comfortable New EMI:</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#002970' }}>
                  {financialPlan.new_emi_formatted || financialPlan.new_emi_preference || 'Flexible'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>Repayment Tenure:</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#002970' }}>
                  {financialPlan.tenure || 'Not specified'}
                </span>
              </div>

              <div style={{ height: 1, background: '#E8EFF7', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>Credit Score:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>
                  {credit_score} (Good)
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>Pre-Approved Limit:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#5F6B7A' }}>
                  {pre_approved_formatted}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>Existing Monthly EMI:</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#5F6B7A' }}>
                  {existing_emi_formatted}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => navigate('/chat')}
              style={{
                flex: 1,
                padding: '12px 0',
                borderRadius: 999,
                background: '#EEF4FB',
                color: '#004AAD',
                border: '1px solid #D0E8FB',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Back to Chat
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                flex: 1,
                padding: '12px 0',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #00A8FF 0%, #0055CC 100%)',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 168, 255, 0.35)',
              }}
            >
              Return to Home
            </button>
          </div>
        </div>

        <BottomNav activeTab="Services" />
      </div>
    </PhoneContainer>
  );
}
