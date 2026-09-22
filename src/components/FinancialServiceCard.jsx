import React from 'react';

/**
 * FinancialServiceCard component
 * Props:
 * - primary: boolean (if true, apply primary accent styling)
 * - icon: JSX element (icon SVG)
 * - title: string
 * - description: string
 */
export default function FinancialServiceCard({ primary = false, icon, title, description }) {
  const baseClasses = "flex items-start p-3 rounded-lg border transition-shadow hover:shadow-lg cursor-pointer";
  const borderColor = primary ? "border-paytmBlue" : "border-paytmGrayBg";
  const bgColor = primary ? "bg-paytmBlue/10" : "bg-white";
  const textColor = primary ? "text-paytmBlue" : "text-paytmDeepBlue";

  const handleClick = () => {
    if (title.toLowerCase().includes('loan')) {
      alert('Loan journey coming next.');
    } else if (title.toLowerCase().includes('insurance')) {
      alert('Insurance journey coming next.');
    } else {
      alert('More financial services coming soon.');
    }
  };

  return (
    <div onClick={handleClick} className={`${baseClasses} ${borderColor} ${bgColor}`}>
      <div className="mr-3 flex-shrink-0 text-2xl" aria-hidden="true">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className={`font-medium ${textColor}`}>{title}</h3>
        <p className="text-sm text-paytmGrayDark mt-1">{description}</p>
      </div>
    </div>
  );
}
