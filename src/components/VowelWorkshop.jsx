import React, { useState } from 'react';
import { Volume2, Sparkles, Layers, ArrowRight, Play, Check } from 'lucide-react';
import { VOWELS, CONSONANTS } from '../data/tibetanData';
import { audioEngine } from '../utils/audioEngine';

export default function VowelWorkshop({ onAddXp }) {
  const [selectedConsonant, setSelectedConsonant] = useState(CONSONANTS[0]); // Default ཀ (Ka)
  const [selectedVowel, setSelectedVowel] = useState(VOWELS[0]); // Default Gi-gu

  const getCombinedGlyph = (consonantChar, vowelChar) => {
    // Unicode combining: base consonant + vowel mark
    return `${consonantChar}${vowelChar.symbol}`;
  };

  const getCombinedPhonetic = (consonant, vowel) => {
    const baseWylie = consonant.wylie.slice(0, -1); // remove trailing 'a'
    return `${baseWylie}${vowel.vowelChar}`;
  };

  const handlePlayCombination = (vowel) => {
    const combinedPhonetic = getCombinedPhonetic(selectedConsonant, vowel);
    audioEngine.playPhonetic(combinedPhonetic, selectedConsonant.tone);
    if (onAddXp) onAddXp(3);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950/60 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            The 4 Vowel Signs (དབྱངས་བཞི)
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-100 mb-2">
            The Vowel Laboratory
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every Tibetan consonant has an inherent vowel <strong className="text-amber-400 font-semibold">'a'</strong>. 
            To change this sound, Tibetans attach one of <span className="text-rose-400 font-semibold">4 diacritical vowel marks</span>: 
            three sit on top (Gi-gu, Dreng-bu, Na-ro) and one hangs below (Zhab-kyu).
          </p>
        </div>
      </div>

      {/* 4 Vowels Showcase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VOWELS.map((v) => (
          <div
            key={v.name}
            onClick={() => {
              setSelectedVowel(v);
              audioEngine.playPhonetic(v.vowelChar, 'high');
            }}
            className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedVowel.name === v.name
                ? 'bg-rose-950/70 border-amber-500 shadow-xl shadow-rose-950/60 ring-2 ring-amber-500/30'
                : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-bold text-amber-400 font-tibetan text-base">
                  {v.tibetanName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-950 text-stone-400 text-[10px] uppercase font-bold">
                  {v.position}
                </span>
              </div>

              {/* Huge Vowel Mark Demo */}
              <div className="my-3 text-center py-4 bg-stone-950/60 rounded-2xl border border-stone-800/60">
                <span className="font-tibetan text-6xl text-amber-300 font-bold block">
                  {v.sample}
                </span>
                <span className="font-mono text-xs text-stone-400 mt-2 block">
                  e.g. {v.sampleWylie} = /{v.ipa}/
                </span>
              </div>

              <h4 className="text-base font-bold text-stone-100 mt-2">
                {v.name} ({v.vowelChar.toUpperCase()})
              </h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {v.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
              <span className="text-xs text-amber-300 font-medium">Sound: {v.sound}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioEngine.playPhonetic(v.vowelChar, 'high');
                }}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Combiner Lab */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Interactive Mixer
            </span>
            <h3 className="font-title text-2xl font-bold text-stone-100">
              Consonant + Vowel Morphing Simulator
            </h3>
          </div>
          <span className="text-xs text-stone-400">
            Selected Root: <strong className="text-amber-300 font-mono text-sm">{selectedConsonant.wylie} ({selectedConsonant.tibetan})</strong>
          </span>
        </div>

        {/* Consonant Picker (Scrollable bar) */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
            1. Select Any Base Consonant:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CONSONANTS.map((c) => (
              <button
                key={c.tibetan}
                onClick={() => {
                  setSelectedConsonant(c);
                  audioEngine.playClick();
                }}
                className={`p-2.5 rounded-xl transition flex flex-col items-center min-w-[56px] ${
                  selectedConsonant.tibetan === c.tibetan
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-950 scale-105'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span className="font-tibetan text-xl">{c.tibetan}</span>
                <span className="text-[10px] font-mono mt-0.5">{c.wylie}</span>
              </button>
            ))}
          </div>
        </div>

        {/* The 5 Transformations Grid (Inherent A + 4 Vowels) */}
        <div>
          <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-3">
            2. The 5 Vowel Variants for {selectedConsonant.wylie.toUpperCase()}:
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Base (Inherent a) */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                  Inherent 'A' (No Mark)
                </span>
                <span className="font-tibetan text-5xl text-amber-200 font-bold block my-2">
                  {selectedConsonant.tibetan}
                </span>
                <span className="font-mono font-bold text-base text-stone-200 block">
                  {selectedConsonant.wylie}
                </span>
                <span className="text-xs text-stone-400 block">
                  /{selectedConsonant.phonetic}/
                </span>
              </div>
              <button
                onClick={() => audioEngine.playPhonetic(selectedConsonant.phonetic, selectedConsonant.tone)}
                className="mt-4 py-1.5 px-3 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-800 transition flex items-center justify-center gap-1 mx-auto w-full text-xs font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" /> Hear
              </button>
            </div>

            {/* 4 Explicit Vowels */}
            {VOWELS.map((v) => {
              const glyph = getCombinedGlyph(selectedConsonant.tibetan, v);
              const comboWylie = getCombinedPhonetic(selectedConsonant, v);
              return (
                <div
                  key={v.name}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-center flex flex-col justify-between transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-rose-400 block mb-1">
                      + {v.name} ({v.vowelChar})
                    </span>
                    <span className="font-tibetan text-5xl text-amber-300 font-bold block my-2 group-hover:scale-105 transition-transform">
                      {glyph}
                    </span>
                    <span className="font-mono font-bold text-base text-stone-200 block">
                      {comboWylie}
                    </span>
                    <span className="text-xs text-stone-400 block">
                      /{comboWylie}/
                    </span>
                  </div>
                  <button
                    onClick={() => handlePlayCombination(v)}
                    className="mt-4 py-1.5 px-3 rounded-xl bg-stone-900 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-300 border border-stone-800 transition flex items-center justify-center gap-1 mx-auto w-full text-xs font-semibold"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Hear
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
