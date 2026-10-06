import React from 'react';
import { ArrowUpRight, Cpu, Layers, Warehouse, HardHat } from 'lucide-react';

interface DivisionsSectionProps {
  lang: 'en' | 'bn';
  onSelectCategory: (cat: 'elevators' | 'racking' | 'automation' | 'construction') => void;
}

export const DivisionsSection: React.FC<DivisionsSectionProps> = ({
  lang,
  onSelectCategory,
}) => {
  const divisions = [
    {
      id: 'elevators' as const,
      number: '01',
      title: 'Lifts, Elevators & Escalators',
      titleBn: 'লিফট, এলিভেটর ও এসকেলেটর',
      desc: 'Complete turnkey import, structural hoistway engineering, and maintenance for passenger, hospital bed, panoramic observation, and industrial freight elevators.',
      descBn: 'প্যাসেঞ্জার, হসপিটাল বেড, প্যানোরামিক ও হেভি কার্গো লিফটের পূর্ণাঙ্গ আমদানি, ইনস্টলেশন ও রক্ষণাবেক্ষণ।',
      image: '/src/assets/images/sovereign_hero_elevator_1791261082914.jpg',
      icon: Layers,
      highlight: '1.0 - 4.0 m/s PMSM Gearless',
      standards: 'EN 81-20 / BNBC / CE',
    },
    {
      id: 'racking' as const,
      number: '02',
      title: 'Warehouse Racking & Storage Systems',
      titleBn: 'ওয়্যারহাউস র‍্যাকিং ও স্টোরেজ সিস্টেম',
      desc: 'Engineered high-density selective pallet racks, drive-in systems, cantilever arms, and structural multi-tier mezzanine floors for Bangladesh industrial supply chains.',
      descBn: 'শিল্প কারখানার জন্য হেভি-ডিউটি সিলেক্টিভ প্যালেট র‍্যাক, ড্রাইভ-ইন সিস্টেম এবং মাল্টি-টিয়ার মেজানিন ফ্লোর।',
      image: '/src/assets/images/sovereign_warehouse_racking_1791261101506.jpg',
      icon: Warehouse,
      highlight: 'Up to 4,500 kg per beam level',
      standards: 'FEM 10.2.02 / ISO 9001',
    },
    {
      id: 'automation' as const,
      number: '03',
      title: 'Building Automation & Security Equipment',
      titleBn: 'বিল্ডিং অটোমেশন ও সিকিউরিটি ইকুইপমেন্ট',
      desc: 'Optical turnstile speed gates, biometric access control, smart BMS environmental control, high-speed boom barriers, and integrated commercial surveillance.',
      descBn: 'স্পিড গেট টার্নস্টাইল, বায়োমেট্রিক অ্যাকসেস কন্ট্রোল, অটোমেটিক পার্কিং ব্যারিয়ার ও সেন্ট্রালাইজড বিএমএস।',
      image: '/src/assets/images/sovereign_building_automation_1791261113252.jpg',
      icon: Cpu,
      highlight: '45 passes/min Speed Gates',
      standards: 'BACnet / Modbus / IP54',
    },
    {
      id: 'construction' as const,
      number: '04',
      title: 'Construction Equipment & Real-Estate Trading',
      titleBn: 'কনস্ট্রাকশন ইকুইপমেন্ট ও রিয়েল এস্টেট ট্রেডিং',
      desc: 'Heavy industrial construction hoists, modular scaffolding, site material handling apparatus, and commercial real-estate building material supply.',
      descBn: 'কনস্ট্রাকশন প্যাসেঞ্জার ও ম্যাটেরিয়াল হোইস্ট, হেভি মেশিনারিজ এবং বাণিজ্যিক রিয়েল এস্টেট ইকুইপমেন্ট।',
      image: '/src/assets/images/sovereign_corporate_facade_1791261124496.jpg',
      icon: HardHat,
      highlight: 'Industrial Hoists & Machinery',
      standards: 'AISC / Certified Safety',
    },
  ];

  return (
    <section id="divisions" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Core Engineering Divisions' : 'আমাদের প্রধান প্রকৌশল বিভাগসমূহ'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              {lang === 'en'
                ? 'Specialized Solutions for Infrastructure & Industry'
                : 'বাংলাদেশের শিল্প ও অবকাঠামো উন্নয়নের নির্ভরযোগ্য সমাধান'}
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            {lang === 'en'
              ? 'Backed by 30+ years of technical capability, certified engineering personnel, and an extensive inventory of genuine spare parts.'
              : '৩০ বছরেরও বেশি অভিজ্ঞতা, দক্ষ প্রকৌশলী দল এবং অরিজিনাল স্পেয়ার পার্টসের বিশাল মজুত নিয়ে প্রস্তুত সাভরেইন।'}
          </p>
        </div>

        {/* Bento Grid layout with asymmetric presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                onClick={() => onSelectCategory(div.id)}
                className="group relative rounded-2xl bg-slate-950/80 border border-slate-800/80 p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-lg"
              >
                {/* Background photo preview on hover with smooth opacity */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden pointer-events-none">
                  <img
                    src={div.image}
                    alt={div.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-950/80" />
                </div>

                <div className="relative z-10">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        {div.number}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-slate-700 group-hover:border-blue-400 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {lang === 'en' ? div.title : div.titleBn}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                    {lang === 'en' ? div.desc : div.descBn}
                  </p>
                </div>

                {/* Bottom Metadata - Clean unboxed text with typographic separators */}
                <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 font-medium">{div.highlight}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">{div.standards}</span>
                  </div>
                  <span className="text-blue-400 group-hover:underline text-xs font-medium">
                    {lang === 'en' ? 'Explore Models' : 'মডেলসমূহ দেখুন'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
