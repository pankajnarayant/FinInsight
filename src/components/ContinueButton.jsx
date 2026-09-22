import React from 'react';

export default function ContinueButton({ disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 bg-paytmDeepBlue text-white rounded-btn transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Continue
    </button>
  );
}
