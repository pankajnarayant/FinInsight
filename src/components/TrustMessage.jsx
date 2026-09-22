import React from 'react';
import { ReactComponent as ShieldIcon } from '../icons/shield.svg'; // placeholder path

/**
 * TrustMessage component displays a small security notice.
 */
export default function TrustMessage() {
  return (
    <section className="flex items-center justify-center mt-4 text-sm text-paytmGrayDark">
      {/* Use a simple shield SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-paytmBlue mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>Your information is secure and used only to personalize your journey.</span>
    </section>
  );
}
