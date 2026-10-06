import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ContactSectionProps {
  lang: 'en' | 'bn';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Elevator & Lift Installation Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const scheduleList = [
    { day: 'Saturday', dayBn: 'শনিবার', hours: '09:00 AM – 05:00 PM' },
    { day: 'Sunday', dayBn: 'রবিবার', hours: '09:00 AM – 05:00 PM' },
    { day: 'Monday', dayBn: 'সোমবার', hours: '09:00 AM – 05:00 PM' },
    { day: 'Tuesday', dayBn: 'মঙ্গলবার', hours: '09:00 AM – 05:00 PM' },
    { day: 'Wednesday', dayBn: 'বুধবার', hours: '09:00 AM – 05:00 PM' },
    { day: 'Thursday', dayBn: 'বৃহস্পতিবার', hours: '09:00 AM – 05:00 PM' },
    { day: 'Friday', dayBn: 'শুক্রবার', hours: 'Weekly Holiday', holiday: true },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            {lang === 'en' ? 'Direct Consultation & Head Office' : 'হেড অফিস ও সরাসরি যোগাযোগ'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {lang === 'en' ? 'Visit Our Baridhara Headquarters' : 'আমাদের বারিধারা কর্পোরেট অফিসে যোগাযোগ করুন'}
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            {lang === 'en'
              ? 'Schedule a technical conference with our engineering directors or drop by Twin Brooks to examine equipment blueprints, catalog physical finishes, and discuss project timelines.'
              : 'প্রকল্পের নকশা, স্পেসিফিকেশন পর্যালোচনা বা সরাসরি আলোচনার জন্য আমাদের বারিধারা অফিসে যোগাযোগ করুন।'}
          </p>
        </div>

        {/* 2-Column: Left Contact Details & Hours, Right Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact Card & Business Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Details */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {lang === 'en' ? 'Registered Office Address' : 'রেজিস্টার্ড অফিস ঠিকানা'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {COMPANY_INFO.address}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {COMPANY_INFO.addressBn}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="text-slate-300 font-medium">Branch Operations: </span>
                    <span>142 Green Road, Dhaka · 1206 Bhatara Road, Dhaka</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {lang === 'en' ? 'Official Telephone & Mobile' : 'অফিসিয়াল টেলিফোন ও মোবাইল'}
                  </h4>
                  <div className="space-y-1 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 font-sans">Landline: </span>
                      <a href={`tel:${COMPANY_INFO.phoneLandline.replace(/[^\d+]/g, '')}`} className="text-white hover:text-blue-400">
                        {COMPANY_INFO.phoneLandline}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 font-sans">Mobile: </span>
                      <a href={`tel:${COMPANY_INFO.phoneMobile.replace(/\s+/g, '')}`} className="text-white hover:text-blue-400">
                        {COMPANY_INFO.phoneMobile}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {lang === 'en' ? 'Official Email' : 'ইমেইল যোগাযোগ'}
                  </h4>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-xs text-blue-400 hover:underline font-mono"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Verified Business Hours Schedule Table */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-white mb-3">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{lang === 'en' ? 'Official Business Hours' : 'অফিসিয়াল কর্মঘণ্টা'}</span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  {scheduleList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0"
                    >
                      <span className="text-slate-300 font-sans">
                        {lang === 'en' ? item.day : item.dayBn}
                      </span>
                      <span className={item.holiday ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                        {item.holiday && lang === 'bn' ? 'সাপ্তাহিক ছুটি' : item.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px] text-emerald-400 font-sans">
                  * 24/7 Breakdown emergency service is active during weekends and national holidays.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">
              {lang === 'en' ? 'Send an Executive Inquiry' : 'সরাসরি বার্তা পাঠান'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {lang === 'en'
                ? 'Whether you require pricing, site survey scheduling, or a comprehensive building automation audit, our engineering team responds promptly.'
                : 'নতুন প্রজেক্টের সাইট সার্ভে, প্রাইসিং বা টেকনিক্যাল পরামর্শের জন্য আপনার তথ্য লিখে পাঠিয়ে দিন।'}
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">
                  {lang === 'en' ? 'Inquiry Transmitted to Baridhara HQ' : 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে'}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {lang === 'en'
                    ? `Thank you, ${formData.name}. Our commercial liaison will reach out to ${formData.phone} shortly.`
                    : `ধন্যবাদ, ${formData.name}। আমাদের প্রতিনিধি শীঘ্রই আপনার মোবাইল নম্বরে যোগাযোগ করবেন।`}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Elevator & Lift Installation Inquiry',
                      message: '',
                    });
                  }}
                  className="mt-4 px-4 py-2 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {lang === 'en' ? 'Send another inquiry' : 'আরেকটি বার্তা পাঠান'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      {lang === 'en' ? 'Full Name *' : 'নাম *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asif Mahmud"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      {lang === 'en' ? 'Phone / WhatsApp *' : 'ফোন বা হোয়াটসঅ্যাপ *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 19XXXXXXXX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      {lang === 'en' ? 'Corporate Email' : 'ইমেইল অ্যাড্রেস'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="info@yourcompany.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      {lang === 'en' ? 'Interest Division' : 'আগ্রহের বিষয়'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Elevator & Lift Installation Inquiry">
                        Lifts, Elevators & Escalators
                      </option>
                      <option value="Warehouse Racking System">Warehouse Racking & Storage</option>
                      <option value="Building Automation & Security">
                        Building Automation & Security
                      </option>
                      <option value="Annual Maintenance Contract (AMC)">
                        AMC & Modernization Support
                      </option>
                      <option value="Construction Equipment Supply">Construction Machinery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    {lang === 'en' ? 'Project Requirements / Notes' : 'বিস্তারিত বিবরণ বা প্রজেক্ট নোট'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === 'en'
                        ? 'Describe your building location, number of floors, storage capacity or timeline requirements...'
                        : 'আপনার ভবনের অবস্থান, ফ্লোর সংখ্যা বা কাঙ্ক্ষিত টাইমলাইন উল্লেখ করুন...'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Send Corporate Inquiry' : 'বার্তা পাঠান'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
