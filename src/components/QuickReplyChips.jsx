import React from 'react';

export default function QuickReplyChips({ options = [], onSelect, isInsurance = false }) {
  if (!options || options.length === 0) return null;

  const bg        = isInsurance ? '#F0FDF4' : '#EEF4FB';
  const border    = isInsurance ? '#BBF7D0' : '#D0E8FB';
  const color     = isInsurance ? '#15803D' : '#004AAD';
  const hoverBg   = isInsurance ? '#DCFCE7' : '#E0EEFC';
  const hoverBdr  = isInsurance ? '#86EFAC' : '#00A8FF';

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        margin: '8px 0 12px 36px',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      {options.map((option, idx) => {
        const label = typeof option === 'string' ? option : option.label;
        const value = typeof option === 'string' ? option : option.value || option.label;

        return (
          <button
            key={idx}
            onClick={() => onSelect(value, label)}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              color,
              borderRadius: 999,
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = hoverBg;
              e.currentTarget.style.borderColor = hoverBdr;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = bg;
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
