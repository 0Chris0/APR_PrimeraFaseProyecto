import React, { useState } from 'react';
import { loadRememberedCredentials, loginService } from '../services/api';

interface LoginScreenProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: (userData?: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
  onLoginSuccess,
}) => {
  const remembered = loadRememberedCredentials();
  const [email, setEmail] = useState(remembered.email);
  const [password, setPassword] = useState(remembered.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const userData = await loginService({ email, password }, rememberMe);
      setIsLoading(false);
      onLoginSuccess(userData);
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error al iniciar sesión:', error);
      setErrorMessage(
        error.response?.data?.message || 'Credenciales inválidas o falla de conexión con el servidor.'
      );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between bg-[var(--color-surface)]">
      {/* Cabecera / Marca */}
      <div className="flex flex-col items-center text-center mt-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg mb-3">
          <span className="material-symbols-outlined text-3xl">rocket_launch</span>
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary-container)]/10 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
          Red Universitaria Activa
        </span>

        <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[var(--color-on-surface)]">
          Bienvenido de vuelta a <br />
          <span className="text-[var(--color-primary)]">CoMarketia</span>
        </h1>
        <p className="text-xs text-[var(--color-on-surface-variant)] mt-2 max-w-[280px]">
          El marketplace donde despegan las ideas y talentos de tu campus.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4 my-6">
        {/* Mensaje de Error */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium text-center">
            {errorMessage}
          </div>
        )}

        {/* Campo Correo */}
        <div>
          <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1">
            Correo institucional o usuario
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] text-lg">
              mail
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Carnet@alumno.edu.sv"
              className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1">
            Contraseña
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] text-lg">
              lock
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-3 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] hover:text-[var(--color-on-surface)]"
            >
              <span className="material-symbols-outlined text-lg">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Recordar sesión y no solo la contraseña */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-[var(--color-on-surface-variant)] cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-[var(--color-outline)] text-[var(--color-primary)] focus:ring-0"
            />
            Recordar sesión
          </label>
          <button
            type="button"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Botón Iniciar Sesión (CTA Terciario #a13800) */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-[var(--color-tertiary)] hover:bg-[#882f00] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">
                progress_activity
              </span>
              <span>Iniciando sesión...</span>
            </>
          ) : (
            <>
              <span>Iniciar Sesión</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      {/* Separador u Opciones SSO */}
      <div className="space-y-3">
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[var(--color-outline)]/20"></div>
          <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[var(--color-outline)] tracking-wider">
            O ingresa con
          </span>
          <div className="flex-grow border-t border-[var(--color-outline)]/20"></div>
        </div>

        {/* Botones SSO */}
        <button
          type="button"
          className="w-full py-2.5 px-4 bg-white border border-[var(--color-outline)]/20 rounded-xl text-xs font-semibold text-[var(--color-on-surface)] flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-colors"
        >
          <span className="material-symbols-outlined text-[var(--color-primary)] text-base">
            account_balance
          </span>
          Acceso Institucional Universitario (SSO)
        </button>

        <button
          type="button"
          className="w-full py-2.5 px-4 bg-white border border-[var(--color-outline)]/20 rounded-xl text-xs font-semibold text-[var(--color-on-surface)] flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-colors"
        >
          <span className="material-symbols-outlined text-red-500 text-base">
            g_translate
          </span>
          Continuar con Google Workspace
        </button>
      </div>

      {/* Pie: Acceso a Registro */}
      <div className="mt-6 pt-4 border-t border-[var(--color-outline)]/15 text-center">
        <div className="p-3 bg-[var(--color-primary-container)]/10 rounded-xl flex items-center justify-between mb-3">
          <div className="text-left">
            <p className="text-xs font-bold text-[var(--color-on-surface)]">
              ¿Nuevo en CoMarketia?
            </p>
            <p className="text-[10px] text-[var(--color-on-surface-variant)]">
              Lanza tus productos o servicios gratis.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="px-3 py-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-lg shadow hover:bg-[var(--color-primary-container)] transition-colors"
          >
            Regístrate gratis
          </button>
        </div>

        <p className="text-[10px] text-[var(--color-outline)] flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-xs">verified_user</span>
          Comunidad verificada con credenciales universitarias
        </p>
      </div>
    </div>
  );
};