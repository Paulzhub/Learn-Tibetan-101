import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Filter, X } from 'lucide-react';
import { CONSONANTS } from '../data/tibetanData';
import { audioEngine } from '../utils/audioEngine';

export default function ConsonantsMatrix({ onAddXp }) {
  const [selectedConsonant, setSelectedConsonant] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredConsonants = CONSONANTS.filter((c) => {
    if (filter === 'high') return c.tone === 'high';
    if (filter === 'low') return c.tone === 'low';
    if (filter === 'nasal') return c.aspiration === 'nasal';
    return true;
  });

  const handleCardClick = (consonant) => {
    setSelectedConsonant(consonant);
    audioEngine.playPhonetic(consonant.phonetic, consonant.tone, consonant.tibetan);
    if (onAddXp) onAddXp(2);
  };

  const handlePlaySound = (consonant, e) => {
    if (e) e.stopPropagation();
    audioEngine.playPhonetic(consonant.phonetic, consonant.tone, consonant.tibetan);
    if (onAddXp) onAddXp(2);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Pedagogical Insight */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-100 via-rose-50/70 to-amber-50/50 dark:from-stone-900 dark:via-rose-950/60 dark:to-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm dark:shadow-2xl transition-colors">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            The 30 Consonants (གསལ་བྱེད་སུམ་ཅུ)
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-amber-100 mb-2">
            The 4-Column Tonal Matrix
          </h2>
          <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            The secret to reading Tibetan effortlessly lies in the <strong className="text-amber-700 dark:text-amber-400 font-semibold">4 columns</strong>. 
            Columns 1 & 2 are naturally <span className="text-emerald-700 dark:text-emerald-400 font-semibold">HIGH TONE</span>. 
            Columns 3 & 4 are naturally <span className="text-rose-700 dark:text-rose-400 font-semibold">LOW TONE</span>. 
            With your Windows Tibetan voice, you will hear the exact native pitch distinction!
          </p>
        </div>

        {/* Column Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-200 dark:border-stone-800/60 text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200">
            <span className="font-bold block text-emerald-700 dark:text-emerald-400">Column 1</span>
            <span>High Tone • No Puff (Unaspirated)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/40 text-sky-900 dark:text-sky-200">
            <span className="font-bold block text-sky-700 dark:text-sky-400">Column 2</span>
            <span>High Tone • Air Burst (Aspirated)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200">
            <span className="font-bold block text-amber-700 dark:text-amber-400">Column 3</span>
            <span>Low Tone • Voiced / Breathy</span>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/40 text-purple-900 dark:text-purple-200">
            <span className="font-bold block text-purple-700 dark:text-purple-400">Column 4</span>
            <span>Low Tone • Nasal Ring (ng, ny, n, m)</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-500" />
          <span className="text-xs text-stone-500 dark:text-stone-400 uppercase font-semibold">Filter:</span>
          {[
            { id: 'all', label: 'All 30' },
            { id: 'high', label: 'High Tone (16)' },
            { id: 'low', label: 'Low Tone (14)' },
            { id: 'nasal', label: 'Nasals (4)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setFilter(item.id);
                audioEngine.playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === item.id
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-stone-500">
          Showing {filteredConsonants.length} consonants • Click any card for audio & mnemonic
        </p>
      </div>

      {/* Grid of Consonants */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
        {filteredConsonants.map((c) => {
          const isHigh = c.tone === 'high';
          return (
            <div
              key={c.tibetan}
              onClick={() => handleCardClick(c)}
              className="group relative bg-white dark:bg-stone-900/90 hover:bg-stone-50 dark:hover:bg-stone-850 border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500/60 rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-lg dark:shadow-none flex flex-col justify-between"
            >
              {/* Tone Badge */}
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-stone-400 dark:text-stone-500 font-mono">R{c.row}C{c.col}</span>
                <span
                  className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                    isHigh
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/50'
                      : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800/50'
                  }`}
                >
                  {c.tone}
                </span>
              </div>

              {/* Large Tibetan Glyph */}
              <div className="py-2">
                <span className="font-tibetan text-4xl sm:text-5xl text-stone-900 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors block">
                  {c.tibetan}
                </span>
              </div>

              {/* Wylie & Phonetics */}
              <div className="mt-1">
                <span className="font-mono font-bold text-sm text-stone-800 dark:text-stone-100 block">
                  {c.wylie}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                  /{c.phonetic}/
                </span>
              </div>

              {/* Audio button */}
              <button
                onClick={(e) => handlePlaySound(c, e)}
                className="mt-3 p-1.5 rounded-lg bg-stone-100 dark:bg-stone-950 hover:bg-amber-500 hover:text-stone-950 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800/80 transition flex items-center justify-center mx-auto w-full group/btn"
                title={`Listen to ${c.tibetan} (${c.wylie})`}
              >
                <Volume2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Consonant Detail Modal / Drawer */}
      {selectedConsonant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedConsonant(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-100 via-amber-50 to-stone-100 dark:from-rose-950 dark:via-stone-900 dark:to-amber-950 border-2 border-amber-400 dark:border-amber-500/60 flex items-center justify-center shadow-lg">
                <span className="font-tibetan text-5xl text-stone-900 dark:text-amber-300 font-bold">
                  {selectedConsonant.tibetan}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-stone-900 dark:text-amber-100 font-mono">
                    {selectedConsonant.wylie}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                      selectedConsonant.tone === 'high'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    {selectedConsonant.tone} Tone (55)
                  </span>
                </div>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">
                  Lhasa Phonetic: <span className="text-amber-700 dark:text-amber-300 font-semibold">/{selectedConsonant.phonetic}/</span> • Aspiration: <span className="capitalize">{selectedConsonant.aspiration}</span>
                </p>
                <button
                  onClick={() => handlePlaySound(selectedConsonant)}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear Native Sound</span>
                </button>
              </div>
            </div>

            {/* Visual Mnemonic Story */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Visual Memory Mnemonic:
              </span>
              <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                {selectedConsonant.mnemonic}
              </p>
            </div>

            {/* Stroke Guide */}
            {selectedConsonant.strokes && (
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800/80 mb-4 text-xs">
                <span className="font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                  Writing Order & Strokes:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-stone-700 dark:text-stone-300">
                  {selectedConsonant.strokes.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Sample Vocabulary Word */}
            {selectedConsonant.sampleWord && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50/40 dark:from-rose-950/40 dark:to-stone-950 border border-rose-200 dark:border-rose-900/40 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
                    Sample Word:
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-tibetan text-xl text-stone-900 dark:text-amber-300 font-bold">
                      {selectedConsonant.sampleWord.tibetan}
                    </span>
                    <span className="font-mono text-stone-600 dark:text-stone-300">
                      ({selectedConsonant.sampleWord.wylie})
                    </span>
                  </div>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                    Meaning: {selectedConsonant.sampleWord.meaning}
                  </span>
                </div>
                <button
                  onClick={() => audioEngine.playPhonetic(selectedConsonant.sampleWord.wylie, 'high', selectedConsonant.sampleWord.tibetan)}
                  className="p-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-amber-300 transition"
                  title="Listen to sample word"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
