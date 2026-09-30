import React, { useState } from 'react';
import { tours } from '../data/tours';

interface ToursListProps {
  lang: 'en' | 'es';
}

const getTabs = (lang: 'en' | 'es') => {
  if (lang === 'en') {
    return [
      { id: 'all', label: 'All Expeditions' },
      { id: 'inca-trail', label: 'Inca Trail' },
      { id: 'salkantay', label: 'Salkantay Trek' },
      { id: 'luxury', label: 'Luxury & VIP' },
      { id: 'day-tours', label: 'Day Escapes' },
      { id: 'alternatives', label: 'Alternative Treks' }
    ];
  }
  return [
    { id: 'all', label: 'Todas las Expediciones' },
    { id: 'inca-trail', label: 'Camino Inca' },
    { id: 'salkantay', label: 'Trek Salkantay' },
    { id: 'luxury', label: 'Lujo y VIP' },
    { id: 'day-tours', label: 'Full Days' },
    { id: 'alternatives', label: 'Treks Alternativos' }
  ];
};

const categorizeTour = (id: string, category: string) => {
  const loweredId = id.toLowerCase();
  const loweredCat = category.toLowerCase();
  
  if (loweredCat.includes('luxury') || loweredCat.includes('vip') || loweredCat.includes('lujo') || loweredId.includes('luxury') || loweredId.includes('vip')) return 'luxury';
  if (loweredId.includes('inca-trail') || loweredId.includes('inca')) return 'inca-trail';
  if (loweredId.includes('salkantay')) return 'salkantay';
  if (loweredId.includes('1-day') || loweredId.includes('1d') || loweredId.includes('half-day') || loweredId.includes('city') || loweredId.includes('valley') || loweredId.includes('lake') || loweredId.includes('rainbow') || loweredId.includes('maras')) return 'day-tours';
  return 'alternatives'; // Choquequirao, Ausangate, Lares, etc.
};

export default function ToursList({ lang }: ToursListProps) {
  const data = tours[lang];
  const tabs = getTabs(lang);
  const [activeTab, setActiveTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredTours = activeTab === 'all' 
    ? data 
    : data.filter(tour => categorizeTour(tour.id, tour.category) === activeTab);

  const visibleTours = filteredTours.slice(0, visibleCount);

  return (
    <section id="tours" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
            {lang === 'en' ? 'Our Signature Packages' : 'Nuestros Paquetes Exclusivos'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'en' 
              ? 'Explore our comprehensive list of extreme and luxury mountain expeditions, organized just for you.'
              : 'Explora nuestra lista completa de expediciones de montaña extremas y de lujo, organizadas para ti.'}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setVisibleCount(12);
              }}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 -translate-y-1'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tours Grid with fade animation on tab change */}
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in-up">
          {visibleTours.map((tour) => (
            <div key={tour.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col">
              <div className="relative h-64 overflow-hidden shrink-0">
                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
                  {tour.category}
                </div>
                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  {tour.duration}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {tour.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                  {tour.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-2">
                  <a href={`/${lang}/tours/${tour.id}`} className="flex-1 flex justify-center items-center py-2.5 px-4 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-xl transition-all">
                    {lang === 'en' ? 'Details' : 'Detalles'}
                  </a>
                  <a href={`https://wa.me/51993187203?text=${encodeURIComponent(lang === 'en' ? `Hi! I would like more information about the "${tour.title}" tour.` : `¡Hola! Me gustaría recibir más información sobre el tour "${tour.title}".`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center py-2.5 px-4 bg-[#25D366] hover:bg-[#20b858] text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-xl transition-all shadow-md shadow-[#25D366]/30">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTours.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {lang === 'en' ? 'No tours found in this category.' : 'No se encontraron paquetes en esta categoría.'}
          </div>
        )}

        {visibleCount < filteredTours.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-amber-500/30"
            >
              {lang === 'en' ? 'Load More' : 'Ver Más Programas'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
