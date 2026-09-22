import React from 'react';

/**
 * PhoneFrame component provides a realistic phone mockup on desktop (md+).
 * On smaller screens it simply renders its children full‑width, without any frame.
 */
export default function PhoneFrame({ children }) {
  return (
    <>
      {/* Mobile – no frame */}
      <div className="flex flex-col min-h-screen bg-white md:hidden">{children}</div>
      {/* Desktop – framed phone */}
      <div className="hidden md:flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="relative w-[430px] h-[900px] rounded-[45px] bg-black shadow-2xl">
          <div className="absolute inset-0 m-[4px] rounded-[40px] bg-white overflow-hidden flex flex-col">
            {/* Status bar */}
            <div className="h-6 bg-gray-100 flex items-center justify-between px-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              </div>
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto">{children}</div>
            {/* Bottom home indicator */}
            <div className="h-4 flex justify-center items-center bg-gray-100">
              <div className="w-20 h-1 rounded-full bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
