import React, { useState } from 'react';
import { formatINR } from '../utils/loanCalculations';

/**
 * AffordabilityCard — Displays existing vs new EMI burden, ratio, badge, progress bar, and income input.
 */
export default function AffordabilityCard({
  newEmi,
  existingEmi = 8200,
  affordability,
  monthlyIncome,
  onIncomeChange,
}) {
  const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState(monthlyIncome || 35000);

  const { combinedEmi, ratio, status } = affordability;

  // Badge & Progress Bar color mapping based on status
  const statusConfig = {
    Good: {
      label: 'Good Affordability',
      bgColor: '#ECFDF5',
      textColor: '#047857',
      barColor: '#10B981',
      borderColor: '#A7F3D0',
    },
    Moderate: {
      label: 'Moderate Burden',
      bgColor: '#FFFBEB',
      textColor: '#B45309',
      barColor: '#F59E0B',
      borderColor: '#FDE68A',
    },
    Tight: {
      label: 'Tight Budget',
      bgColor: '#FEF2F2',
      textColor: '#B91C1C',
      barColor: '#EF4444',
      borderColor: '#FCA5A5',
    },
  }[status] || {
    label: status,
    bgColor: '#EFF6FF',
    textColor: '#1D4ED8',
    barColor: '#3B82F6',
    borderColor: '#BFDBFE',
  };

  const handleSaveIncome = () => {
    const val = Number(tempIncome);
    if (!isNaN(val) && val > 0) {
      onIncomeChange(val);
    }
    setIsEditingIncome(false);
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#002970', margin: 0 }}>
          Combined EMI Burden
        </h3>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 999,
            backgroundColor: statusConfig.bgColor,
            color: statusConfig.textColor,
            border: `1px solid ${statusConfig.borderColor}`,
          }}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Breakdown lines */}
      <div
        style={{
          background: '#F8FAFC',
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          fontSize: 13,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5F6B7A' }}>
          <span>Existing Active EMI</span>
          <span style={{ fontWeight: 600, color: '#172B4D' }}>{formatINR(existingEmi)}/mo</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5F6B7A' }}>
          <span>New Estimated EMI</span>
          <span style={{ fontWeight: 600, color: '#004AAD' }}>+ {formatINR(newEmi)}/mo</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px dashed #CBD5E1',
            paddingTop: 6,
            marginTop: 2,
            fontWeight: 700,
            fontSize: 14,
            color: '#002970',
          }}
        >
          <span>Combined Total EMI</span>
          <span>{formatINR(combinedEmi)}/mo</span>
        </div>
      </div>

      {/* Progress bar section */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
          <span style={{ color: '#5F6B7A', fontWeight: 500 }}>Income Used for EMIs</span>
          <span style={{ fontWeight: 700, color: statusConfig.textColor }}>{ratio}% of Income</span>
        </div>

        <div
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#E2E8F0',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min(100, ratio)}%`,
              height: '100%',
              backgroundColor: statusConfig.barColor,
              borderRadius: 999,
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        <div style={{ fontSize: 12, color: '#475569', marginTop: 8, lineHeight: '1.4' }}>
          This uses approximately <strong style={{ color: '#002970' }}>{ratio}%</strong> of your monthly income.
        </div>
      </div>

      {/* Monthly income row with inline editing / demo badge */}
      <div
        style={{
          borderTop: '1px solid #F1F5F9',
          paddingTop: 10,
          marginTop: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
        }}
      >
        <div>
          <span style={{ color: '#64748B' }}>Monthly Income: </span>
          {isEditingIncome ? (
            <input
              type="number"
              value={tempIncome}
              onChange={(e) => setTempIncome(e.target.value)}
              style={{
                width: 90,
                padding: '2px 6px',
                border: '1px solid #00A8FF',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600,
              }}
              autoFocus
            />
          ) : (
            <strong style={{ color: '#002970', fontSize: 13 }}>{formatINR(monthlyIncome)}</strong>
          )}
          <span
            style={{
              fontSize: 9,
              color: '#94A3B8',
              marginLeft: 6,
              background: '#F1F5F9',
              padding: '1px 5px',
              borderRadius: 4,
            }}
          >
            MOCK DATA
          </span>
        </div>

        {isEditingIncome ? (
          <button
            onClick={handleSaveIncome}
            style={{
              background: '#002970',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '3px 9px',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditingIncome(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#00A8FF',
              fontWeight: 600,
              fontSize: 11,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
