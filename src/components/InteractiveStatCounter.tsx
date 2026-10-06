import React, { useState, useEffect, useRef } from 'react';
import { RotateCw } from 'lucide-react';

interface StatItem {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  labelBn: string;
  detail: string;
  detailBn: string;
}

interface InteractiveStatCounterProps {
  lang: 'en' | 'bn';
}

export const InteractiveStatCounter: React.FC<InteractiveStatCounterProps> = ({ lang }) => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [activeHoverIdx, setActiveHoverIdx] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const statsConfig: StatItem[] = [
    {
      target: 1995,
      prefix: '',
      suffix: '',
      label: 'Established Year',
      labelBn: 'প্রতিষ্ঠিত সাল',
      detail: 'Over 30 years of continuous engineering excellence under RJSC',
      detailBn: 'তিন দশকেরও বেশি সময় ধরে যৌথ মূলধন কোম্পানি নিবন্ধিত',
    },
    {
      target: 1000,
      prefix: '',
      suffix: '+',
      label: 'Corporate Clients',
      labelBn: 'সন্তুষ্ট করপোরেট ক্লায়েন্ট',
      detail: 'Government ministries, defense complexes, and top industrial groups',
      detailBn: 'সরকারি দপ্তর, সশস্ত্র বাহিনী ও শীর্ষস্থানীয় শিল্পগ্রুপসমূহ',
    },
    {
      target: 1450,
      prefix: '',
      suffix: '+',
      label: 'Units Installed',
      labelBn: 'ইনস্টলকৃত লিফট ও এসকেলেটর',
      detail: 'Heavy-duty passenger, panoramic, and hospital bed stretcher lifts',
      detailBn: 'প্যাসেঞ্জার, প্যানোরামিক ও হসপিটাল বেড লিফট স্থাপন',
    },
    {
      target: 45,
      prefix: '< ',
      suffix: ' min',
      label: 'Dhaka Emergency Response',
      labelBn: 'জরুরি রেসপন্স সময়',
      detail: 'Dedicated 24/7 mobile technician vans deployed across Dhaka Metro',
      detailBn: 'ঢাকা মেট্রো এলাকায় সার্বক্ষণিক মোবাইল সার্ভিস টিম উপস্থিতি',
    },
  ];

  // Function to run the auto-count animation from 0 to targets
  const runCounterAnimation = () => {
    setIsCounting(true);
    setCounts([0, 0, 0, 0]);

    const duration = 2200; // 2.2 seconds for dramatic, visible auto-counting
    const startTime = performance.now();
    let frameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Fluid ease-out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts = statsConfig.map((stat) => Math.round(stat.target * easeProgress));
      setCounts(nextCounts);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setIsCounting(false);
      }
    };

    frameId = requestAnimationFrame(tick);
  };

  useEffect(() => {
    // 1. Listen for the elevator door opening event so counting starts right as the website is revealed
    const handleDoorOpen = () => {
      setTimeout(() => {
        runCounterAnimation();
      }, 200); // slight delay as doors separate
    };

    window.addEventListener('elevator-doors-opened', handleDoorOpen);

    // 2. Also trigger on IntersectionObserver when visible on screen
    let observer: IntersectionObserver | null = null;
    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // If not already counting and at 0, start
              runCounterAnimation();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(containerRef.current);
    }

    // 3. Fallback timer in case the door event didn't fire or intro was bypassed
    const fallbackTimer = setTimeout(() => {
      setCounts((prev) => {
        if (prev[0] === 0) {
          runCounterAnimation();
        }
        return prev;
      });
    }, 3800);

    return () => {
      window.removeEventListener('elevator-doors-opened', handleDoorOpen);
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statsConfig.map((item, idx) => {
          const isHovered = activeHoverIdx === idx;
          const displayVal = counts[idx] || 0;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveHoverIdx(idx)}
              onMouseLeave={() => setActiveHoverIdx(null)}
              onClick={runCounterAnimation}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none relative overflow-hidden group ${
                isHovered
                  ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 -translate-y-1 ring-1 ring-blue-500/50'
                  : isCounting
                  ? 'bg-slate-900/90 border-blue-500/50 shadow-md shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 inset-x-0 h-1 transition-opacity ${
                  isHovered || isCounting ? 'bg-gradient-to-r from-blue-500 to-indigo-500 opacity-100' : 'opacity-0'
                }`}
              />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {lang === 'en' ? item.label : item.labelBn}
                </span>
                <span className="text-[10px] text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <RotateCw className="w-2.5 h-2.5" />
                  <span>Replay</span>
                </span>
              </div>

              {/* Animated Tabular Number Counter */}
              <div
                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight tabular-nums flex items-baseline transition-colors ${
                  isCounting ? 'text-blue-300 scale-[1.02]' : 'text-white'
                }`}
              >
                {item.prefix}
                {displayVal.toLocaleString()}
                {item.suffix}
              </div>

              <div className="text-xs text-slate-400 mt-2 leading-relaxed">
                {lang === 'en' ? item.detail : item.detailBn}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
