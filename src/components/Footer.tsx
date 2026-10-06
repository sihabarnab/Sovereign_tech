import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { PageId } from './Navbar';

interface FooterProps {
  lang: 'en' | 'bn';
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-left group"
            >
              <img
                src={COMPANY_INFO.logoUrl}
                alt="Sovereign Technology Ltd."
                className="h-10 sm:h-12 w-auto max-w-[210px] object-contain rounded bg-white p-1"
              />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {lang === 'en'
                ? 'Pioneering vertical mobility, industrial logistics racking, and smart building management systems in Bangladesh since 1995. Built on uncompromising product quality, strict delivery commitments, and responsive after-sales engineering.'
                : '১৯৯৫ সাল থেকে বাংলাদেশে লিফট, এসকেলেটর, ইন্ডাস্ট্রিয়াল ওয়্যারহাউস র‍্যাকিং এবং বিল্ডিং অটোমেশনে বিশ্বস্ত নেতৃত্ব। নিখুঁত মান ও সার্বক্ষণিক নির্ভরযোগ্যতা।'}
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Established 1995 · Baridhara, Dhaka, Bangladesh
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {lang === 'en' ? 'Company Pages' : 'ওয়েবসাইট পেইজ'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'en' ? 'Home' : 'হোম'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'en' ? 'Products & Machinery' : 'প্রোডাক্টস ও যন্ত্রপাতি'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'en' ? 'About Sovereign' : 'আমাদের সম্পর্কে'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('specifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'en' ? 'Technical Specifications' : 'টেকনিক্যাল স্পেসিফিকেশন'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  {lang === 'en' ? 'Contact Baridhara HQ' : 'যোগাযোগ'}
                </button>
              </li>
            </ul>
          </div>

          {/* Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {lang === 'en' ? 'Core Solutions' : 'প্রধান সমাধান'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigate('specifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Passenger & Bed Elevators
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('specifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Panoramic Glass Lifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('specifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Commercial Escalators
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('specifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Heavy Pallet Racking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('specifications');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Building Automation & Gates
                </button>
              </li>
            </ul>
          </div>

          {/* Registered Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {lang === 'en' ? 'Registered Office' : 'রেজিস্টার্ড অফিস'}
            </h4>
            <div className="space-y-2 text-xs leading-relaxed">
              <p className="text-slate-300 font-mono text-[11px]">
                Twin Brooks, House # 8, Road # 2/B, Block # J, Baridhara, Dhaka-1212
              </p>
              <p className="font-mono text-slate-300">
                Landline: {COMPANY_INFO.phoneLandline}
              </p>
              <p className="font-mono text-slate-300">
                Mobile: {COMPANY_INFO.phoneMobile}
              </p>
              <p className="font-mono text-blue-400">
                {COMPANY_INFO.email}
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Standards Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Sovereign Technology Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>EN 81-20/50</span>
            <span aria-hidden="true">·</span>
            <span>BNBC 2020 Compliant</span>
            <span aria-hidden="true">·</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
