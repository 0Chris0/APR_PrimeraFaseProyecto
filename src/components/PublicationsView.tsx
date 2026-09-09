import React, { useState } from 'react';

interface Publication {
  id: string;
  title: string;
  category: string;
  price: string;
  type: 'Producto' | 'Servicio';
  status: 'Activo' | 'Pausado';
  image: string;
}

export default function PublicationsView({ onBack, onNewPost }: { onBack: () => void, onNewPost: () => void }) {
  // Estado simulado de las publicaciones del usuario (estudiante vendedor)
  const [publications, setPublications] = useState<Publication[]>([
    {
      id: '1',
      title: 'Asesoría en Cálculo Diferencial e Integral',
      category: 'Tutorías & Asesorías',
      price: '$ 5.00 / hora',
      type: 'Servicio',
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '2',
      title: 'Kit de Arduino Uno Básico + Sensores',
      category: 'Electrónica & Hardware',
      price: '$ 25.00',
      type: 'Producto',
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '3',
      title: 'Diseño de Logos y Branding para Emprendimientos',
      category: 'Diseño & Multimedia',
      price: '$ 15.00',
      type: 'Servicio',
      status: 'Pausado',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=300&q=80'
    }
  ]);

  const handleDelete = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  const toggleStatus = (id: string) => {
    setPublications(publications.map(pub => {
      if (pub.id === id) {
        return { ...pub, status: pub.status === 'Activo' ? 'Pausado' : 'Activo' };
      }
      return pub;
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 text-[var(--color-on-surface)]">
      {/* Encabezado Superior */}
      <div className="bg-white border-b border-[var(--color-outline)]/20 px-4 py-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-[var(--color-surface-container)] transition-colors text-[var(--color-on-surface)]"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <h1 className="text-base font-bold font-['Plus_Jakarta_Sans']">Mis Publicaciones</h1>
            <p className="text-xs text-[var(--color-on-surface-variant)]">Gestiona tu catálogo de campus</p>
          </div>
        </div>
        
        <button 
          onClick={onNewPost}
          className="bg-[var(--color-primary)] text-white p-2 rounded-xl flex items-center gap-1 text-xs font-semibold shadow-sm hover:bg-[var(--color-primary-container)] transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Nuevo</span>
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Resumen rápido */}
        <div className="bg-[var(--color-surface-container)] rounded-2xl p-3.5 flex justify-between items-center text-xs border border-[var(--color-outline)]/20">
          <span className="text-[var(--color-on-surface-variant)]">Total de ofertas en tu escaparate:</span>
          <span className="font-bold text-[var(--color-primary)] bg-white px-2.5 py-1 rounded-full shadow-xs">
            {publications.length} activas / pausadas
          </span>
        </div>

        {/* Listado de Publicaciones */}
        {publications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[var(--color-outline)]/20 p-6 space-y-3">
            <div className="w-12 h-12 bg-[var(--color-surface-container)] rounded-full flex items-center justify-center mx-auto text-[var(--color-on-surface-variant)]">
              <span className="material-symbols-outlined text-2xl">sell</span>
            </div>
            <p className="font-semibold text-sm">No tienes publicaciones aún</p>
            <p className="text-xs text-[var(--color-on-surface-variant)]">Comparte tus productos o servicios con la comunidad universitaria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {publications.map((pub) => (
              <div 
                key={pub.id}
                className="bg-white rounded-2xl p-3.5 shadow-sm border border-[var(--color-outline)]/20 flex gap-3.5 relative overflow-hidden"
              >
                {/* Imagen del producto */}
                <div className="w-20 h-20 rounded-xl bg-[var(--color-surface-container)] overflow-hidden flex-shrink-0 relative">
                  <img src={pub.image} alt={pub.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-1 left-1 text-[9px] px-1.5 py-0.5 rounded font-bold text-white ${pub.type === 'Servicio' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                    {pub.type}
                  </span>
                </div>

                {/* Información */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-semibold text-[var(--color-secondary)] uppercase tracking-wider">
                      {pub.category}
                    </span>
                    <button 
                      onClick={() => toggleStatus(pub.id)}
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        pub.status === 'Activo' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}
                    >
                      {pub.status}
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-[var(--color-on-surface)] truncate mt-0.5">
                    {pub.title}
                  </h3>

                  <p className="text-sm font-bold text-[var(--color-tertiary, #a13800)] mt-1">
                    {pub.price}
                  </p>

                  {/* Acciones de gestión */}
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[var(--color-outline)]/10 text-xs text-[var(--color-on-surface-variant)]">
                    <button className="flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Editar</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(pub.id)}
                      className="flex items-center gap-1 hover:text-red-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}