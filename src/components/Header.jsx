import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Compass, Layers, Wand2, Trophy, Edit3, Download, Check, Sun, Moon, Settings2, X, RefreshCw } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function Header({ activeTab, setActiveTab, xp, streak, theme, setTheme }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState({
    voices: [],
    selectedVoice: null,
    isTibetanVoiceAvailable: false,
    voiceMode: 'auto'
  });

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

    // Subscribe to Audio Engine voice updates
    const unsubscribe = audioEngine.subscribe((status) => {
      setVoiceStatus(status);
    });

    // Refresh voices after a brief timeout to allow Windows SpeechSynthesis voices to populate
    const timer = setTimeout(() => {
      audioEngine.refreshVoices();
    }, 500);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      unsubscribe();
      clearTimeout(timer);
    };
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

  const toggleTheme = () => {
    audioEngine.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-stone-950/85 border-b border-stone-200 dark:border-stone-800/80 shadow-md dark:shadow-2xl transition-colors">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between border-b border-stone-200/60 dark:border-stone-800/40 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800/50 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-400 animate-pulse"></span>
            Lhasa Standard
          </span>

          {/* Voice Status Pill */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold transition hover:scale-105 ${
              voiceStatus.isTibetanVoiceAvailable
                ? 'bg-emerald-100 dark:bg-emerald-950/70 border-emerald-400 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800/50 text-amber-800 dark:text-amber-300'
            }`}
            title="Click to configure Windows Speech Synthesis voice"
          >
            <Volume2 className="w-3 h-3" />
            <span>
              {voiceStatus.isTibetanVoiceAvailable
                ? 'Windows Tibetan Voice: Active ✓'
                : 'Configure Audio Voice'}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP & Streak */}
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900/90 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              {xp} XP
            </span>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
              🔥 {streak}
            </span>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-amber-300 border border-stone-200 dark:border-stone-800 transition hover:scale-105 active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>

          {/* Sound Bowl Button */}
          <button
            onClick={playBell}
            title="Ring Tibetan Singing Bowl"
            className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-amber-700 dark:text-amber-300 border border-stone-200 dark:border-stone-800 transition hover:scale-105 active:scale-95"
          >
            🔔
          </button>

          {/* Install PWA Button */}
          {deferredPrompt && !isInstalled && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white font-medium hover:brightness-110 shadow-md transition active:scale-95 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Install App</span>
            </button>
          )}
          {isInstalled && (
            <span className="hidden md:flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/40 px-2.5 py-0.5 rounded-full text-xs">
              <Check className="w-3 h-3" /> PWA
            </span>
          )}
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Logo and Tibetan Heading */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900 via-rose-950 to-stone-900 border border-rose-700/50 flex items-center justify-center shadow-lg p-1 text-white">
            <span className="font-tibetan text-2xl text-amber-300 font-bold select-none">ཀ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-title text-xl sm:text-2xl font-bold tracking-wider text-stone-900 dark:text-amber-100 flex items-center gap-2">
                Tibetan 101
              </h1>
              <span className="font-tibetan text-sm text-rose-700 dark:text-rose-400 font-semibold">བོད་ཡིག་སྦྱོང་བ</span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
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
                    ? 'bg-rose-900 text-amber-100 border border-rose-800 shadow-md dark:bg-rose-900/80 dark:text-amber-200 dark:border-rose-700/60'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300 dark:text-amber-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-amber-400 text-stone-950'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Voice Settings Modal */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsVoiceModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  Audio & Windows Tibetan Voice Settings
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Native Tibetan speech synthesis configuration
                </p>
              </div>
            </div>

            {/* Tibetan Voice Status Card */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-stone-500">Windows Tibetan Voice:</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  voiceStatus.isTibetanVoiceAvailable
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                }`}>
                  {voiceStatus.isTibetanVoiceAvailable ? 'Installed & Detected ✓' : 'Checking / Not detected'}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {voiceStatus.isTibetanVoiceAvailable
                  ? 'Great! The app will send native Tibetan script directly to your Windows Tibetan voice engine for 100% authentic pronunciation.'
                  : 'If you recently installed the Tibetan language pack in Windows Settings, click "Refresh Voices" below.'}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    audioEngine.refreshVoices();
                    audioEngine.playTibetan('བཀྲ་ཤིས་བདེ་ལེགས', 'Tashi Delek');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Test "བཀྲ་ཤིས་བདེ་ལེགས"</span>
                </button>
                <button
                  onClick={() => {
                    const voices = audioEngine.refreshVoices();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Voices</span>
                </button>
              </div>
            </div>

            {/* Voice Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-500 uppercase block">Voice Mode:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => audioEngine.setVoiceMode('tibetan')}
                  className={`p-3 rounded-xl border text-left transition ${
                    voiceStatus.voiceMode === 'tibetan' || voiceStatus.voiceMode === 'auto'
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-bold'
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <span className="block font-bold">Native Tibetan (Preferred)</span>
                  <span className="text-[10px] opacity-80">Speaks Tibetan script using Windows engine</span>
                </button>

                <button
                  onClick={() => audioEngine.setVoiceMode('phonetic')}
                  className={`p-3 rounded-xl border text-left transition ${
                    voiceStatus.voiceMode === 'phonetic'
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200 font-bold'
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <span className="block font-bold">Phonetic Romanized</span>
                  <span className="text-[10px] opacity-80">Speaks Roman phonetic guides</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsVoiceModalOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-white text-xs font-bold transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
