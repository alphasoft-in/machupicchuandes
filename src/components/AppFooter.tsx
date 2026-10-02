import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6';

export default function AppFooter({ lang }: { lang: 'en' | 'es' }) {
  const isEn = lang === 'en';
  
  return (
    <div className="bg-[#01324c] text-white border-t border-[#166797] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4 space-y-5">
            <a href={`/${lang}/`} className="flex items-center no-underline inline-block group mb-2">
              <span className="font-outfit font-black text-2xl text-amber-500 tracking-tighter">MACHU PICCHU<br/><span className="text-white text-lg">ANDES MARATHON</span></span>
            </a>
            <p className="text-sm text-slate-200 leading-relaxed font-light">
              {isEn 
                ? "Official licensed direct mountaineering operator based in Cusco, Peru. We design high-altitude private adventures and glamping tours while ensuring fair wages and dignity for our native porters through the Ayni Philosophy."
                : "Operador directo autorizado con base en Cusco, Perú. Diseñamos aventuras privadas de alta montaña y glamping asegurando salarios justos y dignidad para nuestros porteadores mediante la filosofía Ayni."}
            </p>
            <div className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl bg-[#01324c] text-amber-400 text-xs font-bold border border-[#166797] shadow-sm">
              <span>DIRCETUR Official Tour Operator License</span>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-outfit font-black text-xs uppercase tracking-wider text-amber-500 m-0 border-l-2 border-amber-500 pl-2">
              {isEn ? "Trek Collections" : "Colecciones"}
            </h4>
            <ul className="space-y-2.5 p-0 m-0 list-none text-sm text-slate-200">
              <li><a href={`/${lang}/`} className="hover:text-amber-500 font-medium transition-colors no-underline block">{isEn ? "Inca Trail Expeditions 4D/3N" : "Expediciones Camino Inca 4D"}</a></li>
              <li><a href={`/${lang}/`} className="hover:text-amber-500 font-medium transition-colors no-underline block">{isEn ? "Salkantay & High Glaciers" : "Salkantay y Glaciares"}</a></li>
              <li><a href={`/${lang}/`} className="hover:text-amber-500 font-medium transition-colors no-underline block">{isEn ? "VIP Glamping & Luxury Tours" : "VIP Glamping"}</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-outfit font-black text-xs uppercase tracking-wider text-amber-500 m-0 border-l-2 border-amber-500 pl-2">
              {isEn ? "Our Standard" : "Nuestro Estándar"}
            </h4>
            <ul className="space-y-2.5 p-0 m-0 list-none text-sm text-slate-200">
              <li><a href={`/${lang}/ayni-project`} className="hover:text-amber-500 font-medium transition-colors no-underline block">{isEn ? "Ayni Sherpa Project" : "Proyecto Ayni Sherpa"}</a></li>
              <li><a href={`/${lang}/`} className="hover:text-amber-500 font-medium transition-colors no-underline block">{isEn ? "Why Book Direct" : "Por Qué Reservar Directo"}</a></li>
            </ul>
          </div>
          <div className="lg:col-span-3 space-y-4 text-sm text-slate-200">
            <h4 className="font-outfit font-black text-xs uppercase tracking-wider text-amber-500 m-0 border-l-2 border-amber-500 pl-2">
              {isEn ? "Cusco Office Direct" : "Oficina Cusco"}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <span>📍 Cusco Historic Center, Kingdom of the Incas, Peru</span>
              </div>
              <div className="flex items-center gap-2.5">
                <a href="https://wa.me/51993187203" target="_blank" rel="noopener noreferrer" className="text-white font-extrabold no-underline hover:text-amber-500 transition-colors">📱 +51 993 187 203</a>
              </div>
              <div className="flex items-center gap-2.5">
                <span>✉️ info@machupicchuandes.com</span>
              </div>
              <div className="flex items-center gap-3 pt-3">
                <a href="https://www.facebook.com/andesmarathonmachupicchu" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-500 hover:-translate-y-1 flex items-center justify-center transition-all">
                  <FaFacebookF className="w-4 h-4 text-white" />
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-500 hover:-translate-y-1 flex items-center justify-center transition-all">
                  <FaInstagram className="w-4 h-4 text-white" />
                </a>
                <a href="#" aria-label="TikTok" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-500 hover:-translate-y-1 flex items-center justify-center transition-all">
                  <FaTiktok className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-[#166797]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p className="m-0 text-center sm:text-left font-normal">© 2026 Machu Picchu Andes Marathon E.I.R.L. All rights reserved. Official Direct Cusco Operator.</p>
          <div className="flex items-center gap-4 font-outfit font-extrabold uppercase text-[11px]">
            <span className="text-amber-500 flex items-center gap-1">🏔️ 100% Local Cusco Enterprise</span>
          </div>
        </div>
      </div>
    </div>
  );
}
