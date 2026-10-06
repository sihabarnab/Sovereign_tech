import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { ServiceAMCSection } from '../components/ServiceAMCSection';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactPageProps {
  lang: 'en' | 'bn';
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Contact Header */}
      <section className="py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Corporate Headquarters & Support' : 'হেড অফিস ও গ্রাহক সহায়তা'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {lang === 'en'
                ? 'Get in Touch with Sovereign Technology Ltd.'
                : 'সাভরেইন টেকনোলজি লিমিটেডের সাথে যোগাযোগ করুন'}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'en'
                ? 'Our head office in Baridhara, Dhaka is staffed by certified engineering specialists ready to assist with procurement, site feasibility surveys, and immediate 24/7 maintenance support.'
                : 'বারিধারা ডিপ্লোমেটিক এলাকার প্রধান কার্যালয়ে আমাদের সার্টিফাইড ইঞ্জিনিয়াররা নতুন প্রজেক্ট, সাইট অডিট এবং জরুরি সার্ভিস সহায়তায় নিয়োজিত আছেন।'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Baridhara Office Details & Direct Message Form */}
      <ContactSection lang={lang} />

      {/* Interactive Map Visual Guide for Baridhara Diplomatic Enclave */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Geographic Navigation Reference</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'en' ? 'Visiting Twin Brooks, Baridhara' : 'টুইন ব্রুকস, বারিধারা অফিসে আসার নির্দেশনা'}
              </h3>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              GPS Coordinates: 23.7995° N, 90.4225° E
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-white">Location Landmarks:</div>
              <p className="text-slate-400 leading-relaxed">
                Twin Brooks is located on Road # 2/B, Block # J in Baridhara Diplomatic Zone, minutes away from Gulshan-2 Circle and US Embassy area.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-white">Client Parking & Reception:</div>
              <p className="text-slate-400 leading-relaxed">
                Dedicated visitor parking available on premises. Technical blueprint conference room open Saturday to Thursday 9am to 5pm.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="font-semibold text-white">24/7 Mobile Dispatch Desk:</div>
              <p className="text-slate-400 leading-relaxed">
                Mobile emergency vans for elevator breakdowns stationed in Baridhara, Tejgaon, and Tongi for rapid 45-min arrival across Dhaka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Breakdown Emergency Dispatch & AMC Service Desk */}
      <ServiceAMCSection lang={lang} />
    </div>
  );
};
