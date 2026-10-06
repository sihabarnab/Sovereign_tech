/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { SpecificationsPage } from './pages/SpecificationsPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ElevatorDoorTransition } from './components/ElevatorDoorTransition';
import { EquipmentProduct } from './data/companyData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [activeModalProduct, setActiveModalProduct] = useState<EquipmentProduct | null>(null);
  const [elevatorKey, setElevatorKey] = useState<number>(1);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const replayElevatorDoor = () => {
    setElevatorKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* 5-Second Luxury Elevator Door Intro Transition */}
      <ElevatorDoorTransition key={elevatorKey} lang={lang} />

      {/* Strict 3-Zone Multi-Page Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenQuote={() => handleNavigate('products')}
        onOpenEmergency={() => handleNavigate('contact')}
        onReplayElevator={replayElevatorDoor}
      />

      {/* Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onOpenQuote={() => handleNavigate('products')}
            onOpenEmergency={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            lang={lang}
            onOpenProductModal={(product) => setActiveModalProduct(product)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'specifications' && (
          <SpecificationsPage
            lang={lang}
            onOpenProductModal={(product) => setActiveModalProduct(product)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage lang={lang} />
        )}
      </main>

      {/* Corporate Quiet Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Technical Data Sheet Inspection Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        lang={lang}
        onClose={() => setActiveModalProduct(null)}
        onSelectForQuote={() => {
          setActiveModalProduct(null);
          handleNavigate('products');
        }}
      />
    </div>
  );
}
