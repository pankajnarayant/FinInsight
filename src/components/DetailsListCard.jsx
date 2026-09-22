import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../utils/glossary';
import { formatINR } from '../utils/loanCalculations';

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * DetailsListCard — Expandable list breakdown with tappable (ⓘ) glossary explanations.
 */
export default function DetailsListCard({ interestRate = 14, processingFee = 2000, tenure = 24, totalInterest }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  const [expandedKey, setExpandedKey] = useState(null);

  const toggleExpand = (key) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  const detailsItems = [
    {
      key: 'interestRate',
      label: 'Interest Rate',
      value: `${interestRate}% p.a.`,
      glossaryKey: 'interestRate',
    },
    {
      key: 'processingFee',
      label: 'Processing Fee',
      value: formatINR(processingFee),
      glossaryKey: 'processingFee',
    },
    {
      key: 'tenure',
      label: 'Tenure',
      value: `${tenure} months`,
      glossaryKey: 'tenure',
    },
    {
      key: 'totalInterest',
      label: 'Total Interest',
      value: formatINR(totalInterest),
      glossaryKey: 'totalInterest',
    },
  ];

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 16,
        border: '1px solid #E8EFF7',
        boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
        fontFamily: font,
      }}
    >
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#002970', margin: '0 0 12px 0' }}>
        Plan Details & Breakdown
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {detailsItems.map((item) => {
          const isExpanded = expandedKey === item.key;
          const termInfo = GLOSSARY_TERMS[item.glossaryKey];

          return (
            <div
              key={item.key}
              style={{
                borderRadius: 10,
                backgroundColor: isExpanded ? '#F0F7FF' : '#F8FAFC',
                border: isExpanded ? '1px solid #BAE6FD' : '1px solid #F1F5F9',
                padding: '10px 12px',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{item.label}</span>
                  <button
                    onClick={() => toggleExpand(item.key)}
                    aria-label={`Explain ${item.label}`}
                    style={{
                      background: isExpanded ? '#00A8FF' : 'none',
                      border: 'none',
                      color: isExpanded ? '#ffffff' : '#00A8FF',
                      cursor: 'pointer',
                      padding: 2,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <InfoIcon />
                  </button>
                </div>

                <span style={{ fontSize: 13, fontWeight: 700, color: '#002970' }}>{item.value}</span>
              </div>

              {/* Inline plain-language explanation when info icon is tapped */}
              {isExpanded && termInfo && (
                <div
                  style={{
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: '1px solid #DBEAFE',
                    fontSize: 12,
                    color: '#1E293B',
                    lineHeight: '1.45',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#004AAD', marginBottom: 2 }}>{termInfo.title}</div>
                  <div>{termInfo.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
