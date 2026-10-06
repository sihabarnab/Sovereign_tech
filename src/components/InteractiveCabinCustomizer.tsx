import React, { useState } from 'react';
import { Sparkles, Shield, Check, ArrowRight } from 'lucide-react';

interface InteractiveCabinCustomizerProps {
  lang: 'en' | 'bn';
  onSelectForQuote: () => void;
}

export const InteractiveCabinCustomizer: React.FC<InteractiveCabinCustomizerProps> = ({
  lang,
  onSelectForQuote,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<'hairline' | 'titanium' | 'panoramic' | 'medical'>('titanium');

  const cabinStyles = [
    {
      id: 'hairline' as const,
      name: 'Hairline Stainless Steel',
      nameBn: 'হেয়ারলাইন স্টেইনলেস স্টিল',
      tag: 'Commercial & High Traffic',
      colorClass: 'from-slate-700 via-slate-600 to-slate-800',
      accentColor: 'text-slate-300',
      borderAccent: 'border-slate-500',
      image: '/src/assets/images/sovereign_hero_elevator_1791261082914.jpg',
      specs: {
        material: 'SUS304 1.5mm Hairline Sheet',
        ceiling: 'Mirror SS Frame + Acrylic Concealed LED',
        floor: 'Wear-Resistant PVC Granite or Natural Marble',
        handrail: 'Round Stainless Steel Single Bar',
      },
      benefits: 'Anti-scratch surface, effortless maintenance, 30+ year lifespan.',
      benefitsBn: 'স্ক্র্যাচ-প্রতিরোধী, সহজ রক্ষণাবেক্ষণ এবং ৩০+ বছরের স্থায়ীত্ব।',
    },
    {
      id: 'titanium' as const,
      name: 'Titanium Gold Mirror',
      nameBn: 'টাইটানিয়াম গোল্ড মিরর',
      tag: 'Luxury Corporate & Prestige',
      colorClass: 'from-amber-700 via-yellow-600 to-amber-900',
      accentColor: 'text-amber-300',
      borderAccent: 'border-amber-500',
      image: '/src/assets/images/sovereign_hero_elevator_1791261082914.jpg',
      specs: {
        material: 'Titanium Gold PVD Vacuum Coated Stainless',
        ceiling: 'Golden Mirror Etched Stainless with Warm LED',
        floor: 'Polished Imperial Marble Inlay',
        handrail: 'Gold PVD Cylindrical Heavy Handrails',
      },
      benefits: 'High-end prestigious aesthetic for corporate headquarters and hotels.',
      benefitsBn: 'কর্পোরেট হেডকোয়ার্টার ও তারকা হোটেলের জন্য রাজকীয় আভিজাত্য।',
    },
    {
      id: 'panoramic' as const,
      name: 'Full Panoramic Curved Glass',
      nameBn: 'প্যানোরামিক কার্ভড গ্লাস',
      tag: 'Atriums & Observation Towers',
      colorClass: 'from-blue-700 via-indigo-600 to-cyan-800',
      accentColor: 'text-cyan-300',
      borderAccent: 'border-cyan-500',
      image: '/src/assets/images/sovereign_hero_elevator_1791261082914.jpg',
      specs: {
        material: '10mm+10mm Toughened Acoustic Laminated Glass',
        ceiling: 'Minimalist Stainless Halo Frame with Ambient Dome',
        floor: 'Composite High-Grip Architectural Flooring',
        handrail: 'Curved Stainless Steel Safety Rail',
      },
      benefits: '360° scenic visibility, maximum natural architectural light.',
      benefitsBn: '৩৬০° ভিউ, প্রাকৃতিক আলো এবং দৃষ্টিনন্দন আর্কিটেকচারাল সৌন্দর্য।',
    },
    {
      id: 'medical' as const,
      name: 'Medical Cleanroom Antibacterial',
      nameBn: 'মেডিকেল ক্লিনরুম অ্যান্টিব্যাকটেরিয়াল',
      tag: 'Hospitals & Healthcare Centers',
      colorClass: 'from-emerald-700 via-teal-600 to-slate-800',
      accentColor: 'text-emerald-300',
      borderAccent: 'border-emerald-500',
      image: '/src/assets/images/sovereign_hero_elevator_1791261082914.jpg',
      specs: {
        material: 'Antibacterial Electrolytic Zinc / SUS316 Stainless',
        ceiling: 'Medical Grade Clean Air Filter & UV-C Disinfection',
        floor: 'Seamless Antibacterial Vinyl Roll with Coved Skirting',
        handrail: 'Smooth Ergonomic Antimicrobial Handrails',
      },
      benefits: 'Zero-seam hygiene, stretcher-friendly bumper guards, smooth stop.',
      benefitsBn: 'রোগীর সুবিধার্থে বাম্পার গার্ড, অতি-মসৃণ ট্রাভেল ও সম্পূর্ণ জীবাণুমুক্ত।',
    },
  ];

  const current = cabinStyles.find((s) => s.id === selectedStyle) || cabinStyles[1];

  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background illumination matching selected finish */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Cabin Architecture Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {lang === 'en' ? 'Interactive Cabin Finishes & Customizer' : 'ইন্টারেক্টিভ লিফট কেবিন কাস্টমাইজেশন'}
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          European EN 81-70 Standard Finishes
        </span>
      </div>

      {/* Style Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-6 relative z-10">
        {cabinStyles.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? `bg-slate-950 ${style.borderAccent} shadow-lg ring-1 ring-blue-500/50`
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950/90'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                {style.tag}
              </div>
              <div className="text-xs font-bold text-white mb-2">
                {lang === 'en' ? style.name : style.nameBn}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${style.colorClass}`} />
                <span className={isSelected ? 'text-white font-medium' : 'text-slate-500'}>
                  {isSelected ? 'Selected' : 'Select'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative z-10">
        {/* Left: Visual Preview Container */}
        <div className="lg:col-span-5 relative h-72 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
          <img
            src={current.image}
            alt={current.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Floating Finish Badge */}
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>{lang === 'en' ? current.name : current.nameBn}</span>
              <span className={`text-[11px] font-mono font-semibold ${current.accentColor}`}>
                Active Preset
              </span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              {lang === 'en' ? current.benefits : current.benefitsBn}
            </div>
          </div>
        </div>

        {/* Right: Technical Blueprint Specifications */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
              Material Invariants & Engineering Tolerances
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Wall Panel:</span>
                <span className="font-semibold text-slate-200">{current.specs.material}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Ceiling Fixture:</span>
                <span className="font-semibold text-slate-200">{current.specs.ceiling}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Flooring Spec:</span>
                <span className="font-semibold text-slate-200">{current.specs.floor}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Handrail & COP:</span>
                <span className="font-semibold text-slate-200">{current.specs.handrail}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Full sample swatches available at Baridhara HQ</span>
            </div>

            <button
              onClick={onSelectForQuote}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
            >
              <span>{lang === 'en' ? 'Get Price for this Finish' : 'এই ফিনিশের কোটেশন নিন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
