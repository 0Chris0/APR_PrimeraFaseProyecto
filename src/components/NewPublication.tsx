import React, { useRef, useState } from 'react';

export default function NewPublicationView({ onBack, onSuccess }: { onBack: () => void, onSuccess: () => void }) {
  // Estados del formulario
  const [pubType, setPubType] = useState<'producto' | 'servicio'>('producto');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [pricingModel, setPricingModel] = useState<'fijo' | 'hora'>('fijo');
  const [price, setPrice] = useState('');
  
  // Fotos simuladas (máximo 3)
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=300&q=80'
  ]);

  // Puntos de entrega seleccionados
  const [deliveryPoints, setDeliveryPoints] = useState({
    campus: true,
    virtual: false,
    delivery: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemovePhoto = (index: number) => {
    const photoToRemove = photos[index];
    if (photoToRemove?.startsWith('blob:')) {
      URL.revokeObjectURL(photoToRemove);
    }

    setPhotos((currentPhotos) => currentPhotos.filter((_, i) => i !== index));
  };

  const handleAddPhoto = () => {
    if (photos.length >= 3) {
      return;
    }
    photoInputRef.current?.click();
  };

  const handlePhotoSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 6_000_000) {
      return;
    }

    const preview = URL.createObjectURL(file);
    setPhotos((currentPhotos) => {
      if (currentPhotos.length >= 3) {
        return currentPhotos;
      }
      return [...currentPhotos, preview];
    });
    event.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula el envío de la publicación
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(); // Regresa o muestra mensaje de éxito
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[var(--color-surface)] pb-24 text-[var(--color-on-surface)]">
      {/* Encabezado Fijo */}
      <div className="bg-white border-b border-[var(--color-outline)]/20 px-4 py-4 sticky top-0 z-10 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-[var(--color-surface-container)] transition-colors text-[var(--color-on-surface)]"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <h1 className="text-base font-bold font-['Plus_Jakarta_Sans'] flex items-center gap-2">
              Nueva Publicación <span className="text-xs font-normal text-[var(--color-on-surface-variant)] bg-[var(--color-surface-container)] px-2 py-0.5 rounded-full">Paso 1 de 2</span>
            </h1>
            <p className="text-xs text-[var(--color-on-surface-variant)]">Detalla tu oferta para la comunidad</p>
          </div>
        </div>
      </div>

      {/* Formulario Principal */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-5">
        
        {/* Selector de Tipo de Oferta (Toggle) */}
        <div className="bg-[var(--color-surface-container)] p-1.5 rounded-2xl flex gap-1 border border-[var(--color-outline)]/20">
          <button
            type="button"
            onClick={() => setPubType('producto')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              pubType === 'producto' 
                ? 'bg-[var(--color-primary)] text-white shadow-sm' 
                : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
            }`}
          >
            📦 Producto Físico
          </button>
          <button
            type="button"
            onClick={() => setPubType('servicio')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              pubType === 'servicio' 
                ? 'bg-[var(--color-primary)] text-white shadow-sm' 
                : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
            }`}
          >
            🎓 Servicio / Asesoría
          </button>
        </div>

        {/* Galería de Fotos */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-outline)]/20 space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">
              Galería del producto o servicio
            </label>
            <span className="text-xs font-semibold text-[var(--color-secondary)]">
              {photos.length} de 3 fotos
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-xl bg-[var(--color-surface-container)] overflow-hidden border border-[var(--color-outline)]/20">
                <img src={photo} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                {index === 0 && (
                  <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-bold backdrop-blur-xs">
                    Portada
                  </span>
                )}
                <button 
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}

            {photos.length < 3 && (
              <>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoSelected}
                />
                <button 
                  type="button"
                  onClick={handleAddPhoto}
                  className="aspect-square rounded-xl border-2 border-dashed border-[var(--color-outline)]/40 flex flex-col items-center justify-center text-center p-2 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-all text-[var(--color-on-surface-variant)]"
                >
                  <span className="material-symbols-outlined text-2xl mb-1 text-[var(--color-primary)]">photo_camera</span>
                  <span className="text-[10px] font-semibold leading-tight">Tomar foto o subir</span>
                </button>
              </>
            )}
          </div>
          <p className="text-[11px] text-[var(--color-on-surface-variant)] italic">
            💡 Recomendación: Sube fotos nítidas con buena luz natural del campus.
          </p>
        </div>

        {/* Información Básica */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-outline)]/20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">
            Información de la Publicación
          </h2>

          <div>
            <label className="block text-xs font-semibold mb-1 text-[var(--color-on-surface)]">
              Título de la publicación *
            </label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={pubType === 'servicio' ? "ej. Asesoría en Cálculo Diferencial..." : "ej. Kit de Arduino Uno Básico..."}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/30 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-[var(--color-on-surface)]">
              Categoría principal *
            </label>
            <select 
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/30 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-on-surface)]"
            >
              <option value="">Selecciona una categoría...</option>
              <option value="tutorias">Tutorías & Asesorías Académicas</option>
              <option value="electronica">Electrónica & Hardware</option>
              <option value="diseno">Diseño & Multimedia</option>
              <option value="papeleria">Papelería & Apuntes</option>
              <option value="snacks">Comida & Snacks del Campus</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[var(--color-on-surface)]">
                Descripción detallada *
              </label>
              <span className="text-[10px] text-[var(--color-on-surface-variant)]">{description.length}/400</span>
            </div>
            <textarea 
              required
              rows={3}
              maxLength={400}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe los temas abordados, condición del artículo, horarios disponibles, facultades habituales..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/30 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Modelo de Cobro */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-outline)]/20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">
            Modelo de Cobro
          </h2>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPricingModel('fijo')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                pricingModel === 'fijo' 
                  ? 'bg-[var(--color-secondary-container)] text-[var(--color-secondary)] border-[var(--color-secondary)]' 
                  : 'bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] border-[var(--color-outline)]/30'
              }`}
            >
              Precio Fijo
            </button>
            <button
              type="button"
              onClick={() => setPricingModel('hora')}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                pricingModel === 'hora' 
                  ? 'bg-[var(--color-secondary-container)] text-[var(--color-secondary)] border-[var(--color-secondary)]' 
                  : 'bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] border-[var(--color-outline)]/30'
              }`}
            >
              Por hora / Convenir
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-[var(--color-on-surface)]">
              Precio ($ USD o moneda local) *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-[var(--color-on-surface-variant)]">
                $
              </span>
              <input 
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25.00"
                className="w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/30 text-xs focus:outline-none focus:border-[var(--color-primary)] transition-colors font-semibold"
              />
            </div>
            <p className="text-[10px] text-[var(--color-on-surface-variant)] mt-1">
              Precio cerrado por unidad o paquete completo.
            </p>
          </div>
        </div>

        {/* Puntos de Entrega y Disponibilidad */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--color-outline)]/20 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">
            Punto de entrega y disponibilidad
          </h2>

          <div className="space-y-2">
            <label className="flex items-start gap-3 p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/20 cursor-pointer hover:border-[var(--color-primary)] transition-colors">
              <input 
                type="checkbox"
                checked={deliveryPoints.campus}
                onChange={(e) => setDeliveryPoints({...deliveryPoints, campus: e.target.checked})}
                className="mt-0.5 rounded text-[var(--color-primary)] focus:ring-0"
              />
              <div>
                <p className="text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[var(--color-primary)]">location_on</span> Entrega en campus universitario
                </p>
                <p className="text-[10px] text-[var(--color-on-surface-variant)]">Cafetería central, biblioteca o facultades principales.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/20 cursor-pointer hover:border-[var(--color-primary)] transition-colors">
              <input 
                type="checkbox"
                checked={deliveryPoints.virtual}
                onChange={(e) => setDeliveryPoints({...deliveryPoints, virtual: e.target.checked})}
                className="mt-0.5 rounded text-[var(--color-primary)] focus:ring-0"
              />
              <div>
                <p className="text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-purple-600">videocam</span> Modalidad Virtual (Google Meet / Zoom)
                </p>
                <p className="text-[10px] text-[var(--color-on-surface-variant)]">Ideal para asesorías, código y diseño digital.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline)]/20 cursor-pointer hover:border-[var(--color-primary)] transition-colors">
              <input 
                type="checkbox"
                checked={deliveryPoints.delivery}
                onChange={(e) => setDeliveryPoints({...deliveryPoints, delivery: e.target.checked})}
                className="mt-0.5 rounded text-[var(--color-primary)] focus:ring-0"
              />
              <div>
                <p className="text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-amber-600">home</span> Envío a domicilio local
                </p>
                <p className="text-[10px] text-[var(--color-on-surface-variant)]">Coordinado mediante mensajería externa.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Impulso de Confianza */}
        <div className="bg-[var(--color-secondary-container)]/40 border border-[var(--color-secondary)]/20 rounded-2xl p-3.5 flex items-start gap-3">
          <span className="material-symbols-outlined text-xl text-[var(--color-secondary)] shrink-0 mt-0.5">verified_user</span>
          <div className="text-xs">
            <p className="font-bold text-[var(--color-secondary)]">Impulso de Confianza CoMarketia</p>
            <p className="text-[var(--color-on-surface-variant)] mt-0.5">Tu perfil validará que eres estudiante activo de tu facultad para generar mayor credibilidad.</p>
          </div>
        </div>

        {/* Botones de Acción Finales (Usando Tertiary CTA como especifica la documentación) */}
        <div className="space-y-2.5 pt-2">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-[var(--color-tertiary,#a13800)] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <span>Publicando oferta...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">check</span>
                <span>Publicar en CoMarketia</span>
              </>
            )}
          </button>

          <button 
            type="button"
            onClick={onBack}
            className="w-full py-3 px-4 rounded-xl bg-white border border-[var(--color-outline)]/30 text-[var(--color-on-surface)] font-semibold text-xs hover:bg-[var(--color-surface)] transition-colors"
          >
            Guardar borrador
          </button>
        </div>

      </form>
    </div>
  );
}