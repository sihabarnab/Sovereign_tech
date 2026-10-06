import React from 'react';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import { PROJECTS_PORTFOLIO } from '../data/companyData';

interface ProjectsSectionProps {
  lang: 'en' | 'bn';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  return (
    <section id="projects" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Track Record in Bangladesh' : 'বাস্তবায়িত প্রকল্পের ট্র্যাক রেকর্ড'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {lang === 'en' ? 'Landmark Installations & Case Studies' : 'শীর্ষস্থানীয় প্রকল্প ও বাস্তবায়িত সমাধান'}
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            {lang === 'en'
              ? 'From diplomatic zones to the heaviest industrial manufacturing belts, our equipment operates continuously across the nation.'
              : 'বারিধারা ডিপ্লোমেটিক জোন থেকে শুরু করে দেশের বৃহত্তম রপ্তানিমুখী শিল্পাঞ্চল পর্যন্ত সাভরেইনের যন্ত্রপাতি নিরবচ্ছিন্নভাবে সচল রয়েছে।'}
          </p>
        </div>

        {/* 2x2 Grid of Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS_PORTFOLIO.map((proj) => (
            <div
              key={proj.id}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                {/* Clean unboxed metadata kicker */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="text-blue-400 font-medium">
                    {lang === 'en' ? proj.category : proj.categoryBn}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {lang === 'en' ? proj.location : proj.locationBn}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-400">{proj.completionYear}</span>
                </div>

                {/* Primary Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {lang === 'en' ? proj.name : proj.nameBn}
                </h3>

                {/* Scope Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {lang === 'en' ? proj.scope : proj.scopeBn}
                </p>
              </div>

              {/* Quantified Impact Metric */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    {proj.metric}
                  </div>
                  <div className="text-xs text-slate-400">
                    {proj.metricLabel}
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500 font-mono">
                  BNBC & EN Certified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
