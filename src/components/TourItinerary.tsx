import React, { useState } from 'react';

interface DayPlan {
  day: number;
  title: string;
  details: string;
  highlights: string[];
}

interface TourItineraryProps {
  days: DayPlan[];
  lang: 'en' | 'es';
}

export default function TourItinerary({ days, lang }: TourItineraryProps) {
  const [openDay, setOpenDay] = useState<number>(1);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="flex flex-col gap-4">
        {days.map((d) => (
          <div 
            key={d.day} 
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openDay === d.day ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)] bg-white' : 'border-gray-200 bg-gray-50 hover:border-amber-300'}`}
          >
            <button 
              onClick={() => setOpenDay(openDay === d.day ? 0 : d.day)}
              className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <span className={`font-outfit font-black text-xl md:text-2xl min-w-[80px] text-left transition-colors ${openDay === d.day ? 'text-amber-500' : 'text-slate-400'}`}>
                  {lang === 'en' ? 'Day' : 'Día'} {d.day}
                </span>
                <h3 className={`font-outfit font-bold text-lg md:text-xl text-left transition-colors ${openDay === d.day ? 'text-slate-900' : 'text-slate-700'}`}>
                  {d.title}
                </h3>
              </div>
              <div className={`transform transition-transform duration-300 ${openDay === d.day ? 'rotate-180' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={openDay === d.day ? 'text-amber-500' : 'text-slate-400'}><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden`}
              style={{ maxHeight: openDay === d.day ? '1000px' : '0px', opacity: openDay === d.day ? 1 : 0 }}
            >
              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                <p className="text-slate-600 font-sans leading-relaxed mb-6 text-lg">
                  {d.details}
                </p>
                <div>
                  <h4 className="font-outfit font-bold text-slate-900 mb-3 uppercase tracking-wider text-sm text-amber-600">
                    {lang === 'en' ? 'Highlights' : 'Destacados'}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {d.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 font-sans text-sm">
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
