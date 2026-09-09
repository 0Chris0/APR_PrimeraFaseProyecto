import React from 'react';

interface ProfileViewProps {
  user?: any;
  onNavigateToHome: () => void;
  onLogout: () => void;
}

export default function ProfileView({ user, onNavigateToHome, onLogout }: ProfileViewProps) {
  const nombre = user?.nombre || 'Sofia';
  const apellido = user?.apellido || 'Martínez';
  const email = user?.email || 'usuario@coMarketia.edu';
  const carnet = user?.carnet || 'UDB-0000';
  const telefono = user?.telefono || '—';
  const initials = `${String(nombre).charAt(0)}${String(apellido).charAt(0)}`.toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 text-[var(--color-on-surface)]">
      <div className="bg-[var(--color-primary)] text-white pt-6 pb-12 px-4 rounded-b-3xl shadow-md">
        <div className="max-w-md mx-auto flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Volver al inicio"
            >
              <span className="material-symbols-outlined text-white text-xl">arrow_back</span>
            </button>
            <h1 className="text-xl font-bold font-['Plus_Jakarta_Sans']">Mi Perfil</h1>
          </div>
          <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <span className="material-symbols-outlined text-white text-xl">settings</span>
          </button>
        </div>

        <div className="max-w-md mx-auto flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[var(--color-surface-container)] border-2 border-white overflow-hidden flex items-center justify-center text-[var(--color-primary)] font-bold text-2xl shadow-inner">
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white" title="En línea"></span>
          </div>
          <div>
            <h2 className="text-lg font-bold">{`${nombre} ${apellido}`}</h2>
            <p className="text-sm text-blue-100 flex items-center gap-1">
              <span>{email}</span>
            </p>
            <div className="mt-1 inline-flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-full text-xs text-blue-50 font-medium">
              <span className="material-symbols-outlined text-blue-200 text-xs">verified_user</span>
              Estudiante Verificado
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6 space-y-4">
        <div className="bg-[var(--color-surface-container)] rounded-2xl p-4 shadow-sm border border-[var(--color-outline)]/20 grid grid-cols-3 text-center divide-x divide-[var(--color-outline)]/20">
          <div>
            <p className="text-xs text-[var(--color-on-surface-variant)]">Nombre</p>
            <p className="text-sm font-bold text-[var(--color-primary)] mt-0.5">{nombre}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-on-surface-variant)]">Carnet</p>
            <p className="text-sm font-bold text-[var(--color-primary)] mt-0.5">{carnet}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-on-surface-variant)]">Teléfono</p>
            <p className="text-sm font-bold text-[var(--color-primary)] mt-0.5">{telefono}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-outline)]/20 overflow-hidden">
          <div className="px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">
              Mi Tienda y Actividad
            </h3>
          </div>

          <div className="divide-y divide-[var(--color-outline)]/10">
            <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[var(--color-surface)] transition-colors text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[var(--color-secondary-container)] text-[var(--color-secondary)]">
                  <span className="material-symbols-outlined text-xl">inventory_2</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Mis publicaciones y servicios</p>
                  <p className="text-xs text-[var(--color-on-surface-variant)]">Edita o gestiona tu catálogo activo</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[var(--color-outline)] text-lg">chevron_right</span>
            </button>

            <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[var(--color-surface)] transition-colors text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                  <span className="material-symbols-outlined text-xl">credit_card</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Planes y Membresías</p>
                  <p className="text-xs text-[var(--color-on-surface-variant)]">Potencia la visibilidad de tu negocio</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[var(--color-outline)] text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-outline)]/20 overflow-hidden">
          <div className="px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-outline)]/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">
              Sistema y Ayuda
            </h3>
          </div>

          <div className="divide-y divide-[var(--color-outline)]/10">
            <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[var(--color-surface)] transition-colors text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <span className="material-symbols-outlined text-xl">help</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Código de Honor y Ayuda</p>
                  <p className="text-xs text-[var(--color-on-surface-variant)]">Normativa de la comunidad universitaria</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[var(--color-outline)] text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onLogout}
            className="w-full py-3.5 px-4 rounded-xl border border-red-200 bg-red-50 text-red-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Cerrar Sesión
          </button>
          <p className="text-center text-xs text-[var(--color-on-surface-variant)] mt-3">
            CoMarketia v1.0.0 • Red Universitaria Activa
          </p>
        </div>
      </div>
    </div>
  );
}