import React from 'react';
import { Hero } from '../components/Hero';
import { DivisionsSection } from '../components/DivisionsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { InteractiveCabinCustomizer } from '../components/InteractiveCabinCustomizer';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { PageId } from '../components/Navbar';
import { ArrowRight, ShieldCheck, Wrench, FileText, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, COMPANY_INFO } from '../data/companyData';

interface HomePageProps {
  lang: 'en' | 'bn';
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
  onOpenEmergency: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onOpenQuote,
  onOpenEmergency,
}) => {
  return (
    <div className="space-y-0 bg-slate-950 text-slate-100">
      {/* 1. Hero Section with Ambient Glows & Interactive Counters */}
      <Hero
        lang={lang}
        onOpenQuote={onOpenQuote}
        onOpenEmergency={onOpenEmergency}
      />

      {/* 2. Core 4 Engineering Divisions */}
      <DivisionsSection
        lang={lang}
        onSelectCategory={() => onNavigate('products')}
      />

      {/* 4. Interactive Luxury Cabin Customizer Studio */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <InteractiveCabinCustomizer
          lang={lang}
          onSelectForQuote={onOpenQuote}
        />
      </section>

      {/* 5. DESANG Brand Spotlight - #1 Bestselling Elevator in Bangladesh */}
      <section className="py-16 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-950/80 border border-blue-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                    ★ #1 Bestseller in Bangladesh
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Official Sovereign Technology Flagship Distribution
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {lang === 'en'
                    ? 'DESANG Elevators — Proven Reliability Across Bangladesh'
                    : 'ডিজ্যাং (DESANG) লিফট — বাংলাদেশে সর্বাধিক বিক্রিত ও বিশ্বস্ত ব্র্যান্ড'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {lang === 'en'
                    ? 'DESANG is our premier bestselling elevator brand, trusted by leading corporate towers, commercial plazas, and residential apartments nationwide. Featuring advanced PMSM synchronous gearless traction, micro-smooth VVVF controllers, and 100% genuine replacement parts in our Dhaka central warehouse.'
                    : 'সাভরেইন টেকনোলজি লিমিটেডের সর্বাধিক বিক্রিত লিফট ব্র্যান্ড হলো ডিজ্যাং (DESANG)। আধুনিক পিএমএসএম গিয়ারলেস মোটর, বিদ্যুৎ সাশ্রয়ী ভিভিভিএফ কন্ট্রোলার এবং ঢাকায় সংরক্ষিত পর্যাপ্ত জেনুইন স্পেয়ার পার্টসের কারণে দেশের শীর্ষ ডেভেলপার ও প্রকৌশলীদের প্রথম পছন্দ ডিজ্যাং।'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-blue-400 block font-bold text-sm">40% Less Power</span>
                    <span className="text-[11px] text-slate-400">PMSM Eco Inverter</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-emerald-400 block font-bold text-sm">EN 81-20/50</span>
                    <span className="text-[11px] text-slate-400">European Safety</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-amber-400 block font-bold text-sm">ARD Standard</span>
                    <span className="text-[11px] text-slate-400">Auto Rescue Invariant</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="text-purple-400 block font-bold text-sm">1,000+ Running</span>
                    <span className="text-[11px] text-slate-400">Active in Bangladesh</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4">
                <button
                  onClick={() => onNavigate('products')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
                >
                  <span>{lang === 'en' ? 'Explore DESANG Lift Models' : 'ডিজ্যাং লিফট মডেলসমূহ দেখুন'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenQuote}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>{lang === 'en' ? 'Get DESANG Quotation' : 'ডিজ্যাং লিফটের কোটেশন নিন'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Flagship Equipment Showcase */}
      <section className="py-20 bg-slate-900 border-b border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                {lang === 'en' ? 'Flagship Models' : 'শীর্ষ মডেলসমূহ'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {lang === 'en' ? 'Engineered for Heavy Continuous Duty' : 'ভারী ও নিরবচ্ছিন্ন ব্যবহারের জন্য প্রস্তুত'}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>{lang === 'en' ? 'View Complete Catalog & Specs' : 'সকল মডেল ও স্পেসিফিকেশন দেখুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('products')}
                className="group rounded-3xl bg-slate-950 border border-slate-800 p-6 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 rounded-2xl overflow-hidden mb-5 bg-slate-900 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-md text-[10px] font-mono text-slate-300 border border-slate-800">
                      {item.standards[0]}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-blue-400 mb-1">
                    {item.specs[0].value.split('(')[0]}
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {lang === 'en' ? item.title : item.titleBn}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {lang === 'en' ? item.shortDesc : item.shortDescBn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:underline">
                  <span>{lang === 'en' ? 'Inspect Technical Blueprint' : 'স্পেসিফিকেশন দেখুন'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Landmark Projects in Bangladesh */}
      <ProjectsSection lang={lang} />

      {/* 7. Our Partners & Alliances - News Bulletin Style Marquee */}
      <PartnersMarquee lang={lang} />

      {/* 8. Action Banner */}
      <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 text-slate-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'en'
              ? 'Ready to Engineer Your Next Tower or Industrial Facility?'
              : 'নতুন লিফট বা ওয়্যারহাউস প্রকল্প শুরু করতে প্রস্তুত?'}
          </h3>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Our chief engineering team at Twin Brooks, Baridhara provides comprehensive architectural hoistway audits, BNBC load calculations, and turnkey supply across Bangladesh.'
              : 'আমাদের অভিজ্ঞ ইঞ্জিনিয়ার দল সাইট ভিজিট, আর্কিটেকচারাল শ্যাফট অডিট ও টেকনিক্যাল কনফিগারেশনে পূর্ণাঙ্গ সহায়তা দিতে প্রস্তুত।'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('specifications')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'en' ? 'Open Engineering RFQ Configurator' : 'কোটেশন ক্যালকুলেটরে যান'}</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Speak with Baridhara Office' : 'বারিধারা হেড অফিসে যোগাযোগ'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
