import React, { useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Download, Printer } from 'lucide-react';
import { EquipmentProduct } from '../data/companyData';

interface ProductDetailModalProps {
  product: EquipmentProduct | null;
  lang: 'en' | 'bn';
  onClose: () => void;
  onSelectForQuote: (product: EquipmentProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  lang,
  onClose,
  onSelectForQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span>Sovereign Technical Specification Sheet</span>
              <span aria-hidden="true">·</span>
              <span>{product.standards[0]}</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === 'en' ? product.title : product.titleBn}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Photo & Intro */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="sm:col-span-7 space-y-2">
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'en' ? product.shortDesc : product.shortDescBn}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {product.standards.map((std, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-950 border border-slate-800 text-slate-300 rounded"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Full Specifications Table */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'en' ? 'Engineering Parameters & Tolerances' : 'কারিগরি স্পেসিফিকেশন ও পরিমাপ'}</span>
            </h4>
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 divide-y divide-slate-800 text-xs font-mono">
              {product.specs.map((sp, idx) => (
                <div key={idx} className="grid grid-cols-12 p-3 hover:bg-slate-900/50">
                  <div className="col-span-5 text-slate-400 font-sans font-medium">
                    {lang === 'en' ? sp.label : sp.labelBn}
                  </div>
                  <div className="col-span-7 text-slate-200 font-semibold">
                    {sp.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Safety & Invariants */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">
              {lang === 'en' ? 'Core Features & Safety Mechanisms' : 'নিরাপত্তা প্রযুক্তি ও প্রধান সুবিধাসমূহ'}
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              {(lang === 'en' ? product.keyFeatures : product.keyFeaturesBn).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Application Sectors */}
          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 mb-2">
              {lang === 'en' ? 'Recommended Applications:' : 'উপযুক্ত প্রয়োগক্ষেত্র:'}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              {lang === 'en' ? product.applications.join(' · ') : product.applicationsBn.join(' · ')}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-mono">
            Sovereign Technology Ltd. Technical Data Release
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Print Sheet' : 'প্রিন্ট'}</span>
            </button>

            <button
              onClick={() => {
                onSelectForQuote(product);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-900/40"
            >
              <span>{lang === 'en' ? 'Configure in RFQ Estimator' : 'কোটেশন ক্যালকুলেটরে নিন'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
