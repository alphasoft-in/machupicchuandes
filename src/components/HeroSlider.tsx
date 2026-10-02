import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
  lang: 'en' | 'es';
}

const slidesData = {
  en: [
    {
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=80',
      tag: 'Official Direct Operator in Cusco',
      title: 'Conquer the <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Andes</span>',
      text: 'The ultimate high-altitude experience. Premium Glamping, elite Sherpas, and 0% middlemen commissions.'
    },
    {
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2000&q=80',
      tag: 'The Salkantay Trek',
      title: 'Beyond the <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Clouds</span>',
      text: 'Hike through glacier mountains and descend into the lush Amazon cloud forest to reach Machu Picchu.'
    },
    {
      image: 'https://images.unsplash.com/photo-1517030833633-b1d55639d6dd?auto=format&fit=crop&w=2000&q=80',
      tag: 'Classic Inca Trail',
      title: 'Walk the <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Sacred Path</span>',
      text: 'Follow the original stone steps of the Incas. Fully portered, gourmet dining, and guaranteed departures.'
    }
  ],
  es: [
    {
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2000&q=80',
      tag: 'Operador Oficial Directo en Cusco',
      title: 'Conquista los <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Andes</span>',
      text: 'La máxima experiencia de alta montaña. Glamping Premium, Sherpas de élite y 0% de comisiones a intermediarios.'
    },
    {
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2000&q=80',
      tag: 'Trek Salkantay',
      title: 'Más allá de las <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Nubes</span>',
      text: 'Camina entre montañas glaciares y desciende al exuberante bosque nuboso amazónico para llegar a Machu Picchu.'
    },
    {
      image: 'https://images.unsplash.com/photo-1517030833633-b1d55639d6dd?auto=format&fit=crop&w=2000&q=80',
      tag: 'Camino Inca Clásico',
      title: 'Camina la <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Ruta Sagrada</span>',
      text: 'Sigue los escalones originales de los Incas. Servicio completo, comida gourmet y salidas garantizadas.'
    }
  ]
};

export default function HeroSlider({ lang }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = slidesData[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#01324c]">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image with slow zoom effect */}
            <div 
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#01324c]/80 via-[#0b3d59]/50 to-[#01324c]/90" />
            
            <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center h-full justify-center transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block py-1 px-3 mb-4 rounded-full bg-amber-500/20 text-amber-400 font-outfit font-bold tracking-widest uppercase text-[10px] sm:text-xs border border-amber-500/30 backdrop-blur-md">
                {slide.tag}
              </span>
              <h1 
                className="font-outfit font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-4 sm:mb-6 tracking-tight drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              <p className="font-sans text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-light drop-shadow-md">
                {slide.text}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#tours" className="px-6 py-3 md:px-8 md:py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-outfit font-extrabold uppercase text-xs md:text-sm tracking-wider rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] hover:-translate-y-1">
                  {lang === 'en' ? 'Explore Expeditions' : 'Explorar Expediciones'}
                </a>
                <a href="https://wa.me/51993187203" target="_blank" rel="noopener noreferrer" className="px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-outfit font-extrabold uppercase text-xs md:text-sm tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5"><path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.122.555 4.116 1.545 5.864L.048 23.518l5.856-1.537A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 11.999 0zm.006 21.954a9.924 9.924 0 0 1-5.076-1.391l-.364-.217-3.773.991 1.007-3.68-.238-.379a9.946 9.946 0 0 1-1.523-5.278c0-5.494 4.471-9.965 9.967-9.965 5.495 0 9.966 4.471 9.966 9.965 0 5.495-4.47 9.954-9.966 9.954zm5.457-7.447c-.299-.15-1.769-.873-2.043-.973-.274-.1-.474-.15-.673.15-.2.299-.773.972-.948 1.171-.174.2-.349.225-.648.075-.299-.15-1.261-.465-2.402-1.485-.888-.793-1.488-1.772-1.662-2.072-.175-.299-.019-.461.13-.611.135-.135.3-.349.45-.524.149-.174.2-.299.3-.498.1-.2.05-.374-.025-.524-.075-.15-.674-1.623-.923-2.222-.243-.585-.49-.506-.673-.515-.175-.008-.374-.008-.573-.008-.2 0-.524.075-.798.374-.274.3-1.047 1.023-1.047 2.494 0 1.472 1.072 2.894 1.222 3.094.15.2 2.112 3.224 5.118 4.521.716.309 1.275.494 1.709.632.72.23 1.376.198 1.894.12.578-.087 1.769-.723 2.018-1.422.249-.699.249-1.298.175-1.423-.075-.124-.274-.2-.573-.349z"></path></svg>
                  {lang === 'en' ? 'Contact Concierge' : 'Contactar Asesor'}
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* Stats Strip */}
      <div className="absolute bottom-0 left-0 w-full bg-slate-900/40 backdrop-blur-md border-t border-white/10 hidden md:block z-20">
        <div className="max-w-7xl mx-auto px-4 flex justify-between divide-x divide-white/10">
          <div className="flex-1 py-6 text-center">
            <span className="block font-outfit font-black text-3xl text-amber-400">10k+</span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">{lang === 'en' ? 'Happy Hikers' : 'Clientes Felices'}</span>
          </div>
          <div className="flex-1 py-6 text-center">
            <span className="block font-outfit font-black text-3xl text-emerald-400">100%</span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">{lang === 'en' ? 'Local Operator' : 'Operador Local'}</span>
          </div>
          <div className="flex-1 py-6 text-center">
            <span className="block font-outfit font-black text-3xl text-amber-400">5.0</span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">{lang === 'en' ? 'TripAdvisor Stars' : 'Estrellas TripAdvisor'}</span>
          </div>
          <div className="flex-1 py-6 text-center">
            <span className="block font-outfit font-black text-3xl text-blue-400">15+</span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">{lang === 'en' ? 'Years Experience' : 'Años de Experiencia'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 md:bottom-32 left-0 w-full flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/50 hover:bg-white'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-4 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-4 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </section>
  );
}
