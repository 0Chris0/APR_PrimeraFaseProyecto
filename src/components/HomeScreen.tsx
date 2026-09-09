import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { getOffersService } from '../services/api';

interface HomeScreenProps {
  onNavigateToPublish: () => void;
  onNavigateToProfile: () => void;
}

interface Offer {
  id: string | number;
  title: string;
  seller: string;
  price: string | number;
  category: string;
  rating?: number;
  image?: string;
  badge?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToPublish, onNavigateToProfile }) => {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Todos', icon: 'grid_view' },
    { id: 'food', name: 'Comida', icon: 'fastfood' },
    { id: 'services', name: 'Tutorías', icon: 'school' },
    { id: 'tech', name: 'Tecnología', icon: 'devices' },
    { id: 'crafts', name: 'Artesanías', icon: 'palette' },
  ];

  useEffect(() => {
    // Petición al backend Spring Boot
    getOffersService()
      .then((data) => {
        setOffers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error conectando con Spring Boot:', err);
        setError('No se pudieron cargar los datos del servidor.');
        setLoading(false);
      });
  }, []);

  // Filtrado de ofertas por categoría seleccionada
  const filteredOffers = selectedCategory === 'Todos'
    ? offers
    : offers.filter((offer) => offer.category === selectedCategory);

  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)]">
      {/* Header institucional */}
      <Header />

      {/* Contenido desplazable */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-6">
        {/* Banner de Bienvenida */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#003a8f] to-[#0052cc] text-white shadow-md">
          <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">
            Comunidad Universitaria
          </span>
          <h2 className="text-lg font-bold mt-1">¡Apoya el talento de tu campus!</h2>
          <p className="text-xs text-blue-100 mt-1">
            Encuentra productos y servicios ofrecidos por tus compañeros.
          </p>
        </div>

        {/* Categorías (Scroll Horizontal) */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-[var(--color-on-surface)]">Categorías</h3>
            <span className="text-xs text-[var(--color-primary)] font-semibold cursor-pointer">
              Ver todas
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-base">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Emprendimientos Destacados */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-[var(--color-on-surface)]">
              Destacados del Campus
            </h3>
            <span className="text-xs text-[var(--color-primary)] font-semibold cursor-pointer">
              Ver más
            </span>
          </div>

          {/* Estado de Carga / Error */}
          {loading && (
            <div className="p-6 text-center text-xs text-slate-500">
              Cargando publicaciones desde Spring Boot...
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs text-center">
              {error}
            </div>
          )}

          {!loading && !error && filteredOffers.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500">
              No hay publicaciones disponibles en esta categoría.
            </div>
          )}

          {/* Lista de Tarjetas */}
          {!loading && !error && (
            <div className="flex flex-col gap-4">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col transition-all active:scale-[0.99]"
                >
                  <div className="relative h-36 w-full bg-slate-100">
                    <img
                      src={
                        offer.image ||
                        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400'
                      }
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    {offer.badge && (
                      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-[var(--color-primary)] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {offer.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-[var(--color-on-surface)] line-clamp-1">
                        {offer.title}
                      </h4>
                      <span className="text-sm font-bold text-[var(--color-primary)] whitespace-nowrap">
                        {typeof offer.price === 'number' ? `$${offer.price.toFixed(2)}` : offer.price}
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--color-on-surface-variant)] mt-1 line-clamp-1">
                      {offer.seller}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                        <span className="material-symbols-outlined text-sm fill-current">star</span>
                        <span>{offer.rating ?? 5.0}</span>
                      </div>

                      <button className="text-[11px] font-bold text-[var(--color-primary)] flex items-center gap-0.5">
                        Contactar
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navegación Inferior */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab: string) => {
          setActiveTab(tab);
          if (tab === 'publicar') {
            onNavigateToPublish();
          }
          if (tab === 'perfil') {
            onNavigateToProfile();
          }
        }}
      />
    </div>
  );
};