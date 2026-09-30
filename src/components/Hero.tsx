import React from 'react';

interface HeroProps {
  lang: 'en' | 'es';
}

const dict = {
  en: { 
    title: 'Machu Picchu Andes Marathon',
    subtitle: 'The Ultimate High Altitude Experience',
    cta: 'Discover the Route' 
  },
  es: { 
    title: 'Machu Picchu Andes Marathon',
    subtitle: 'La Máxima Experiencia de Alta Montaña',
    cta: 'Descubre la Ruta' 
  },
};

export default function Hero({ lang }: HeroProps) {
  const t = dict[lang];

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/40 to-gray-900/80" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center animate-fade-in-up">
        <span className="text-amber-400 text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-4 block">
          {t.subtitle}
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-['Playfair_Display'] font-bold leading-tight mb-8 text-shadow-lg">
          {t.title}
        </h1>
        <button className="group relative px-8 py-4 bg-amber-500 text-white text-sm uppercase tracking-widest font-semibold rounded-full overflow-hidden hover:bg-amber-600 transition-all shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] hover:-translate-y-1">
          <span className="relative z-10">{t.cta}</span>
        </button>
      </div>
    </div>
  );
}
