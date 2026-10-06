import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, Zap, Activity } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { InteractiveStatCounter } from './InteractiveStatCounter';

interface HeroProps {
  lang: 'en' | 'bn';
  onOpenQuote: () => void;
  onOpenEmergency: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenQuote,
  onOpenEmergency,
}) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* Trust Kicker - Clean unboxed text with subtle typographic separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-400 mb-6">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>ESTD 1995</span>
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Twin Brooks, Baridhara, Dhaka</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-amber-400 font-bold">Authorized Distributor of DESANG Elevators</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Propositions */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              {lang === 'en' ? (
                <>
                  Engineering High-Speed Motion, Logistics & Building Automation.
                </>
              ) : (
                <>
                  বাংলাদেশে অত্যাধুনিক লিফট, ওয়্যারহাউস র‍্যাকিং ও বিল্ডিং অটোমেশন সমাধান।
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {lang === 'en' ? (
                <>
                  Since 1995, Sovereign Technology Ltd. has delivered turnkey engineering, European-standard import, and 24/7 lifecycle maintenance for high-speed elevators, escalators, heavy-duty industrial racking, and optical security gates.
                </>
              ) : (
                <>
                  ১৯৯৫ সাল থেকে সাভরেইন টেকনোলজি লিমিটেড বাংলাদেশে উচ্চমানের লিফট, এসকেলেটর, ভারী শিল্প ওয়্যারহাউস র‍্যাকিং এবং স্মার্ট বিল্ডিং অটোমেশন সরবরাহে বিশ্বস্ত অংশীদার হিসেবে কাজ করছে।
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                <span>{lang === 'en' ? 'Configure & Request Quote' : 'স্পেসিফিকেশন ও কোটেশন রিকোয়েস্ট'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenEmergency}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all active:scale-[0.98]"
              >
                <PhoneCall className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{lang === 'en' ? '24/7 Breakdown Dispatch' : '২৪/৭ ব্রেকডাউন সাপোর্ট'}</span>
              </button>
            </div>

            {/* Interactive Metrics Counter Bar */}
            <div className="pt-6 border-t border-slate-800/80">
              <InteractiveStatCounter lang={lang} />
            </div>
          </div>

          {/* Right Column: Architectural Visual Asset Card with Live Status Overlays */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src="/src/assets/images/sovereign_hero_elevator_1791261082914.jpg"
                alt="Sovereign Technology Panoramic Elevator Installation"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-[480px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Live Telemetry Badge Top Right */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-emerald-400 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>99.9% FLEET UPTIME</span>
              </div>

              {/* Verified Overlay Caption */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs shadow-2xl">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>DESANG Precision Lift Series</span>
                  <span className="text-emerald-400 font-mono text-[11px]">EN 81-20 / BNBC</span>
                </div>
                <div className="text-slate-400 mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Official importer of DESANG high-speed elevators & escalators. Bangladesh’s top-selling elevator line with lifetime genuine spare parts support.'
                    : 'বাংলাদেশে সর্বাধিক বিক্রিত ডিজ্যাং (DESANG) হাই-স্পিড লিফট ও এসকেলেটরের অফিসিয়াল আমদানিকারক ও পরিবেশক।'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
