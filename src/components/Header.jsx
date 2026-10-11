import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Compass, Layers, Wand2, Trophy, Edit3, HelpCircle, Download, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Header({ activeTab, setActiveTab, xp, streak }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  const playBell = () => {
    audioEngine.playSingingBowl();
  };

  const navItems = [
    { id: 'decoder', label: 'Syllable Decoder', icon: Wand2, badge: 'Key' },
    { id: 'alphabet', label: '30 Consonants', icon: BookOpen },
    { id: 'vowels', label: 'Vowel Lab', icon: Layers },
    { id: 'stacking', label: 'Subscripts & Rules', icon: Compass },
    { id: 'practice', label: 'Practice & Quizzes', icon: Trophy, badge: 'Drills' },
    { id: 'tracing', label: 'Stroke Tracing', icon: Edit3 },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-stone-950/85 border-b border-stone-800/80 shadow-2xl transition-all">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-stone-800/40 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/50 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            Lhasa Reading Method
          </span>
          <span className="hidden sm:inline text-stone-400">
            Optimal step-by-step Tibetan deciphering
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* XP & Streak */}
          <div className="flex items-center gap-2 bg-stone-900/90 px-3 py-1 rounded-full border border-stone-800 text-stone-300">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              {xp} XP
            </span>
            <span className="text-stone-600">|</span>
            <span className="flex items-center gap-1 text-rose-400 font-semibold">
              🔥 {streak} Streak
            </span>
          </div>

          {/* Sound Bowl Button */}
          <button
            onClick={playBell}
            title="Ring Tibetan Singing Bowl"
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-900/40 transition hover:scale-105 active:scale-95"
          >
            🔔
          </button>

          {/* Install PWA Button */}
          {deferredPrompt && !isInstalled && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white font-medium hover:brightness-110 shadow-lg shadow-rose-950 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Install App</span>
            </button>
          )}
          {isInstalled && (
            <span className="hidden md:flex items-center gap-1 text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
              <Check className="w-3 h-3" /> PWA Active
            </span>
          )}
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Logo and Tibetan Heading */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900 via-rose-950 to-stone-900 border border-rose-700/50 flex items-center justify-center shadow-lg shadow-rose-950/60 p-1">
            <span className="font-tibetan text-2xl text-amber-300 font-bold select-none">ཀ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-title text-xl sm:text-2xl font-bold tracking-wider text-amber-100 flex items-center gap-2">
                Tibetan 101
              </h1>
              <span className="font-tibetan text-sm text-rose-400 font-normal">བོད་ཡིག་སྦྱོང་བ</span>
            </div>
            <p className="text-[11px] text-stone-400">
              The fastest, most intuitive system to read classical & modern Tibetan
            </p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  audioEngine.playClick();
                  setActiveTab(item.id);
                }}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-rose-900/80 text-amber-200 border border-rose-700/60 shadow-lg shadow-rose-950/50'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-amber-400 text-stone-950' : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
