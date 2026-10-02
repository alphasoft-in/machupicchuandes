import React, { useState, useEffect } from 'react';
import { tours } from '../data/tours';

interface NavProps {
  lang: 'en' | 'es';
  currentPath?: string;
  switchUrl?: string;
}

const dict = {
  en: { 
    home: 'Home', 
    about: 'Our Standard', 
    ayni: 'Ayni Project',
    contact: 'Contact',
    treksTitle: 'Expeditions',
    categories: [
      { id: 'inca-trail', label: 'Inca Trail' },
      { id: 'salkantay', label: 'Salkantay & Glaciers' },
      { id: 'luxury', label: 'VIP & Luxury' },
      { id: 'day-tours', label: 'Day Escapes' },
      { id: 'alternatives', label: 'Hidden Valleys' }
    ]
  },
  es: { 
    home: 'Inicio', 
    about: 'Nuestro Estándar', 
    ayni: 'Proyecto Ayni',
    contact: 'Contacto',
    treksTitle: 'Expediciones',
    categories: [
      { id: 'inca-trail', label: 'Camino Inca' },
      { id: 'salkantay', label: 'Salkantay y Glaciares' },
      { id: 'luxury', label: 'VIP y Lujo' },
      { id: 'day-tours', label: 'Full Days' },
      { id: 'alternatives', label: 'Valles Ocultos' }
    ]
  },
};

const getToursByCategory = (lang: 'en' | 'es', catId: string) => {
  const all = tours[lang] || [];
  let filtered: typeof all = [];
  if (catId === 'inca-trail') filtered = all.filter(t => t.id.includes('inca') && t.category !== 'VIP');
  else if (catId === 'salkantay') filtered = all.filter(t => (t.id.includes('salkantay') || t.id.includes('ausangate')) && t.category !== 'VIP');
  else if (catId === 'luxury') filtered = all.filter(t => t.category === 'VIP');
  else if (catId === 'day-tours') filtered = all.filter(t => t.category === 'Express');
  else if (catId === 'alternatives') filtered = all.filter(t => !t.id.includes('inca') && !t.id.includes('salkantay') && !t.id.includes('ausangate') && t.category !== 'Express' && t.category !== 'VIP');
  
  // Return top 8 max to avoid massive menus
  return filtered.slice(0, 8);
};

export default function Navigation({ lang, currentPath, switchUrl }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpeditionsOpen, setMobileExpeditionsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  const t = dict[lang] || dict.en;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [mobileMenuOpen]);

  return (
    <>
    <nav className={`fixed w-full z-50 transition-all duration-300 ${(scrolled || mobileMenuOpen) ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href={`/${lang}`} className="flex items-center">
          <img 
            src="/images/logo machu picchu andes marathon.webp" 
            alt="Machu Picchu Andes Marathon Logo" 
            className={`h-12 w-auto transition-opacity duration-300 ${(scrolled || mobileMenuOpen) ? 'opacity-100' : 'opacity-90'}`}
          />
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href={`/${lang}`} className={`text-sm uppercase tracking-wider font-semibold hover:text-amber-500 transition-colors ${
            (currentPath === `/${lang}` || currentPath === `/${lang}/`) ? 'text-amber-500' : (scrolled ? 'text-gray-700' : 'text-gray-200')
          }`}>
            {t.home}
          </a>

          {/* Expeditions Dropdown */}
          <div className="relative group">
            <button className={`flex items-center text-sm uppercase tracking-wider font-semibold hover:text-amber-500 transition-colors ${
              (currentPath || '').includes('/tours/') ? 'text-amber-500' : (scrolled ? 'text-gray-700' : 'text-gray-200')
            }`}>
              {t.treksTitle}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100">
              <div className="py-2 bg-white rounded-xl shadow-xl border border-gray-100">
                {t.categories.map((cat) => {
                  const subTours = getToursByCategory(lang, cat.id);
                  return (
                    <div key={cat.id} className="relative group/sub">
                      <div className="flex items-center justify-between px-6 py-3 text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-default">
                        {cat.label}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                      
                      {/* Nested Submenu */}
                      {subTours.length > 0 && (
                        <div className="absolute top-0 left-full ml-1 w-72 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform -translate-x-2 group-hover/sub:translate-x-0">
                          <div className="py-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {subTours.map(tour => (
                              <a key={tour.id} href={`/${lang}/tours/${tour.id}`} className={`block px-6 py-3 text-sm font-medium hover:text-amber-600 hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-0 ${
                                currentPath === `/${lang}/tours/${tour.id}` ? 'text-amber-600 bg-amber-50/50' : 'text-gray-600'
                              }`}>
                                {tour.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <a href={`/${lang}/ayni-project`} className={`text-sm uppercase tracking-wider font-semibold hover:text-amber-500 transition-colors ${
            currentPath === `/${lang}/ayni-project` ? 'text-amber-500' : (scrolled ? 'text-gray-700' : 'text-gray-200')
          }`}>
            {t.ayni}
          </a>
          <a href={`/${lang}/about`} className={`text-sm uppercase tracking-wider font-semibold hover:text-amber-500 transition-colors ${
            currentPath === `/${lang}/about` ? 'text-amber-500' : (scrolled ? 'text-gray-700' : 'text-gray-200')
          }`}>
            {t.about}
          </a>
          <a href={`/${lang}/contact`} className={`text-sm uppercase tracking-wider font-semibold hover:text-amber-500 transition-colors ${
            currentPath === `/${lang}/contact` ? 'text-amber-500' : (scrolled ? 'text-gray-700' : 'text-gray-200')
          }`}>
            {t.contact}
          </a>

          <div className="flex space-x-4 border-l border-gray-400/50 pl-8 ml-8">
            <a href={lang === 'en' ? (currentPath || '/en') : (switchUrl || '/en')} className={`text-sm font-bold transition-colors ${lang === 'en' ? 'text-amber-500' : (scrolled ? 'text-gray-700 hover:text-amber-500' : 'text-white hover:text-amber-400')}`}>EN</a>
            <a href={lang === 'es' ? (currentPath || '/es') : (switchUrl || '/es')} className={`text-sm font-bold transition-colors ${lang === 'es' ? 'text-amber-500' : (scrolled ? 'text-gray-700 hover:text-amber-500' : 'text-white hover:text-amber-400')}`}>ES</a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 -mr-2 transition-colors ${(scrolled || mobileMenuOpen) ? 'text-gray-900' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>
    </nav>

    {/* Mobile Menu Fullscreen Overlay */}
    <div className={`md:hidden fixed inset-0 bg-white z-40 transition-all duration-300 flex flex-col ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-28 pb-12 px-6">
        <div className="space-y-6">
          <a href={`/${lang}`} className={`block text-lg font-bold ${
            (currentPath === `/${lang}` || currentPath === `/${lang}/`) ? 'text-amber-500' : 'text-slate-900'
          }`}>{t.home}</a>
          
          <div>
            <button 
              onClick={() => setMobileExpeditionsOpen(!mobileExpeditionsOpen)}
              className={`flex items-center justify-between w-full text-lg font-bold ${
                (currentPath || '').includes('/tours/') ? 'text-amber-500' : 'text-slate-900'
              }`}
            >
              {t.treksTitle}
              <svg className={`w-5 h-5 transition-transform ${mobileExpeditionsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`pl-2 space-y-4 overflow-hidden transition-all duration-300 ${mobileExpeditionsOpen ? 'max-h-[1500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
              {t.categories.map((cat, idx) => {
                const subTours = getToursByCategory(lang, cat.id);
                const isCatOpen = openCategory === cat.id;
                return (
                  <div key={cat.id} className={idx !== 0 ? "pt-4 border-t border-slate-100" : ""}>
                    <button 
                      onClick={() => setOpenCategory(isCatOpen ? null : cat.id)}
                      className="flex items-center justify-between w-full text-left py-2"
                    >
                      <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">{cat.label}</span>
                      <svg className={`w-4 h-4 text-slate-400 transition-transform ${isCatOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div className={`flex flex-col space-y-4 pl-2 overflow-hidden transition-all duration-300 ${isCatOpen ? 'max-h-[1000px] mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {subTours.map(tour => (
                        <a key={tour.id} href={`/${lang}/tours/${tour.id}`} className={`text-sm font-semibold hover:text-amber-500 leading-snug ${
                          currentPath === `/${lang}/tours/${tour.id}` ? 'text-amber-600' : 'text-slate-700'
                        }`}>
                          {tour.title}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <a href={`/${lang}/ayni-project`} className={`block text-lg font-bold ${
            currentPath === `/${lang}/ayni-project` ? 'text-amber-500' : 'text-slate-900'
          }`}>{t.ayni}</a>
          <a href={`/${lang}/about`} className={`block text-lg font-bold ${
            currentPath === `/${lang}/about` ? 'text-amber-500' : 'text-slate-900'
          }`}>{t.about}</a>
          <a href={`/${lang}/contact`} className={`block text-lg font-bold ${
            currentPath === `/${lang}/contact` ? 'text-amber-500' : 'text-slate-900'
          }`}>{t.contact}</a>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="flex space-x-8">
            <a href={lang === 'en' ? (currentPath || '/en') : (switchUrl || '/en')} className={`text-xl font-black ${lang === 'en' ? 'text-amber-500' : 'text-slate-400'}`}>EN</a>
            <a href={lang === 'es' ? (currentPath || '/es') : (switchUrl || '/es')} className={`text-xl font-black ${lang === 'es' ? 'text-amber-500' : 'text-slate-400'}`}>ES</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
