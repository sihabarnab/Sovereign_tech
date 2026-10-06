import React from 'react';
import { Award, ShieldCheck, Clock, Users, Building2, CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import { COMPANY_INFO, BOARD_MEMBERS, MAJOR_CLIENT_SECTORS } from '../data/companyData';

interface AboutPageProps {
  lang: 'en' | 'bn';
  onNavigate: (page: 'home' | 'about' | 'specifications' | 'contact') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const milestones = [
    {
      year: '1995',
      title: 'Company Incorporation',
      titleBn: 'কোম্পানি প্রতিষ্ঠা',
      desc: 'Sovereign Technology Ltd. was established to import, install, and maintain quality passenger lifts and escalators under Joint Stock Companies Act, 1994.',
      descBn: 'যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তরের অধীনে উচ্চমানের লিফট ও এসকেলেটর আমদানি, ইনস্টলেশন ও সার্ভিসের লক্ষ্যে যাত্রা শুরু।',
    },
    {
      year: '2004',
      title: 'Expansion into Industrial Warehouse Racking',
      titleBn: 'ইন্ডাস্ট্রিয়াল ওয়্যারহাউস র‍্যাকিং সম্প্রসারণ',
      desc: 'Developed trading and turnkey fabrication in heavy-duty pallet racking, drive-in systems, and mezzanine floors for RMG and industrial logistics.',
      descBn: 'রপ্তানিমুখী তৈরি পোশাক ও শিল্প কারখানার জন্য আন্তর্জাতিক মানের হেভি-ডিউটি র‍্যাকিং ও মেজানিন সিস্টেম চালু।',
    },
    {
      year: '2012',
      title: 'Security Equipment & Building Automation',
      titleBn: 'সিকিউরিটি ইকুইপমেন্ট ও বিল্ডিং অটোমেশন',
      desc: 'Expanded into security consulting, optical speed gate turnstiles, smart BMS controllers, and automatic parking boom barriers.',
      descBn: 'বাণিজ্যিক বহুতল ভবনের জন্য অপটিক্যাল টার্নস্টাইল, সিকিউরিটি অটোমেশন ও সেন্ট্রালাইজড বিল্ডিং ম্যানেজমেন্ট সিস্টেম অন্তর্ভুক্তিকরণ।',
    },
    {
      year: '2020',
      title: 'High-Speed PMSM Gearless Elevators',
      titleBn: 'হাই-স্পিড গিয়ারলেস পিএমএসএম প্রযুক্তি',
      desc: 'Deployed energy-saving synchronous gearless traction technology with EN 81-20 / BNBC compliance across high-rise skylines.',
      descBn: '৪০% পর্যন্ত বিদ্যুৎ সাশ্রয়ী পিএমএসএম ড্রাইভ ও আধুনিক আর্কিটেকচারাল লিফট প্রযুক্তির বিস্তার।',
    },
    {
      year: 'Present',
      title: 'Leading Infrastructure Trader & Service Authority',
      titleBn: 'নির্ভরযোগ্য টেকনোলজি ট্রেডার ও ইঞ্জিনিয়ারিং লিডার',
      desc: 'Over 1,000 corporate clients, Government & Defense supply (PWD, Army, Navy), and 1,450+ lift installations operating continuously.',
      descBn: '১,০০০+ এরও বেশি করপোরেট ক্লায়েন্ট, সরকারি ও প্রতিরক্ষা বাহিনীতে সফল সরবরাহ এবং দেশব্যাপী নিরবচ্ছিন্ন সেবা।',
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Page Hero */}
      <section className="relative py-20 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider">
              <span>ESTD 1995</span>
              <span aria-hidden="true">·</span>
              <span>Joint Stock Reg. Private Limited</span>
              <span aria-hidden="true">·</span>
              <span>Twin Brooks, Baridhara, Dhaka</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {lang === 'en'
                ? 'About Sovereign Technology Ltd.'
                : 'সাভরেইন টেকনোলজি লিমিটেড সম্পর্কে'}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {lang === 'en'
                ? 'Sovereign Technology Ltd. was established in the year 1995 to import, install, and maintain quality lifts and escalators. After enormous success in the elevator business, we developed trading with construction equipment, security equipment, warehouse management, and the real-estate sector.'
                : '১৯৯৫ সালে গুণগত মানের লিফট ও এসকেলেটর আমদানি, ইনস্টলেশন ও রক্ষণাবেক্ষণের লক্ষ্যে সাভরেইন টেকনোলজি লিমিটেড প্রতিষ্ঠিত হয়। লিফট ব্যবসায় অসাধারণ সাফল্যের পর কোম্পানিটি কনস্ট্রাকশন যন্ত্রপাতি, সিকিউরিটি ইকুইপমেন্ট, ওয়্যারহাউস ম্যানেজমেন্ট ও রিয়েল এস্টেট সেক্টরে বিশ্বস্ত ট্রেডিং সম্প্রসারণ করেছে।'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Corporate Heritage Section with Authentic Photo */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {lang === 'en' ? 'Who We Are' : 'আমাদের পরিচিতি ও অঙ্গীকার'}
            </div>

            <h2 className="text-3xl font-bold text-white leading-snug">
              {lang === 'en'
                ? 'Building Reputation Through Quality, Commitments & After-Sales Service'
                : 'পণ্যের মান, ডেলিভারি প্রতিশ্রুতি ও বিক্রয়োত্তর সেবায় প্রতিষ্ঠিত খ্যাতি'}
            </h2>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                {lang === 'en'
                  ? 'We have built our reputation for product quality, delivery commitments, and effective after-sales service. Today, Sovereign Technology Ltd. has become one of the leading traders of Bangladesh in the field of building automation and vertical transportation management.'
                  : 'আমরা আমাদের খ্যাতি গড়ে তুলেছি পণ্যের আপসহীন মান, সময়মতো ডেলিভারির দৃঢ় প্রতিশ্রুতি এবং সক্রিয় বিক্রয়োত্তর সেবার মাধ্যমে। আজ সাভরেইন টেকনোলজি লিমিটেড বাংলাদেশের বিল্ডিং অটোমেশন ও ভার্টিক্যাল ট্রান্সপোর্টেশনে শীর্ষস্থানীয় প্রতিষ্ঠানে পরিণত হয়েছে।'}
              </p>
              <p>
                {lang === 'en'
                  ? 'Headquartered at Twin Brooks in the prestigious diplomatic zone of Baridhara, Dhaka, with operational offices at 142 Green Road and 1206 Bhatara Road, our nationwide coverage spans government institutions, military facilities, pharmaceutical complexes, and top commercial developers.'
                  : 'ঢাকার বারিধারা ডিপ্লোমেটিক জোনের টুইন ব্রুকসে প্রধান কার্যালয় ছাড়াও ১৪২ গ্রীন রোড এবং ১২০৬ ভাটারা রোডে আমাদের সার্বিক অপারেশনাল কার্যক্রম পরিচালিত হয়। সরকারি দপ্তর, সামরিক বাহিনী, ফার্মাসিউটিক্যালস এবং শীর্ষ শিল্পগোষ্ঠীর সাথে আমাদের দীর্ঘমেয়াদী অংশীদারিত্ব রয়েছে।'}
              </p>
            </div>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Product Quality', titleBn: 'পণ্যের সর্বোচ্চ মান', desc: 'Direct European & Asian OEM certified components.' },
                { title: 'Delivery Commitments', titleBn: 'ডেলিভারি প্রতিশ্রুতি', desc: 'Strict adherence to commercial handover schedules.' },
                { title: 'Effective After-Sales', titleBn: 'সক্রিয় বিক্রয়োত্তর সেবা', desc: 'Dedicated 24/7 technical breakdown response vans.' },
                { title: 'Regulatory Compliance', titleBn: 'আইনি ও সেফটি কমপ্লায়েন্স', desc: 'BNBC Chapter 5 & EN 81-20/50 inspection standards.' },
              ].map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-white text-xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>{lang === 'en' ? val.title : val.titleBn}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl space-y-0">
              <img
                src="/src/assets/images/sov.jpg"
                alt="Sovereign Technology Ltd. Head Office and Operations"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="p-6 bg-slate-950 border-t border-slate-800">
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>Sovereign Technology Ltd. Corporate Presence</span>
                  <span className="text-xs font-mono text-blue-400">Baridhara, Dhaka</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Twin Brooks, House # 8, Road # 2/B, Block # J, Baridhara, Dhaka-1212
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <Users className="w-4 h-4 inline mr-1.5" />
              <span>{lang === 'en' ? 'Corporate Leadership' : 'পরিচালনা পর্ষদ'}</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {lang === 'en' ? 'Our Board of Directors' : 'বোর্ড অফ ডিরেক্টরস'}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              {lang === 'en'
                ? 'Experienced industry veterans leading Sovereign Technology Ltd. towards continuous engineering innovation and client trust.'
                : 'অভিজ্ঞ ও দক্ষ নেতৃত্বের নির্দেশনায় সাভরেইন টেকনোলজি লিমিটেড তিন দশক ধরে দেশের সেবা করে আসছে।'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOARD_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold font-mono text-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {member.name}
                  </h4>
                  <div className="text-xs font-semibold text-blue-400 font-mono">
                    {lang === 'en' ? member.role : member.roleBn}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                  Sovereign Technology Ltd.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients Summary */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 inline mr-1.5" />
            <span>{lang === 'en' ? 'Track Record' : 'গ্রাহক আস্থা'}</span>
          </div>
          <h2 className="text-3xl font-bold text-white">
            {lang === 'en' ? 'Major Clients Across Industries' : 'প্রধান প্রধান ক্লায়েন্ট ও অংশীদার'}
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            {lang === 'en'
              ? 'Over 1,000 corporate clients, government ministries, defense headquarters, and export-oriented industrial complexes.'
              : 'সরকারি দপ্তর, সামরিক বাহিনী, ফার্মাসিউটিক্যালস এবং রপ্তানিমুখী গার্মেন্টস সহ ১০০০-এরও বেশি ক্লায়েন্টের নিরবচ্ছিন্ন আস্থা।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MAJOR_CLIENT_SECTORS.map((sector, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>{lang === 'en' ? sector.title : sector.titleBn}</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {sector.clients.map((clientName, cIdx) => (
                  <li key={cIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{clientName}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Milestones' : 'অগ্রযাত্রার ইতিহাস'}
            </div>
            <h2 className="text-3xl font-bold text-white">
              {lang === 'en' ? '30 Years of Steady Engineering Growth' : '৩০ বছরের ধারাবাহিক উন্নয়ন ও উদ্ভাবন'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {milestones.map((ms, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-bold font-mono text-blue-400 mb-2">
                    {ms.year}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {lang === 'en' ? ms.title : ms.titleBn}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'en' ? ms.desc : ms.descBn}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 uppercase">
                  Milestone {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
