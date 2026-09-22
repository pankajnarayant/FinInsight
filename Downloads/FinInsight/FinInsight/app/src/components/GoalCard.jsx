import React from 'react';

export default function GoalCard({ icon, label, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center p-4 rounded-card shadow-sm transition-colors ${selected ? 'border-2 border-paytmBlue bg-paytmBlue/10' : 'bg-paytmGrayBg'}
      `}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-paytmBlue/20 mb-2 text-2xl">
        {icon}
      </div>
      <span className="text-sm font-medium text-paytmDeepBlue">{label}</span>
    </button>
  );
}
