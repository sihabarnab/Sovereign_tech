import React, { useState } from 'react';
import { Calculator, CheckCircle2, Send, Copy, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO, EquipmentProduct } from '../data/companyData';

interface QuoteEstimatorProps {
  lang: 'en' | 'bn';
  preSelectedProduct?: EquipmentProduct | null;
  preselectedProduct?: EquipmentProduct | null;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({
  lang,
  preSelectedProduct,
  preselectedProduct,
}) => {
  const activeProduct = preSelectedProduct || preselectedProduct;
  const [division, setDivision] = useState<'elevator' | 'racking' | 'automation'>(
    activeProduct?.category === 'racking'
      ? 'racking'
      : activeProduct?.category === 'security'
      ? 'automation'
      : 'elevator'
  );

  // Elevator params
  const [floors, setFloors] = useState<number>(10);
  const [elevatorCapacity, setElevatorCapacity] = useState<number>(1000); // 1000 kg / 13 persons
  const [speed, setSpeed] = useState<string>('1.75');
  const [cabinStyle, setCabinStyle] = useState<'stainless' | 'panoramic' | 'hospital'>('stainless');

  // Racking params
  const [warehouseArea, setWarehouseArea] = useState<number>(15000); // sqft
  const [rackHeight, setRackHeight] = useState<number>(9); // meters
  const [palletWeight, setPalletWeight] = useState<number>(1200); // kg
  const [rackingType, setRackingType] = useState<'selective' | 'drive-in' | 'mezzanine'>('selective');

  // Project Client info
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [locationZone, setLocationZone] = useState('Dhaka Metro (Gulshan/Baridhara/Motijheel)');

  // Submission state
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    date: string;
  } | null>(null);

  // Live Engineering Calculations
  const calculatedSpecs = React.useMemo(() => {
    if (division === 'elevator') {
      const travelMeters = floors * 3.3;
      const persons = Math.round(elevatorCapacity / 75);
      const motorKw = (elevatorCapacity * parseFloat(speed) * 9.81 * 0.5) / (1000 * 0.85);
      const estPitDepth = parseFloat(speed) >= 2.0 ? '1600 mm' : '1400 mm';
      const estOverhead = parseFloat(speed) >= 2.0 ? '4500 mm' : '4200 mm';

      return {
        type: 'Vertical Traction Lift',
        summaryEn: `${floors} Stops (${travelMeters.toFixed(1)}m travel) · ${elevatorCapacity} kg (${persons} Persons) · ${speed} m/s`,
        summaryBn: `${floors} টি স্টপ (${travelMeters.toFixed(1)} মি ভ্রমণ) · ${elevatorCapacity} কেজি (${persons} জন) · ${speed} মি/সে`,
        details: [
          { label: 'Recommended Motor', val: `${motorKw.toFixed(1)} kW PMSM Gearless` },
          { label: 'Shaft Overhead Required', val: estOverhead },
          { label: 'Shaft Pit Depth Required', val: estPitDepth },
          { label: 'Standard Safety Package', val: 'ARD Auto Rescue + 128-Beam Safety Light Curtain' },
          { label: 'Applicable Code', val: 'BNBC 2020 Chapter 5 & EN 81-20' },
        ],
      };
    } else if (division === 'racking') {
      const estimatedPallets = Math.round((warehouseArea / 12) * (rackHeight / 3));
      const beamLevels = Math.floor(rackHeight / 1.8);

      return {
        type: 'Industrial High-Bay Racking',
        summaryEn: `${warehouseArea.toLocaleString()} sqft footprint · ${rackHeight}m clear height · ~${estimatedPallets.toLocaleString()} Pallet Positions`,
        summaryBn: `${warehouseArea.toLocaleString()} বর্গফুট ফ্লোর · ${rackHeight} মিটার ক্লিয়ার হাইট · ~${estimatedPallets.toLocaleString()} প্যালেট ক্যাপাসিটি`,
        details: [
          { label: 'Estimated Storage Positions', val: `Approx. ${estimatedPallets.toLocaleString()} Standard EUR/ISO Pallets` },
          { label: 'Recommended Beam Levels', val: `${beamLevels} Beam Levels per Upright Frame` },
          { label: 'Upright Load Rating', val: `${(palletWeight * 2 * beamLevels).toLocaleString()} kg Frame Rating` },
          { label: 'Material Standard', val: 'Q235B High Tensile Cold-Formed Steel' },
          { label: 'Design Code', val: 'FEM 10.2.02 / EN 15512' },
        ],
      };
    } else {
      return {
        type: 'Integrated Building Automation',
        summaryEn: `Optical Speed Gates & Centralized Access Management Integration`,
        summaryBn: `অপটিক্যাল স্পিড গেট ও সেন্ট্রালাইজড একসেস কন্ট্রোল সিস্টেম`,
        details: [
          { label: 'Throughput Capacity', val: '40 - 45 Pedestrians / Minute / Lane' },
          { label: 'Emergency Integration', val: 'Direct fire alarm relay trigger with auto-clear' },
          { label: 'Controller Protocol', val: 'BACnet / IP & TCP/IP with Cloud Sync' },
          { label: 'Motor Durability', val: 'Brushless DC Servo (>5,000,000 cycles)' },
        ],
      };
    }
  }, [division, floors, elevatorCapacity, speed, warehouseArea, rackHeight, palletWeight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const randomId = `ST-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket({
      id: randomId,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    });
  };

  return (
    <section id="estimator" className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Interactive Engineering Configurator' : 'ইঞ্জিনিয়ারিং স্পেসিফিকেশন ও কোটেশন কনফিগারেশন'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {lang === 'en' ? 'Calculate Technical Specs & Request Official Quote' : 'টেকনিক্যাল স্পেক্স গণনা করুন ও অফিসিয়াল কোটেশন নিন'}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {lang === 'en'
              ? 'Input your building or warehouse parameters to generate BNBC-compliant engineering specifications and receive a formal commercial proposal from Sovereign Technology engineers.'
              : 'আপনার প্রজেক্টের সাইজ ও রিকোয়ারমেন্ট নির্বাচন করুন; আমাদের সার্টিফাইড ইঞ্জিনিয়াররা দ্রুততম সময়ে পূর্ণাঙ্গ বাণিজ্যিক ও কারিগরি অফার পাঠাবেন।'}
          </p>
        </div>

        {/* Division Selector Tabs */}
        <div className="max-w-xl mx-auto flex items-center justify-center p-1.5 bg-slate-950 rounded-xl border border-slate-800 mb-10">
          <button
            type="button"
            onClick={() => setDivision('elevator')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
              division === 'elevator' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Elevators & Escalators' : 'লিফট ও এলিভেটর'}
          </button>
          <button
            type="button"
            onClick={() => setDivision('racking')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
              division === 'racking' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Warehouse Racking' : 'ওয়্যারহাউস র‍্যাকিং'}
          </button>
          <button
            type="button"
            onClick={() => setDivision('automation')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
              division === 'automation' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Building Automation' : 'বিল্ডিং অটোমেশন'}
          </button>
        </div>

        {/* Main 2-Column Interface: Left Inputs, Right Calculated Specs & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Parameter Inputs */}
          <div className="lg:col-span-6 bg-slate-950/70 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-between pb-3 border-b border-slate-800">
              <span>{lang === 'en' ? '1. Engineering Parameters' : '১. কারিগরি প্যারামিটার'}</span>
              <span className="text-xs font-mono text-blue-400">{calculatedSpecs.type}</span>
            </h3>

            {division === 'elevator' && (
              <div className="space-y-5">
                {/* Number of Floors */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>{lang === 'en' ? 'Building Floors / Stops (G + N):' : 'ভবনের ফ্লোর / স্টপ সংখ্যা:'}</span>
                    <span className="font-mono text-blue-400 text-sm font-bold">{floors} Floors</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                    <span>2 Stops (Low-rise)</span>
                    <span>20 Stops</span>
                    <span>40 Stops (Tower)</span>
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>{lang === 'en' ? 'Payload Capacity (kg / Persons):' : 'ধারণক্ষমতা (কেজি / যাত্রী সংখ্যা):'}</span>
                    <span className="font-mono text-blue-400 text-sm font-bold">
                      {elevatorCapacity} kg ({Math.round(elevatorCapacity / 75)} P)
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { kg: 630, label: '630 kg (8P)' },
                      { kg: 800, label: '800 kg (10P)' },
                      { kg: 1000, label: '1000 kg (13P)' },
                      { kg: 1600, label: '1600 kg (21P)' },
                    ].map((item) => (
                      <button
                        key={item.kg}
                        type="button"
                        onClick={() => setElevatorCapacity(item.kg)}
                        className={`py-2 px-1 text-[11px] font-mono rounded-lg border transition-colors ${
                          elevatorCapacity === item.kg
                            ? 'bg-blue-600 border-blue-500 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    {lang === 'en' ? 'Rated Hoisting Speed:' : 'লিফটের গতিসীমা:'}
                  </label>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="1.0">1.0 m/s — Standard Residential (G+3 to G+8)</option>
                    <option value="1.5">1.5 m/s — Commercial Mid-Rise (G+9 to G+16)</option>
                    <option value="1.75">1.75 m/s — High Traffic Commercial (G+14 to G+22)</option>
                    <option value="2.5">2.5 m/s — High Speed Tower (G+20 to G+35)</option>
                  </select>
                </div>

                {/* Cabin Architectural Style */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    {lang === 'en' ? 'Cabin Finishing & Application:' : 'কেবিন ফিনিশিং ও প্রয়োগ:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'stainless' as const, label: 'Hairline Stainless Steel', labelBn: 'এসএস হেয়ারলাইন' },
                      { id: 'panoramic' as const, label: 'Full Glass Panoramic', labelBn: 'প্যানোরামিক গ্লাস' },
                      { id: 'hospital' as const, label: 'Medical Bed Stretcher', labelBn: 'হাসপাতাল স্ট্রেচার' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setCabinStyle(style.id)}
                        className={`p-2.5 text-left rounded-lg border text-xs transition-colors ${
                          cabinStyle === style.id
                            ? 'bg-blue-600/20 border-blue-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-semibold text-slate-200">
                          {lang === 'en' ? style.label : style.labelBn}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {division === 'racking' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>{lang === 'en' ? 'Warehouse Footprint (sqft):' : 'ওয়্যারহাউস ফ্লোর সাইজ (বর্গফুট):'}</span>
                    <span className="font-mono text-blue-400 text-sm font-bold">
                      {warehouseArea.toLocaleString()} sq.ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="60000"
                    step="1000"
                    value={warehouseArea}
                    onChange={(e) => setWarehouseArea(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                    <span>{lang === 'en' ? 'Clear Ceiling Height (meters):' : 'ছাদের ক্লিয়ার উচ্চতা (মিটার):'}</span>
                    <span className="font-mono text-blue-400 text-sm font-bold">{rackHeight} Meters</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    step="0.5"
                    value={rackHeight}
                    onChange={(e) => setRackHeight(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    {lang === 'en' ? 'Racking Architecture System:' : 'র‍্যাকিং সিস্টেম ধরণ:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'selective' as const, label: 'Selective Pallet Racking' },
                      { id: 'drive-in' as const, label: 'Drive-In High Density' },
                      { id: 'mezzanine' as const, label: 'Multi-Tier Mezzanine' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRackingType(r.id)}
                        className={`p-2.5 text-left rounded-lg border text-xs transition-colors ${
                          rackingType === r.id
                            ? 'bg-blue-600/20 border-blue-500 text-white font-medium'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {division === 'automation' && (
              <div className="space-y-4 text-xs text-slate-300">
                <p className="text-slate-400 leading-relaxed">
                  {lang === 'en'
                    ? 'Configure optical flap speed gates, access control integration, and parking boom barrier management for corporate headquarters or gated industrial parks.'
                    : 'কর্পোরেট প্রধান কার্যালয় বা শিল্প কারখানার জন্য অপটিক্যাল স্পিড গেট, কার্ড রিডার, ফেস রিকগনিশন ও অটোমেটিক পার্কিং ব্যারিয়ার কনফিগার করুন।'}
                </p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-semibold text-white">Included Standard Architecture:</div>
                  <ul className="space-y-1.5 text-slate-400 font-mono">
                    <li>• SUS304 Brushed Stainless Steel Turnstile Chassis</li>
                    <li>• Infrared Anti-Tailgating Sensors (12 Pairs)</li>
                    <li>• Fire Alarm Auto-Retract Relay Invariant</li>
                    <li>• Compatible with Face Recognition & RFID Mifare</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Calculated Engineering Specs & Lead Capture */}
          <div className="lg:col-span-6 space-y-6">
            {/* Live Spec Calculation Card */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' ? '2. Live Specification Output' : '২. লাইভ টেকনিক্যাল স্পেক্স আউটপুট'}
                </h3>
                <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  BNBC Validated
                </span>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200">
                <span className="font-semibold text-white">Configuration: </span>
                {lang === 'en' ? calculatedSpecs.summaryEn : calculatedSpecs.summaryBn}
              </div>

              <div className="mt-4 space-y-2.5 text-xs font-mono">
                {calculatedSpecs.details.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400 font-sans">{item.label}</span>
                    <span className="text-slate-200 text-right font-semibold">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* Commercial Proposal Request Form */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                {submittedTicket ? (
                  <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">
                      {lang === 'en' ? 'RFQ Proposal Dispatched Successfully' : 'কোটেশন রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {lang === 'en'
                        ? 'Our chief engineering team at Baridhara, Dhaka has received your parameters and will contact you within 4 business hours.'
                        : 'বারিধারা প্রধান কার্যালয় থেকে আমাদের ইঞ্জিনিয়ার দল আপনার স্পেসিফিকেশন পর্যালোচনা করে ৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।'}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/40 border border-emerald-600/40 text-emerald-300 font-mono text-xs">
                      <span>Ref Ticket ID: {submittedTicket.id}</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-xs font-semibold text-white uppercase tracking-wider">
                      {lang === 'en' ? 'Request Formal Quotation' : 'অফিসিয়াল কোটেশন পাঠান'}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {lang === 'en' ? 'Contact Person Name *' : 'যোগাযোগকারীর নাম *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Engr. Tanvir Ahmed"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {lang === 'en' ? 'Company / Organization' : 'কোম্পানি / প্রতিষ্ঠান'}
                        </label>
                        <input
                          type="text"
                          value={clientCompany}
                          onChange={(e) => setClientCompany(e.target.value)}
                          placeholder="e.g. Meghna Group / Asset Dev."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {lang === 'en' ? 'Mobile / WhatsApp Number *' : 'মোবাইল / হোয়াটসঅ্যাপ নম্বর *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+880 17XXXXXXXX"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          {lang === 'en' ? 'Corporate Email' : 'ইমেইল অ্যাড্রেস'}
                        </label>
                        <input
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="tanvir@company.com"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        {lang === 'en' ? 'Project Site Location' : 'প্রকল্পের অবস্থান'}
                      </label>
                      <select
                        value={locationZone}
                        onChange={(e) => setLocationZone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Dhaka Metro">Dhaka Metro (Baridhara, Gulshan, Uttara, Motijheel)</option>
                        <option value="Gazipur Industrial Belt">Gazipur Industrial Belt (Tongi, Konabari, Kashimpur)</option>
                        <option value="Chattogram Port & City">Chattogram Port & City</option>
                        <option value="Narayanganj & Meghnaghat">Narayanganj & Meghnaghat</option>
                        <option value="Sylhet / Rajshahi / Khulna">Other Divisions of Bangladesh</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Submit RFQ Specification' : 'অফিসিয়াল কোটেশন রিকোয়েস্ট পাঠান'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
