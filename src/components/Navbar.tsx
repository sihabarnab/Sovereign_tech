import React, { useState } from 'react';
import { Phone, Globe, Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export type PageId = 'home' | 'products' | 'about' | 'specifications' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: 'en' | 'bn';
  onToggleLang: () => void;
  onOpenQuote: () => void;
  onOpenEmergency: () => void;
  onReplayElevator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
  onOpenQuote,
  onOpenEmergency,
  onReplayElevator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; labelBn: string }[] = [
    { id: 'home', label: 'Home', labelBn: 'হোম' },
    { id: 'products', label: 'Products', labelBn: 'প্রোডাক্টস' },
    { id: 'about', label: 'About Us', labelBn: 'আমাদের সম্পর্কে' },
    { id: 'specifications', label: 'Technical Specifications', labelBn: 'টেকনিক্যাল স্পেসিফিকেশন' },
    { id: 'contact', label: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Official Logo & Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg shrink-0"
        >
          <img
            src={COMPANY_INFO.logoUrl}
            alt="Sovereign Technology Ltd."
            className="h-10 sm:h-12 w-auto max-w-[210px] object-contain rounded bg-white p-1"
          />
        </button>

        {/* Zone 2: Multi-Page Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap pb-1 border-b-2 ${
                  isActive
                    ? 'text-white border-blue-500 font-semibold'
                    : 'text-slate-300 border-transparent hover:text-white'
                }`}
              >
                {lang === 'en' ? link.label : link.labelBn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Replay 5s Elevator Intro Button */}
          {onReplayElevator && (
            <button
              onClick={onReplayElevator}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700"
              title={lang === 'en' ? 'Replay 5s Elevator Door Intro' : '৫ সেকেন্ডের লিফট ওপেনিং আবার চালান'}
            >
              <span className="text-amber-400 font-bold">▲▼</span>
              <span>{lang === 'en' ? 'Elevator Door' : 'লিফট ওপেনিং'}</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700"
            title="Toggle Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* 24/7 Hotline Trigger */}
          <a
            href={`tel:${COMPANY_INFO.phoneMobile.replace(/\s+/g, '')}`}
            className="hidden xl:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-600/40 hover:bg-amber-900/50 rounded-lg transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>24/7 Hotline</span>
          </a>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('specifications')}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-blue-900/30"
          >
            {lang === 'en' ? 'Request Quote' : 'কোটেশন রিকোয়েস্ট'}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {lang === 'en' ? link.label : link.labelBn}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            {onReplayElevator && (
              <button
                onClick={() => {
                  onReplayElevator();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-slate-300 bg-slate-900 rounded-lg border border-slate-800"
              >
                <span className="text-amber-400 font-bold">▲▼</span>
                <span>{lang === 'en' ? 'Replay 5s Elevator Door Intro' : 'লিফট ডোর ওপেনিং আবার দেখুন'}</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('specifications')}
              className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold text-xs rounded-lg text-center shadow-lg"
            >
              {lang === 'en' ? 'Request Official RFQ Quote' : 'অফিসিয়াল কোটেশন রিকোয়েস্ট'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
