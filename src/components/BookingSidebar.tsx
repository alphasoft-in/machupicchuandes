import React, { useState } from 'react';

interface BookingSidebarProps {
  tourTitle: string;
  duration: string;
  category: string;
  lang: 'en' | 'es';
}

export default function BookingSidebar({ tourTitle, duration, category, lang }: BookingSidebarProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const texts = {
    en: {
      book: "Book This Expedition",
      subtitle: "Direct operator permits • No intermediaries",
      startDate: "Start Date",
      endDate: "End Date",
      adults: "Adults",
      children: "Children",
      btn: "CHECK LIVE DATES",
      footer: "Speak instantly with our Cusco concierge",
      hello: "Hello! I would like to check availability for",
      start: "Start",
      end: "End"
    },
    es: {
      book: "Reserva Esta Expedición",
      subtitle: "Permisos directos del operador • Sin intermediarios",
      startDate: "Fecha de inicio",
      endDate: "Fecha de fin",
      adults: "Adultos",
      children: "Niños",
      btn: "CONSULTAR FECHAS",
      footer: "Habla al instante con nuestro concierge en Cusco",
      hello: "¡Hola! Me gustaría consultar la disponibilidad de",
      start: "Inicio",
      end: "Fin"
    }
  };

  const t = texts[lang] || texts.en;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `${t.hello} *${tourTitle}*.\n\n${t.start}: ${startDate}\n${t.end}: ${endDate}\n${t.adults}: ${adults}\n${t.children}: ${children}`;
    const url = `https://wa.me/51993187203?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="lg:sticky lg:top-28 bg-white rounded-3xl shadow-2xl p-6 lg:p-7 border border-gray-100">
      <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-2">{t.book}</h3>
      <p className="text-sm text-gray-500 mb-6 border-b pb-5">{t.subtitle}</p>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-sm font-medium">{duration}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-sm font-medium">{category}</span>
        </div>
      </div>

      <form onSubmit={handleBooking} className="space-y-4 mb-4">
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">{t.startDate}</label>
            <input required type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border" />
        </div>
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">{t.endDate}</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.adults}</label>
                <input required type="number" min="1" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border" />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t.children}</label>
                <input type="number" min="0" value={children} onChange={(e) => setChildren(parseInt(e.target.value))} className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 p-2 border" />
            </div>
        </div>
        
        <button type="submit" className="w-full flex items-center justify-center bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mt-2 whitespace-nowrap">
          {t.btn}
          <svg className="w-4 h-4 ml-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </form>
      
      <p className="text-xs text-center text-gray-400">{t.footer}</p>
    </div>
  );
}
