import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SyllableDecoder from './components/SyllableDecoder';
import ConsonantsMatrix from './components/ConsonantsMatrix';
import VowelWorkshop from './components/VowelWorkshop';
import StackingAndAffixes from './components/StackingAndAffixes';
import PracticeGrounds from './components/PracticeGrounds';
import TracingCanvas from './components/TracingCanvas';
import CheatSheetModal from './components/CheatSheetModal';
import { BookOpen, Sparkles, HelpCircle, Heart, Share2, Compass, Award } from 'lucide-react';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('decoder'); // default to flagship decoder
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  // Gamification state persisted in localStorage
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem('tibetan_xp') || '50', 10);
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('tibetan_streak') || '1', 10);
  });

  const addXp = (amount) => {
    setXp((prev) => {
      const next = prev + amount;
      localStorage.setItem('tibetan_xp', next.toString());
      return next;
    });
  };

  const incrementStreak = () => {
    setStreak((prev) => {
      const next = prev + 1;
      localStorage.setItem('tibetan_streak', next.toString());
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Sacred Himalayan Prayer Flags 5-Element Accent Strip */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-sky-500" title="Space / Sky (Blue)"></div>
        <div className="flex-1 bg-stone-100" title="Air / Wind (White)"></div>
        <div className="flex-1 bg-rose-600" title="Fire (Red)"></div>
        <div className="flex-1 bg-emerald-500" title="Water (Green)"></div>
        <div className="flex-1 bg-amber-400" title="Earth (Yellow)"></div>
      </div>

      {/* Dynamic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={xp}
        streak={streak}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'decoder' && <SyllableDecoder onAddXp={addXp} />}
        {activeTab === 'alphabet' && <ConsonantsMatrix onAddXp={addXp} />}
        {activeTab === 'vowels' && <VowelWorkshop onAddXp={addXp} />}
        {activeTab === 'stacking' && <StackingAndAffixes onAddXp={addXp} />}
        {activeTab === 'practice' && (
          <PracticeGrounds
            onAddXp={addXp}
            onIncrementStreak={incrementStreak}
          />
        )}
        {activeTab === 'tracing' && <TracingCanvas onAddXp={addXp} />}
      </main>

      {/* Floating Cheat Sheet Shortcut Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => {
            setIsCheatSheetOpen(true);
            audioEngine.playClick();
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-stone-950 font-bold text-xs sm:text-sm shadow-2xl shadow-rose-950 hover:scale-105 active:scale-95 transition-all group border border-amber-300/40"
        >
          <BookOpen className="w-4 h-4 text-stone-950 group-hover:rotate-6 transition-transform" />
          <span>Quick Cheat Sheet</span>
        </button>
      </div>

      {/* Master Cheat Sheet Modal */}
      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950/80 py-8 px-4 sm:px-6 text-xs text-stone-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="font-tibetan text-2xl text-amber-400">ཨོཾ་ཨཱཿཧཱུྃ</span>
            <div>
              <p className="text-stone-300 font-semibold">
                Learn Tibetan 101 • Progressive Web App
              </p>
              <p className="text-[11px] text-stone-500">
                Lhasa Standard Dialect • Classical Uchen Script (དབུ་ཅན) • Traditional Jor-lok
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={() => setIsCheatSheetOpen(true)}
              className="hover:text-amber-300 transition"
            >
              Grammar Summary
            </button>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Offline Ready PWA</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Dharma Students
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
