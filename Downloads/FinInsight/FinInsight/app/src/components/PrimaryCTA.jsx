import React from 'react';

/**
 * Primary Call To Action component displayed on the Home screen.
 * Shows a button that triggers an alert.
 */
export default function PrimaryCTA() {
  const handleClick = () => {
    alert('AI financial assistant coming next.');
  };
  return (
    <section className="my-6 text-center">
      <button
        onClick={handleClick}
        className="inline-block w-full max-w-xs bg-paytmBlue text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-paytmBlue/90 transition-colors"
      >
        ✦ Talk to FinInsight →
      </button>
      <p className="text-sm text-paytmDeepBlue mt-2">Tell us what you need in your own words.</p>
    </section>
  );
}
