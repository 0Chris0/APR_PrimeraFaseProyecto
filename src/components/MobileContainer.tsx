import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-0 sm:p-4">
      {/* Marco simulador de celular */}
      <div className="w-full max-w-[430px] h-[100vh] sm:h-[880px] bg-[var(--color-surface)] flex flex-col justify-between relative overflow-y-auto sm:rounded-[40px] shadow-2xl border-0 sm:border-[8px] border-slate-800">
        {children}
      </div>
    </div>
  );
};