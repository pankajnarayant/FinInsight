import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-paytmGrayBg rounded-b-[24px] p-4 mb-4">
      <h2 className="text-2xl font-semibold text-paytmDeepBlue mb-2">
        Your AI-powered
        <br />
        Financial Journey Assistant
      </h2>
      <p className="text-base text-paytmDeepBlue mb-4">
        Making financial decisions simple,
        <br />
        personalized and understandable.
      </p>
      {/* Feature highlights */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="text-sm text-paytmDeepBlue">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-5 w-5 text-paytmBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
          Ask in simple words
        </div>
        <div className="text-sm text-paytmDeepBlue">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-5 w-5 text-paytmBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6"/></svg>
          Get clear explanations
        </div>
        <div className="text-sm text-paytmDeepBlue">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-5 w-5 text-paytmBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14"/></svg>
          Find the right next steps
        </div>
      </div>
    </section>
  );
}
