import React from 'react';
import { ArrowUpRight, Award, ShieldCheck } from 'lucide-react';
import { AUTHENTIC_CLIENTS, MAJOR_CLIENT_SECTORS } from '../data/companyData';

interface PartnersMarqueeProps {
  lang: 'en' | 'bn';
}

export const PartnersMarquee: React.FC<PartnersMarqueeProps> = ({ lang }) => {
  const authenticLogos = [
    { id: 1, logo: '/src/assets/images/clients/clients1.png', label: 'Government & Defense Client' },
    { id: 2, logo: '/src/assets/images/clients/clients2.png', label: 'Square Pharmaceuticals' },
    { id: 3, logo: '/src/assets/images/clients/clients3.png', label: 'Beximco Industrial' },
    { id: 4, logo: '/src/assets/images/clients/clients4.png', label: 'Public Works Department (PWD)' },
    { id: 5, logo: '/src/assets/images/clients/clients5.png', label: 'Apex & Ha-Meem Group' },
    { id: 6, logo: '/src/assets/images/clients/clients6.png', label: 'Acme & Incepta Healthcare' },
    { id: 7, logo: '/src/assets/images/clients/clients7.png', label: 'Palmal & Envoy Garments' },
    { id: 8, logo: '/src/assets/images/clients/clients8.png', label: 'Commercial Real Estate Towers' },
  ];

  // Repeat for continuous infinite scrolling
  const marqueeCards = [...authenticLogos, ...authenticLogos, ...authenticLogos];

  return (
    <section className="py-16 bg-slate-950 border-b border-slate-900 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block animate-pulse" />
              <span>{lang === 'en' ? 'Our Major Clients & Projects' : 'আমাদের প্রধান ক্লায়েন্ট ও গ্রাহকবৃন্দ'}</span>
            </h3>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <span>{lang === 'en' ? '1,000+ Valued Clients Across Bangladesh' : '১০০০+ এরও বেশি সফল প্রকল্প ও ক্লায়েন্ট'}</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">Hover to pause</span>
          </div>
        </div>

        {/* Sectors Quick Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {MAJOR_CLIENT_SECTORS.map((sec, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'en' ? sec.title : sec.titleBn}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed truncate">
                {sec.clients.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track with Fade Shadows */}
      <div className="relative w-full overflow-hidden mt-2">
        {/* Left Edge Scrim */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Right Edge Scrim */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* Continuous Ticker */}
        <div className="animate-marquee py-3">
          {marqueeCards.map((client, index) => (
            <div
              key={index}
              className="mx-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all flex items-center justify-center shrink-0 shadow-lg hover:shadow-xl hover:scale-105 duration-300 min-w-[210px] h-[72px]"
            >
              <img
                src={client.logo}
                alt={client.label}
                className="max-h-10 w-auto object-contain transition-transform"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
