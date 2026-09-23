import React from 'react';

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * ChecklistCard — Vertical list of completed journey milestones.
 * Props:
 * - items: Array<{ label: string, description: string }>
 */
export default function ChecklistCard({ items }) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 16,
        border: '1px solid #E8EFF7',
        boxShadow: '0 2px 8px rgba(0, 41, 112, 0.05)',
        fontFamily: font,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: '#002970', marginBottom: 12 }}>
        What we covered together
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            paddingBottom: index < items.length - 1 ? 12 : 0,
            marginBottom: index < items.length - 1 ? 12 : 0,
            borderBottom: index < items.length - 1 ? '1px solid #F0F4F8' : 'none',
          }}
        >
          {/* Tick circle */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#ECFDF5',
              border: '1.5px solid #A7F3D0',
              color: '#047857',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CheckIcon />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#172B4D', lineHeight: 1.3 }}>
              {item.label}
            </div>
            <div style={{ fontSize: 11.5, color: '#5F6B7A', marginTop: 2, lineHeight: 1.4 }}>
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
