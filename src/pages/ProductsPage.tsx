import React, { useState, useMemo } from 'react';
import {
  Search,
  FileText,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Filter,
  Layers,
  Wrench,
  Warehouse,
  HardHat,
  Cpu,
  Download
} from 'lucide-react';
import { PRODUCTS, EquipmentProduct, COMPANY_INFO } from '../data/companyData';
import { QuoteEstimator } from '../components/QuoteEstimator';

interface ProductsPageProps {
  lang: 'en' | 'bn';
  onOpenProductModal: (product: EquipmentProduct) => void;
  onNavigate: (page: 'home' | 'products' | 'about' | 'specifications' | 'contact') => void;
}

type ProductCategoryFilter = 'all' | 'elevators' | 'doors' | 'accessories' | 'racking' | 'security' | 'trading';

export const ProductsPage: React.FC<ProductsPageProps> = ({
  lang,
  onOpenProductModal,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryFilter>('all');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<'all' | 'desang' | 'sovereign'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [productForQuote, setProductForQuote] = useState<EquipmentProduct | null>(null);

  const categoryTabs: { id: ProductCategoryFilter; label: string; labelBn: string; count: number }[] = [
    {
      id: 'all',
      label: 'All Products',
      labelBn: 'সকল প্রোডাক্টস',
      count: PRODUCTS.length,
    },
    {
      id: 'elevators',
      label: 'DESANG Elevators & Escalators',
      labelBn: 'ডিজ্যাং লিফট ও এসকেলেটর',
      count: PRODUCTS.filter((p) => p.category === 'elevators').length,
    },
    {
      id: 'doors',
      label: 'Lift Doors & Cabin Models',
      labelBn: 'লিফট ডোর ও কেবিন',
      count: PRODUCTS.filter((p) => p.category === 'doors').length,
    },
    {
      id: 'accessories',
      label: 'Lift Accessories & Control Drives',
      labelBn: 'এক্সেসরিজ ও কন্ট্রোলার',
      count: PRODUCTS.filter((p) => p.category === 'accessories').length,
    },
    {
      id: 'racking',
      label: 'Warehouse Pallet Racking',
      labelBn: 'ওয়্যারহাউস র‍্যাকিং সিস্টেম',
      count: PRODUCTS.filter((p) => p.category === 'racking').length,
    },
    {
      id: 'security',
      label: 'Security & Automation',
      labelBn: 'সিকিউরিটি ও অটোমেশন',
      count: PRODUCTS.filter((p) => p.category === 'security').length,
    },
    {
      id: 'trading',
      label: 'Construction Equipment',
      labelBn: 'কনস্ট্রাকশন যন্ত্রপাতি',
      count: PRODUCTS.filter((p) => p.category === 'trading').length,
    },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // Brand match
      const matchesBrand =
        selectedBrandFilter === 'all' ||
        (selectedBrandFilter === 'desang' && (item.brand === 'DESANG' || item.title.includes('DESANG') || item.category === 'elevators' || item.category === 'doors')) ||
        (selectedBrandFilter === 'sovereign' && item.brand !== 'DESANG' && !item.title.includes('DESANG'));

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.titleBn.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.shortDescBn.toLowerCase().includes(q) ||
        item.standards.some((s) => s.toLowerCase().includes(q)) ||
        item.specs.some((sp) => sp.value.toLowerCase().includes(q) || sp.label.toLowerCase().includes(q));

      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [selectedCategory, selectedBrandFilter, searchQuery]);

  const handleSelectQuote = (product: EquipmentProduct) => {
    setProductForQuote(product);
    const quoteElement = document.getElementById('products-rfq-section');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
                  Official Sovereign Product Inventory
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  DESANG Lift — #1 Bestseller in BD
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {lang === 'en'
                  ? 'All Machinery & Equipment Catalog'
                  : 'সকল লিফট, র‍্যাকিং ও ইকুইপমেন্ট ক্যাটালগ'}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {lang === 'en'
                  ? 'Imported, certified, and engineered by Sovereign Technology Ltd. since 1995. Explore our complete range of DESANG elevators, heavy industrial freight lifts, automated doors, central control panels, high-density warehouse racking, and commercial security equipment.'
                  : '১৯৯৫ সাল থেকে সাভরেইন টেকনোলজি লিমিটেড কর্তৃক আমদানিকৃত ও সার্বক্ষণিক রক্ষণাবেক্ষণকৃত সকল যন্ত্রপাতি। বাংলাদেশে সর্বাধিক বিক্রিত ডিজ্যাং (DESANG) প্যাসেঞ্জার লিফট, হেভি কার্গো লিফট, ডোর মডেল, ওয়্যারহাউস র‍্যাকিং এবং সিকিউরিটি অটোমেশন।'}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0 text-left font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-blue-400 block font-bold text-lg">1,450+</span>
                <span className="text-[11px] text-slate-400">Units Installed</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-amber-400 block font-bold text-lg">DESANG</span>
                <span className="text-[11px] text-slate-400">Flagship Brand</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-emerald-400 block font-bold text-lg">EN 81 & BNBC</span>
                <span className="text-[11px] text-slate-400">100% Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Category Filter Navigation */}
      <section className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder={
                  lang === 'en'
                    ? 'Search products, models (DESANG, DSE-10), specs...'
                    : 'প্রোডাক্ট, মডেল (ডিজ্যাং, DSE-10), স্পেসিফিকেশন খুঁজুন...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Brand Filter Pill Switcher */}
            <div className="flex items-center gap-2 self-start md:self-auto text-xs">
              <span className="text-slate-400 font-medium">
                {lang === 'en' ? 'Brand Filter:' : 'ব্র্যান্ড:'}
              </span>
              <button
                onClick={() => setSelectedBrandFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedBrandFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lang === 'en' ? 'All Brands' : 'সব ব্র্যান্ড'}
              </button>
              <button
                onClick={() => setSelectedBrandFilter('desang')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                  selectedBrandFilter === 'desang'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-950 text-amber-400 hover:text-amber-300 border border-amber-500/30'
                }`}
              >
                <span>DESANG Only</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded">Top</span>
              </button>
              <button
                onClick={() => setSelectedBrandFilter('sovereign')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedBrandFilter === 'sovereign'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Sovereign Systems
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40 font-semibold'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                  }`}
                >
                  <span>{lang === 'en' ? tab.label : tab.labelBn}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DESANG Spotlight Notification Banner */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-blue-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>
                  {lang === 'en'
                    ? 'DESANG Elevators — Bangladesh’s #1 Choice for Modern Buildings'
                    : 'ডিজ্যাং (DESANG) লিফট — বাংলাদেশে সর্বাধিক বিক্রিত ও সর্বোচ্চ সমাদৃত ব্র্যান্ড'}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-bold">
                  Bestseller
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Over 1,000+ DESANG passenger, cargo, and bed elevators operating with 99.9% uptime. Complete inventory of spare parts and emergency maintenance teams stationed in Dhaka.'
                  : '১,০০০+ ডিজ্যাং লিফট বাংলাদেশে সফলভাবে চলমান। ঢাকায় সংরক্ষিত সার্বক্ষণিক জেনুইন পার্টস ও অভিজ্ঞ ইঞ্জিনিয়ারের সেবা।'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('elevators');
              setSelectedBrandFilter('desang');
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap self-stretch md:self-auto text-center"
          >
            {lang === 'en' ? 'View DESANG Elevators' : 'ডিজ্যাং লিফটসমূহ দেখুন'}
          </button>
        </div>
      </section>

      {/* 4. Products Grid */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
            <p className="text-slate-400 text-sm">
              {lang === 'en'
                ? 'No equipment matched your filters. Try clearing your search.'
                : 'আপনার ফিল্টারের সাথে কোনো প্রোডাক্ট মেলেনি। অনুগ্রহ করে সার্চ পরিবর্তন করুন।'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedBrandFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
            >
              {lang === 'en' ? 'Reset All Filters' : 'ফিল্টার রিসেট করুন'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isDesang =
                product.brand === 'DESANG' ||
                product.title.includes('DESANG') ||
                product.category === 'elevators';

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20"
                >
                  {/* Top Image & Badge */}
                  <div>
                    <div className="relative h-56 sm:h-60 bg-slate-950 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                      {/* Standards & Bestseller Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                        <span className="px-2.5 py-1 bg-slate-950/85 backdrop-blur-md rounded-md text-[10px] font-mono font-semibold text-slate-300 border border-slate-700">
                          {product.standards[0]}
                        </span>
                        {product.isBestseller && (
                          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded-md text-[10px] font-mono font-extrabold uppercase shadow-md flex items-center gap-1">
                            ★ Bestseller
                          </span>
                        )}
                      </div>

                      {/* Brand Label */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase backdrop-blur-md border ${
                            isDesang
                              ? 'bg-blue-600/90 text-white border-blue-400'
                              : 'bg-slate-950/85 text-slate-300 border-slate-700'
                          }`}
                        >
                          {isDesang ? 'DESANG' : 'Sovereign'}
                        </span>
                      </div>

                      {/* Subtitle / Model Code pill on bottom */}
                      {product.subtitle && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-block px-2 py-0.5 bg-slate-950/90 backdrop-blur-md rounded text-[11px] font-mono text-blue-400 border border-slate-800 truncate max-w-full">
                            {product.subtitle}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                          {lang === 'en' ? product.title : product.titleBn}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {lang === 'en' ? product.shortDesc : product.shortDescBn}
                        </p>
                      </div>

                      {/* Key Technical Specs Table */}
                      <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 space-y-1.5 text-xs font-mono">
                        {product.specs.slice(0, 3).map((spec, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400">
                              {lang === 'en' ? spec.label : spec.labelBn}:
                            </span>
                            <span className="text-slate-200 font-semibold text-right max-w-[55%] truncate">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Applications Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(lang === 'en' ? product.applications : product.applicationsBn)
                          .slice(0, 3)
                          .map((app, aIdx) => (
                            <span
                              key={aIdx}
                              className="px-2 py-0.5 rounded bg-slate-800/70 text-[10px] text-slate-400"
                            >
                              {app}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/60 mt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>{lang === 'en' ? 'Data Sheet' : 'স্পেক শিট'}</span>
                    </button>

                    <button
                      onClick={() => handleSelectQuote(product)}
                      className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-blue-900/30 flex items-center justify-center gap-1.5"
                    >
                      <span>{lang === 'en' ? 'Request Quote' : 'কোটেশন নিন'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Complete Sovereign Engineering Support & Spares Inventory */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                <Warehouse className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {lang === 'en' ? 'Central Spares Warehouse in Dhaka' : 'ঢাকায় সংরক্ষিত সেন্ট্রাল স্পেয়ার্স'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'en'
                  ? 'We maintain an extensive inventory of 100% genuine DESANG traction motors, VVVF drives, door motors, rollers, safety gears, and traveling cables for instant dispatch.'
                  : 'জরুরি মেরামত ও সার্ভিসিংয়ের জন্য সাভরেইনের বারিধারা ও গ্রিন রোড ওয়্যারহাউসে সর্বদা প্রস্তুত থাকে অরিজিনাল খুচরা যন্ত্রাংশ।'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {lang === 'en' ? 'Turnkey Certified Installation' : 'সার্টিফাইড ইঞ্জিনিয়ার দ্বারা ইনস্টলেশন'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'en'
                  ? 'Strict execution conforming to European EN 81-20/50, EN 115, and BNBC. Full laser alignment testing, vibration damping, and load drop safety testing before commissioning.'
                  : 'ইউরোপীয় সেফটি কোড ও বাংলাদেশ বিএনবিসি অনুসরণ করে নিখুঁত লেজার অ্যালাইনমেন্ট ও ড্রপ টেস্টের মাধ্যমে হস্তান্তর করা হয়।'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {lang === 'en' ? '24/7 Breakdown Rapid Squad' : '২৪/৭ ইমার্জেন্সি ব্রেকডাউন স্কোয়াড'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'en'
                  ? 'Mobile emergency engineering teams available 24 hours a day with an average attendance time under 45 minutes anywhere in Dhaka metro.'
                  : '২৪ ঘণ্টা চালু ডেডিকেটেড মোবাইল সার্ভিস টিম যা ঢাকার যেকোনো প্রান্তে সর্বোচ্চ ৪৫ মিনিটের মধ্যে উপস্থিত হয়।'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Integrated Quote Estimator Section */}
      <section id="products-rfq-section" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Direct Engineering Quotation' : 'সরাসরি কোটেশন কনফিগারেটর'}
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              {lang === 'en' ? 'Configure & Estimate Your Equipment' : 'আপনার পছন্দসই ইকুইপমেন্ট কনফিগার করুন'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {lang === 'en'
                ? 'Select capacity, stops, finishes, and building dimensions to generate an instant formal quotation document.'
                : 'ধারণক্ষমতা, ফ্লোর সংখ্যা ও কেবিন ডিজাইন নির্বাচন করে তাৎক্ষণিক স্পেসিফিকেশন ও অফিশিয়াল কোটেশন প্রস্তুত করুন।'}
            </p>
          </div>

          <QuoteEstimator lang={lang} preselectedProduct={productForQuote} />
        </div>
      </section>
    </div>
  );
};
