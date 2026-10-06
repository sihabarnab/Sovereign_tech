import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, CheckCircle2, Clock, Wrench, AlertTriangle, Send } from 'lucide-react';
import { COMPANY_INFO, AMC_PACKAGES } from '../data/companyData';

interface ServiceAMCSectionProps {
  lang: 'en' | 'bn';
}

export const ServiceAMCSection: React.FC<ServiceAMCSectionProps> = ({ lang }) => {
  const [liftId, setLiftId] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [issueType, setIssueType] = useState('Immediate Stoppage / Trapped Person');
  const [cityZone, setCityZone] = useState('Dhaka Metro');
  const [ticketStatus, setTicketStatus] = useState<{ id: string; time: string } | null>(null);

  const handleEmergencyDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyPhone || !buildingName) return;

    const dispatchId = `EMRG-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketStatus({
      id: dispatchId,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <section id="service" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            {lang === 'en' ? 'After-Sales & Lifecycle Reliability' : 'বিক্রয়োত্তর সেবা ও রক্ষণাবেক্ষণ'}
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {lang === 'en'
                  ? 'Annual Maintenance Contracts (AMC) & 24/7 Breakdown Dispatch'
                  : 'বার্ষিক রক্ষণাবেক্ষণ চুক্তি (AMC) ও ২৪/৭ ইমার্জেন্সি ব্রেকডাউন সাপোর্ট'}
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                {lang === 'en'
                  ? 'We maintain an uninterrupted fleet of mobile emergency technicians and Bangladesh’s largest stock of genuine European elevator & escalator replacement components.'
                  : 'জরুরি প্রয়োজনে দ্রুত উপস্থিত হতে আমাদের রয়েছে সার্বক্ষণিক মোবাইল সার্ভিস টিম এবং অরিজিনাল খুচরা যন্ত্রাংশের পর্যাপ্ত স্টক।'}
              </p>
            </div>

            {/* Direct Telephone Call Affordance */}
            <a
              href={`tel:${COMPANY_INFO.phoneMobile.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors shadow-lg"
            >
              <PhoneCall className="w-5 h-5 text-amber-400 animate-pulse" />
              <div className="text-left leading-tight">
                <div className="text-[11px] text-amber-400/80 font-mono">
                  {lang === 'en' ? 'Direct 24/7 Helpline' : '২৪/৭ সরাসরি হেল্পলাইন'}
                </div>
                <div className="font-mono font-bold text-sm tracking-wide text-white">
                  {COMPANY_INFO.phoneMobile}
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 2-Column: Left AMC Tiers, Right Instant Breakdown Dispatcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: 3 AMC Tiers */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">
              {lang === 'en' ? 'Maintenance Service Packages' : 'রক্ষণাবেক্ষণ প্যাকেজসমূহ'}
            </h3>

            <div className="space-y-4">
              {AMC_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    pkg.popular
                      ? 'bg-slate-950 border-blue-500/60 shadow-xl'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-bold text-white">
                      {lang === 'en' ? pkg.name : pkg.nameBn}
                    </h4>
                    {pkg.popular && (
                      <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-4">
                    {lang === 'en' ? pkg.target : pkg.targetBn}
                  </p>

                  <div className="space-y-2 mb-4 text-xs text-slate-300">
                    {(lang === 'en' ? pkg.features : pkg.featuresBn).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Guaranteed Response Window:</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      {lang === 'en' ? pkg.responseTime : pkg.responseTimeBn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Urgent Emergency Breakdown Dispatcher Form */}
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-amber-900/40 shadow-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                {lang === 'en' ? 'Active Breakdown Dispatcher' : 'জরুরি ব্রেকডাউন টিকিট ডিসপ্যাচার'}
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              {lang === 'en'
                ? 'For registered AMC buildings and urgent client facilities requiring instant dispatch of technical crew to address equipment halts or critical errors.'
                : 'জরুরি লিফট বা ইকুইপমেন্ট জটিলতায় তাৎক্ষণিক টেকনিক্যাল রেসপন্স টিম পাঠানোর জন্য তথ্য পূরণ করুন।'}
            </p>

            {ticketStatus ? (
              <div className="p-6 rounded-xl bg-amber-950/40 border border-amber-600/50 text-center space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-base font-bold text-white">
                  {lang === 'en' ? 'Rapid Response Crew Notified' : 'রেসপন্স টিমকে সতর্কবার্তা পাঠানো হয়েছে'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? `Ticket ${ticketStatus.id} dispatched at ${ticketStatus.time}. Our senior duty engineer is calling back the mobile number provided.`
                    : `টিকিট ${ticketStatus.id} নিবন্ধিত হয়েছে (${ticketStatus.time})। আমাদের অন-ডিউটি প্রকৌশলী দ্রুত আপনার নম্বরে কল করছেন।`}
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${COMPANY_INFO.phoneMobile.replace(/\s+/g, '')}`}
                    className="inline-block px-4 py-2 text-xs font-bold text-amber-300 bg-amber-900/60 rounded-lg hover:bg-amber-800/80 transition-colors"
                  >
                    Call Hotline Directly: {COMPANY_INFO.phoneMobile}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmergencyDispatch} className="space-y-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {lang === 'en' ? 'Building Name & Exact Street Address *' : 'ভবনের নাম ও সঠিক ঠিকানা *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={buildingName}
                    onChange={(e) => setBuildingName(e.target.value)}
                    placeholder="e.g. Twin Brooks, Road 2/B, Baridhara"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {lang === 'en' ? 'Lift / Machine ID' : 'লিফট / মেশিন আইডি'}
                    </label>
                    <input
                      type="text"
                      value={liftId}
                      onChange={(e) => setLiftId(e.target.value)}
                      placeholder="e.g. LIFT-02 (Passenger)"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {lang === 'en' ? 'City / Area Zone *' : 'এলাকা / জোন *'}
                    </label>
                    <select
                      value={cityZone}
                      onChange={(e) => setCityZone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Dhaka Metro">Dhaka Metro</option>
                      <option value="Gazipur">Gazipur / Tongi</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Narayanganj">Narayanganj</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {lang === 'en' ? 'Nature of Issue *' : 'সমস্যার ধরণ *'}
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Immediate Stoppage / Trapped Person">
                      Critical: Stoppage / Passenger Inside
                    </option>
                    <option value="Door Failure / Jammed">Door Stuck / Will Not Close or Open</option>
                    <option value="Abnormal Vibration / Noise">Irregular Motor Noise / Vibration</option>
                    <option value="Leveling Error">Floor Misleveling (&gt;10mm)</option>
                    <option value="Racking Safety Inspection">Racking Upright Impact Damage Inspection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {lang === 'en' ? 'Site Contact Mobile Number *' : 'অন-সাইট কন্টাক্ট নম্বর *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+880 1XXXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Dispatch Emergency Crew' : 'জরুরি রেসপন্স টিম ডাকুন'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
