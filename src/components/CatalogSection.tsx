import React, { useState, useMemo } from 'react';
import { Search, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, EquipmentProduct } from '../data/companyData';

interface CatalogSectionProps {
  lang: 'en' | 'bn';
  selectedCategory: 'all' | 'elevators' | 'racking' | 'automation' | 'construction';
  onCategoryChange: (cat: 'all' | 'elevators' | 'racking' | 'automation' | 'construction') => void;
  onOpenProductModal: (product: EquipmentProduct) => void;
  onSelectProductForQuote: (product: EquipmentProduct) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  lang,
  selectedCategory,
  onCategoryChange,
  onOpenProductModal,
  onSelectProductForQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all' as const, label: 'All Equipment', labelBn: 'সকল ইকুইপমেন্ট' },
    { id: 'elevators' as const, label: 'Lifts & Elevators', labelBn: 'লিফট ও এলিভেটর' },
    { id: 'racking' as const, label: 'Warehouse Racks', labelBn: 'ওয়্যারহাউস র‍্যাক্স' },
    { id: 'automation' as const, label: 'Building Automation', labelBn: 'বিল্ডিং অটোমেশন' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.titleBn.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.standards.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            {lang === 'en' ? 'Certified Industrial Catalog' : 'সার্টিফাইড ইন্ডাস্ট্রিয়াল ক্যাটালগ'}
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {lang === 'en' ? 'Equipment & System Specifications' : 'যন্ত্রপাতি ও সিস্টেম স্পেসিফিকেশন'}
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                {lang === 'en'
                  ? 'All units are imported with European safety compliance (EN 81, EN 115, FEM 10.2.02) and installed strictly adhering to Bangladesh National Building Code (BNBC).'
                  : 'সকল লিফট ও র‍্যাকিং সিস্টেম ইউরোপীয় স্ট্যান্ডার্ড (EN 81, FEM) এবং বাংলাদেশ ন্যাশনাল বিল্ডিং কোড (BNBC) অনুসারে পরীক্ষিত ও স্থাপিত।'}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder={lang === 'en' ? 'Search by model, standard...' : 'মডেল বা কোড দিয়ে খুঁজুন...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800/80">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onCategoryChange(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {lang === 'en' ? tab.label : tab.labelBn}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
            <p className="text-sm text-slate-400">
              {lang === 'en'
                ? 'No equipment models match your current search criteria.'
                : 'আপনার অনুসন্ধানের সাথে মিল রেখে কোনো মডেল পাওয়া যায়নি।'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('all');
              }}
              className="mt-3 text-xs text-blue-400 hover:underline"
            >
              {lang === 'en' ? 'Reset filters' : 'ফিল্টার রিসেট করুন'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Product Image Header with Zero-Broken-Image Fallback */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />

                  {/* Standards unboxed watermark line */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded text-[11px] font-mono text-slate-300 border border-slate-800">
                    {product.standards[0]}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors">
                      {lang === 'en' ? product.title : product.titleBn}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {lang === 'en' ? product.shortDesc : product.shortDescBn}
                    </p>

                    {/* Quick Key Specs Table */}
                    <div className="space-y-1.5 py-3 border-y border-slate-800/80 mb-4 text-xs font-mono">
                      {product.specs.slice(0, 3).map((sp, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 text-slate-300">
                          <span className="text-slate-400 font-sans text-[11px]">
                            {lang === 'en' ? sp.label : sp.labelBn}:
                          </span>
                          <span className="text-right text-slate-200 text-[11px] truncate max-w-[180px]">
                            {sp.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Applications bullet teaser */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">
                        {lang === 'en' ? product.applications.join(' · ') : product.applicationsBn.join(' · ')}
                      </span>
                    </div>
                  </div>

                  {/* Action Handlers */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/80"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lang === 'en' ? 'Data Sheet' : 'ডাটা শিট'}</span>
                    </button>

                    <button
                      onClick={() => onSelectProductForQuote(product)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      <span>{lang === 'en' ? 'RFQ Quote' : 'কোটেশন চাই'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
