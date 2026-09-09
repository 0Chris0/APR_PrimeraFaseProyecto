import React from 'react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "CoMarketia" }) => {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-md px-4 py-3 border-b border-[var(--color-outline)]/20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl">
          rocket_launch
        </span>
        <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-lg text-[var(--color-primary)] tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-[var(--color-on-surface-variant)] hover:bg-slate-100 rounded-full transition-colors">
          <span className="material-symbols-outlined text-xl">search</span>
        </button>
        <button className="p-2 text-[var(--color-on-surface-variant)] hover:bg-slate-100 rounded-full transition-colors relative">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-tertiary)] rounded-full"></span>
        </button>
      </div>
    </header>
  );
};