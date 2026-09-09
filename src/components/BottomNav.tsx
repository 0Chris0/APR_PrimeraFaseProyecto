import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'explorar', label: 'Explorar', icon: 'explore' },
    { id: 'publicar', label: 'Publicar', icon: 'add', isCta: true },
    { id: 'mensajes', label: 'Mensajes', icon: 'chat' },
    { id: 'perfil', label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="sticky bottom-0 z-50 bg-white border-t border-[var(--color-outline)]/20 px-2 py-1 flex items-center justify-around">
      {navItems.map((item) => {
        if (item.isCta) {
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center -mt-5 group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-tertiary)] text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <span className="text-[10px] font-medium text-[var(--color-on-surface-variant)] mt-1">
                {item.label}
              </span>
            </button>
          );
        }

        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                isActive ? 'fill-1' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};