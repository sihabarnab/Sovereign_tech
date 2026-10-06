import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, FastForward, Shield } from 'lucide-react';

interface ElevatorDoorTransitionProps {
  onComplete?: () => void;
  lang: 'en' | 'bn';
}

export const ElevatorDoorTransition: React.FC<ElevatorDoorTransitionProps> = ({
  onComplete,
  lang,
}) => {
  // Timing flow:
  // 0.0s - 3.0s: Moving up (Floor counter progresses G -> 1 -> 2 -> 3 -> 4 -> 5 -> HQ)
  // 3.0s - 3.4s: Arriving, chime dings, indicator lights turn green
  // 3.4s - 5.0s: Doors glide open majestically with light rays
  // 5.0s+: Finished, reveals website
  const [stage, setStage] = useState<'moving' | 'arrived' | 'opening' | 'finished'>('moving');
  const [displayFloor, setDisplayFloor] = useState<string>('00');
  const [direction, setDirection] = useState<'up' | 'stop'>('up');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceAnnounced, setVoiceAnnounced] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play realistic Voice Announcement via Web Speech API
  const speakWelcome = () => {
    if (!soundEnabled) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any pending utterances
        const text =
          lang === 'bn'
            ? 'Welcome to Sovereign Technology Limited'
            : 'Welcome to Sovereign Technology Limited';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.92; // Elegant elevator voice cadence
        utterance.pitch = 1.05; // Friendly clear tone
        utterance.volume = 1.0;

        // Try to pick a natural high-quality English voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Siri') ||
              v.name.includes('Samantha') ||
              v.name.includes('David'))
        ) || voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
          setVoiceAnnounced(true);
        };

        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Graceful fallback
    }
  };

  // Synthesize realistic elevator sounds using Web Audio API
  const playArrivalChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // First tone (G5 - 784 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(783.99, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      // Second tone (E5 - 659 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.25);
      gain2.gain.setValueAtTime(0.22, now + 0.25);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.25);
      osc2.stop(now + 1.6);

      // Sub harmonic for rich acoustic elevator body feel (C5 - 523 Hz)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(523.25, now + 0.25);
      gain3.gain.setValueAtTime(0.08, now + 0.25);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.25);
      osc3.stop(now + 1.8);
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    // 5-second choreographed sequence:
    const timers: NodeJS.Timeout[] = [];

    // Floor counter progression simulating high-speed smooth ascension
    timers.push(setTimeout(() => setDisplayFloor('G'), 400));
    timers.push(setTimeout(() => setDisplayFloor('01'), 1000));
    timers.push(setTimeout(() => setDisplayFloor('02'), 1600));
    timers.push(setTimeout(() => setDisplayFloor('03'), 2200));
    timers.push(setTimeout(() => {
      setDisplayFloor('HQ');
      setDirection('stop');
      setStage('arrived');
      playArrivalChime();
    }, 3100));

    // Doors begin opening at 3.4s, and voice announcement begins
    timers.push(
      setTimeout(() => {
        setStage('opening');
        window.dispatchEvent(new CustomEvent('elevator-doors-opened'));
        // Announce welcome as the doors slide apart
        speakWelcome();
      }, 3400)
    );

    // Full reveal completion at 5.8s (allowing the voice to conclude gracefully)
    timers.push(
      setTimeout(() => {
        setStage('finished');
        if (onComplete) onComplete();
      }, 5800)
    );

    return () => {
      timers.forEach(clearTimeout);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('finished');
    window.dispatchEvent(new CustomEvent('elevator-doors-opened'));
    if (onComplete) onComplete();
  };

  if (stage === 'finished') return null;

  const isOpening = stage === 'opening';

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 overflow-hidden select-none transition-opacity duration-1000 ${
        isOpening ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Elevator Entrance Screen"
    >
      {/* Background Hallway Lighting & Atmosphere */}
      <div className="absolute inset-0 bg-radial from-slate-900 via-slate-950 to-black opacity-90 pointer-events-none" />

      {/* Top Controls: Sound Toggle & Skip Option */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white transition-colors"
        >
          <FastForward className="w-3.5 h-3.5 text-blue-400" />
          <span>{lang === 'en' ? 'Skip (5s)' : 'স্কিপ করুন'}</span>
        </button>
      </div>

      {/* Luxury Architrave: Top Frame & Digital Transom Display */}
      <div className="absolute top-0 inset-x-0 z-30 flex flex-col items-center">
        {/* Architectural Stainless Steel Top Header Beam */}
        <div className="w-full h-4 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-b border-slate-600 shadow-lg" />

        {/* Central COP / Transom Lantern Display */}
        <div className="mt-4 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700/90 shadow-2xl flex items-center gap-6 backdrop-blur-xl">
          {/* Brand Mark */}
          <div className="hidden sm:flex items-center gap-2.5 pr-4 border-r border-slate-800">
            <img
              src="/src/assets/images/sov_logo.jpg"
              alt="Sovereign Technology Ltd."
              className="h-8 w-auto max-w-[130px] object-contain rounded bg-white p-0.5"
            />
          </div>

          {/* Upward Movement Arrow Indicator */}
          <div className="flex flex-col items-center justify-center">
            <span
              className={`text-2xl font-bold transition-all duration-300 ${
                direction === 'up'
                  ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse scale-110'
                  : 'text-slate-600'
              }`}
            >
              ▲
            </span>
          </div>

          {/* LED Multi-Segment High-Definition Floor Display */}
          <div className="px-5 py-2 bg-black/90 rounded-xl border border-red-950/80 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] flex items-center justify-center min-w-[90px]">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-widest text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.85)]">
              {displayFloor}
            </span>
          </div>

          {/* Destination Status */}
          <div className="text-left pl-2">
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              {stage === 'arrived' || isOpening ? 'Arrived · Level 1' : 'Ascending · High-Speed'}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-100 flex items-center gap-1.5">
              <span>{lang === 'en' ? 'Twin Brooks Atrium' : 'টুইন ব্রুকস বারিধারা'}</span>
              {(stage === 'arrived' || isOpening) && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              )}
            </div>
          </div>
        </div>

        {/* Real-time status sub-text & Voice Announcement subtitle */}
        <div className="mt-2 flex items-center gap-2">
          {isOpening ? (
            <div className="px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/60 text-blue-200 text-xs font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>&ldquo;Welcome to Sovereign Technology Ltd.&rdquo;</span>
            </div>
          ) : (
            <div className="text-[11px] font-mono text-slate-400/90 tracking-widest uppercase">
              {stage === 'arrived'
                ? (lang === 'en' ? '• ARRIVED AT FLOOR •' : '• ফ্লোরে উপস্থিত •')
                : (lang === 'en' ? '• GEARLESS PMSM IN MOTION •' : '• লিফট সচল রয়েছে •')}
            </div>
          )}
        </div>
      </div>

      {/* Hallway Right Side Call Button Box (COP) */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-slate-700 shadow-2xl">
        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2">CALL</div>
        <div className="w-10 h-10 rounded-full border-2 border-emerald-400/80 bg-emerald-950/40 flex items-center justify-center text-emerald-400 font-bold text-sm shadow-[0_0_15px_rgba(52,211,153,0.5)] mb-3">
          ▲
        </div>
        <div className="w-10 h-10 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-500 font-bold text-sm">
          ▼
        </div>
        <div className="mt-3 text-[8px] font-mono text-slate-500">BNBC</div>
      </div>

      {/* LEFT ELEVATOR DOOR - High-end Brushed Titanium & Stainless Steel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700 border-r-[3px] border-slate-500 shadow-[20px_0_40px_rgba(0,0,0,0.8)] transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-end pr-8 sm:pr-16 ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Precision Hairline Brushed Texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.025)_2px,rgba(255,255,255,0.025)_4px)] pointer-events-none" />

        {/* Subtle Horizontal Architectural Reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40 pointer-events-none" />

        {/* Decorative Door Inlay Plates */}
        <div className="relative text-right opacity-40 select-none">
          <div className="w-20 sm:w-28 h-1 bg-gradient-to-l from-slate-300 to-transparent rounded-full mb-3 ml-auto" />
          <div className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-slate-300 uppercase">
            SOVEREIGN
          </div>
          <div className="text-[10px] font-mono tracking-widest text-slate-400 mt-1">
            TECHNOLOGY LTD
          </div>
        </div>

        {/* Left Safety Bumper Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-slate-900 shadow-inner" />
      </div>

      {/* RIGHT ELEVATOR DOOR - High-end Brushed Titanium & Stainless Steel */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-slate-950 via-slate-800 to-slate-700 border-l-[3px] border-slate-500 shadow-[-20px_0_40px_rgba(0,0,0,0.8)] transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-start pl-8 sm:pl-16 ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Precision Hairline Brushed Texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.025)_2px,rgba(255,255,255,0.025)_4px)] pointer-events-none" />

        {/* Subtle Horizontal Architectural Reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/40 pointer-events-none" />

        {/* Decorative Door Inlay Plates */}
        <div className="relative text-left opacity-40 select-none">
          <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-slate-300 to-transparent rounded-full mb-3" />
          <div className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-slate-300 uppercase">
            ELEVATORS
          </div>
          <div className="text-[10px] font-mono tracking-widest text-slate-400 mt-1">
            ESTABLISHED 1995
          </div>
        </div>

        {/* Right Safety Bumper Edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-900 shadow-inner" />
      </div>

      {/* Central Golden/Cyan Light Leak Seam when doors are shut */}
      {!isOpening && (
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400/30 via-amber-300/60 to-blue-400/30 shadow-[0_0_20px_rgba(251,191,36,0.7)] z-20 pointer-events-none animate-pulse" />
      )}

      {/* Bottom Architectural Sill & Track Grooves */}
      <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black to-slate-900 border-t border-slate-700 z-30 flex items-center justify-center">
        <div className="w-full max-w-4xl h-1 bg-slate-800 flex justify-around">
          <div className="w-1/3 h-full bg-slate-950 border-r border-slate-700" />
          <div className="w-1/3 h-full bg-slate-950 border-r border-slate-700" />
          <div className="w-1/3 h-full bg-slate-950" />
        </div>
      </div>
    </div>
  );
};
