import React from 'react';

export default function AmountInput({ label, value, onChange, disabled }) {
  // format Indian number style on blur, remove commas on focus
  const formatIndian = (num) => {
    if (!num) return '';
    const parts = num.replace(/,/g, '').split('.');
    const integer = parts[0];
    const lastThree = integer.substring(integer.length - 3);
    const otherNumbers = integer.substring(0, integer.length - 3);
    const formattedOther = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    const formatted = otherNumbers ? formattedOther + ',' + lastThree : lastThree;
    return parts[1] ? formatted + '.' + parts[1] : formatted;
  };

  const handleBlur = () => {
    onChange(formatIndian(value));
  };

  const handleFocus = () => {
    onChange(value.replace(/,/g, ''));
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-paytmDeepBlue font-medium">{label}</label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-paytmDeepBlue">₹</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={label === 'How much do you need?' ? 'e.g. 2,00,000' : 'e.g. 10,000'}
          disabled={disabled}
          className={`w-full pl-8 pr-3 py-2 border rounded-card focus:border-paytmBlue disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      </div>
    </div>
  );
}
