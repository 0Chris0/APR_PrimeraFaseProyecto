import React, { useState } from 'react';
import { registerService } from '../services/api';

const countryDialCodes = [
  { dialCode: '+503', flag: '🇸🇻', short: 'SV' },
  { dialCode: '+504', flag: '🇭🇳', short: 'HN' },
  { dialCode: '+502', flag: '🇬🇹', short: 'GT' },
  { dialCode: '+506', flag: '🇨🇷', short: 'CR' },
  { dialCode: '+507', flag: '🇵🇦', short: 'PA' },
  { dialCode: '+51', flag: '🇵🇪', short: 'PE' },
  { dialCode: '+52', flag: '🇲🇽', short: 'MX' },
  { dialCode: '+54', flag: '🇦🇷', short: 'AR' },
  { dialCode: '+55', flag: '🇧🇷', short: 'BR' },
  { dialCode: '+56', flag: '🇨🇱', short: 'CL' },
  { dialCode: '+57', flag: '🇨🇴', short: 'CO' },
  { dialCode: '+58', flag: '🇻🇪', short: 'VE' },
  { dialCode: '+591', flag: '🇧🇴', short: 'BO' },
  { dialCode: '+593', flag: '🇪🇨', short: 'EC' },
  { dialCode: '+598', flag: '🇺🇾', short: 'UY' },
  { dialCode: '+1', flag: '🇺🇸', short: 'US' },
  { dialCode: '+1', flag: '🇨🇦', short: 'CA' },
  { dialCode: '+34', flag: '🇪🇸', short: 'ES' },
  { dialCode: '+61', flag: '🇦🇺', short: 'AU' },
];

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: (userData?: any) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
}) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carnet, setCarnet] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryDialCodes[0]);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    const trimmed = rawDigits.slice(0, 9);

    if (rawDigits.length > 8) {
      setErrorMessage('Solo se aceptan 8 dígitos en el teléfono.');
    } else {
      setErrorMessage(null);
    }

    setTelefono(trimmed.slice(0, 8));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const phoneValue = telefono.trim() ? `${selectedCountry.dialCode} ${telefono.trim()}` : '';
      const userData = await registerService({
        nombre,
        apellido,
        email,
        password,
        carnet,
        telefono: phoneValue,
      });
      setIsLoading(false);
      onRegisterSuccess(userData);
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error al registrar usuario:', error);
      setErrorMessage(
        error.response?.data?.message || 'Error al conectar con el servidor para registrar el usuario.'
      );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between bg-[var(--color-surface)]">
      {/* Cabecera */}
      <div className="flex flex-col items-center text-center mt-2">
        <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg mb-2">
          <span className="material-symbols-outlined text-2xl">person_add</span>
        </div>

        <h1 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[var(--color-on-surface)]">
          Crea tu cuenta en <br />
          <span className="text-[var(--color-primary)]">CoMarketia</span>
        </h1>
        <p className="text-xs text-[var(--color-on-surface-variant)] mt-1 max-w-[280px]">
          Regístrate para comprar y publicar en la comunidad universitaria.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-3 my-3">
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium text-center">
            {errorMessage}
          </div>
        )}

        {/* Nombres y Apellidos en dos columnas */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1">
              Nombre
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Juan"
              className="w-full px-3 py-2 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1">
              Apellido
            </label>
            <input
              type="text"
              required
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Ej. Pérez"
              className="w-full px-3 py-2 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Campo Carnet (Opcional) */}
        <div>
          <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1">
            Carnet universitario
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] text-lg">
              badge
            </span>
            <input
              type="text"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
              placeholder="2026001"
              className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Campo Teléfono (Opcional) */}
        <div>
          <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1">
            Teléfono
          </label>
          <div className="flex gap-2 items-center">
            <div className="relative w-24">
              <button
                type="button"
                onClick={() => setIsCountryMenuOpen((current) => !current)}
                className="w-full flex items-center justify-between gap-1 px-2 py-2 bg-white border border-[var(--color-outline)]/30 rounded-xl text-[11px] focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
              >
                <span className="flex items-center gap-1">
                  <span className="text-[10px]">{selectedCountry.flag}</span>
                  <span className="font-semibold text-[10px]">{selectedCountry.short}</span>
                </span>
                <span className="font-semibold text-[10px]">{selectedCountry.dialCode}</span>
                <span className="material-symbols-outlined text-[12px] text-[var(--color-outline)]">
                  expand_more
                </span>
              </button>

              {isCountryMenuOpen && (
                <div className="absolute left-0 top-full z-30 mt-1 w-24 max-h-36 overflow-y-auto rounded-xl border border-[var(--color-outline)]/30 bg-white shadow-lg">
                  {countryDialCodes.map((country) => (
                    <button
                      key={`${country.dialCode}-${country.short}`}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-1 px-2 py-1.5 text-[10px] hover:bg-[var(--color-surface)] transition-colors"
                    >
                      <span className="text-[10px]">{country.flag}</span>
                      <span className="font-semibold">{country.short}</span>
                      <span className="font-semibold">{country.dialCode}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] text-lg">
                call
              </span>
              <input
                type="tel"
                value={telefono}
                onChange={handleTelefonoChange}
                maxLength={9}
                placeholder="70000000"
                className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Campo Correo */}
        <div>
          <label className="block text-xs font-semibold text-[var(--color-on-surface)] mb-1">
            Correo institucional
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
              className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
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
              className="w-full pl-10 pr-10 py-2 bg-white border border-[var(--color-outline)]/30 rounded-xl text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
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

        {/* Botón Registrarse */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-container)] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 mt-3"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">
                progress_activity
              </span>
              <span>Guardando registro...</span>
            </>
          ) : (
            <>
              <span>Crear Cuenta</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      {/* Volver al Login */}
      <div className="mt-2 pt-2 border-t border-[var(--color-outline)]/15 text-center">
        <p className="text-xs text-[var(--color-on-surface-variant)]">
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="text-[var(--color-primary)] font-bold hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};