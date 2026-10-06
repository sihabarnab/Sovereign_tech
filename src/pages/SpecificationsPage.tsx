import React, { useState } from 'react';
import { CatalogSection } from '../components/CatalogSection';
import { QuoteEstimator } from '../components/QuoteEstimator';
import { EquipmentProduct, PRODUCTS } from '../data/companyData';
import { Ruler, ShieldCheck, Download, Calculator, CheckCircle2 } from 'lucide-react';

interface SpecificationsPageProps {
  lang: 'en' | 'bn';
  onOpenProductModal: (product: EquipmentProduct) => void;
}

export const SpecificationsPage: React.FC<SpecificationsPageProps> = ({
  lang,
  onOpenProductModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'elevators' | 'racking' | 'automation' | 'construction'>('all');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<EquipmentProduct | null>(null);

  // Quick Technical Dimension Standards Table for Engineers (BNBC / EN 81-20 Reference)
  const elevatorStandardTolerances = [
    { capacity: '450 kg (6 Persons)', speed: '1.0 - 1.6 m/s', carSize: '1000 × 1250 mm', shaftSize: '1650 × 1650 mm', pit: '1400 mm', overhead: '4200 mm' },
    { capacity: '630 kg (8 Persons)', speed: '1.0 - 1.75 m/s', carSize: '1100 × 1400 mm', shaftSize: '1800 × 1850 mm', pit: '1450 mm', overhead: '4300 mm' },
    { capacity: '800 kg (10 Persons)', speed: '1.0 - 2.0 m/s', carSize: '1350 × 1400 mm', shaftSize: '2000 × 1900 mm', pit: '1500 mm', overhead: '4400 mm' },
    { capacity: '1000 kg (13 Persons)', speed: '1.5 - 2.5 m/s', carSize: '1600 × 1400 mm', shaftSize: '2150 × 2000 mm', pit: '1600 mm', overhead: '4500 mm' },
    { capacity: '1600 kg (Hospital Bed)', speed: '1.0 - 1.75 m/s', carSize: '1400 × 2400 mm', shaftSize: '2200 × 2900 mm', pit: '1500 mm', overhead: '4400 mm' },
    { capacity: '2000 kg (Heavy Cargo)', speed: '0.5 - 1.0 m/s', carSize: '1800 × 2600 mm', shaftSize: '2600 × 3100 mm', pit: '1600 mm', overhead: '4500 mm' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Specifications Header */}
      <section className="py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <Ruler className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Engineering Knowledge & Catalog' : 'ইঞ্জিনিয়ারিং স্পেসিফিকেশন ও আর্কিটেকচারাল গাইড'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {lang === 'en'
                ? 'Technical Specifications & Engineering Blueprints'
                : 'টেকনিক্যাল স্পেসিফিকেশন ও আর্কিটেকচারাল ব্লু-প্রিন্ট'}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'en'
                ? 'Explore detailed dimensional drawings, payload capacities, structural hoistway tolerances, and electrical power consumption ratings conforming to European EN 81-20 and Bangladesh BNBC standards.'
                : 'ইউরোপীয় EN 81-20 ও বাংলাদেশ BNBC স্ট্যান্ডার্ড অনুসারে অনুমোদিত সকল লিফট, র‍্যাকিং ও অটোমেশন ইকুইপমেন্টের নির্ভুল পরিমাপ এবং কারিগরি তথ্য।'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Catalog Section */}
      <CatalogSection
        lang={lang}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onOpenProductModal={onOpenProductModal}
        onSelectProductForQuote={(prod) => {
          setSelectedProductForQuote(prod);
          const el = document.getElementById('spec-calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Architectural Reference Table for Civil Engineers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              {lang === 'en' ? 'Architectural Shaft Design Guide' : 'আর্কিটেকচারাল শ্যাফট ডিজাইন গাইড'}
            </div>
            <h3 className="text-2xl font-bold text-white">
              {lang === 'en' ? 'Civil Hoistway Dimensions & Clearances (BNBC Standard)' : 'লিফট শ্যাফট ও পিট মেজারমেন্ট নির্দেশিকা'}
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            BNBC Chapter 5 / EN 81 Compliant
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold font-sans">Rated Capacity</th>
                  <th className="py-3.5 px-4 font-semibold font-sans">Speed Range</th>
                  <th className="py-3.5 px-4 font-semibold font-sans">Car Internal (W × D)</th>
                  <th className="py-3.5 px-4 font-semibold font-sans">Shaft Clear (W × D)</th>
                  <th className="py-3.5 px-4 font-semibold font-sans">Min Pit Depth</th>
                  <th className="py-3.5 px-4 font-semibold font-sans">Overhead Height</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {elevatorStandardTolerances.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white font-sans">{row.capacity}</td>
                    <td className="py-3 px-4 text-blue-400">{row.speed}</td>
                    <td className="py-3 px-4">{row.carSize}</td>
                    <td className="py-3 px-4 text-emerald-300">{row.shaftSize}</td>
                    <td className="py-3 px-4">{row.pit}</td>
                    <td className="py-3 px-4">{row.overhead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans">
            <span>* Custom machine room or Machine-Room-Less (MRL) configurations can be tailored to tighter shaft constraints.</span>
            <span className="font-mono text-slate-500">Document Rev: ST-SPEC-2026</span>
          </div>
        </div>
      </section>

      {/* Live Engineering RFQ Configurator on the same page */}
      <div id="spec-calculator">
        <QuoteEstimator
          lang={lang}
          preSelectedProduct={selectedProductForQuote}
        />
      </div>
    </div>
  );
};
