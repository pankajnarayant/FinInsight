import React from 'react';
import { ReactComponent as BellIcon } from '../icons/bell.svg'; // placeholder path

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-paytmGrayBg">
      <div className="flex items-center space-x-1">
        <h1 className="text-2xl font-bold" style={{ color: '#002970' }}>
          <span style={{ color: '#002970' }}>Fin</span>
          <span style={{ color: '#00BAF2' }}>Insight</span>
        </h1>
        <span className="text-xs font-medium bg-paytmBlue/10 text-paytmBlue px-2 py-0.5 rounded-full">AI</span>
      </div>
      <div className="flex items-center space-x-3">
        <button className="p-1 hover:bg-paytmGrayBg rounded-full">
          {/* Simple bell icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-paytmDeepBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="w-8 h-8 rounded-full bg-paytmGrayBg flex items-center justify-center">
          {/* Simple user avatar placeholder */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-paytmDeepBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
