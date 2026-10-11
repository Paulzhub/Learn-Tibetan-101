import React, { useState } from 'react';
import { Volume2, Sparkles, Compass, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SUBSCRIPTS, SUPERSCRIPTS, PREFIXES, SUFFIXES, UMLAUT_RULES } from '../data/tibetanData';
import { audioEngine } from '../utils/audioEngine';

export default function StackingAndAffixes({ onAddXp }) {
  const [activeSection, setActiveSection] = useState('subscripts'); // 'subscripts', 'superscripts', 'affixes', 'umlauts'
  const [selectedSubscript, setSelectedSubscript] = useState(SUBSCRIPTS[0]);
  const [selectedSuperscript, setSelectedSuperscript] = useState(SUPERSCRIPTS[0]);

  // Umlaut interactive tester state
  const [umlautVowel, setUmlautVowel] = useState('a');
  const [umlautSuffix, setUmlautSuffix] = useState('ད');

  const getUmlautResult = (v, suff) => {
    let resultVowel = v;
    if (v === 'a') resultVowel = 'ä (like "e" in pet)';
    if (v === 'o') resultVowel = 'ö (like French "eu" / German "ö")';
    if (v === 'u') resultVowel = 'ü (like French "u" / German "ü")';
    return resultVowel;
  };

  const handlePlaySound = (phonetic, tone = 'high') => {
    audioEngine.playPhonetic(phonetic, tone);
    if (onAddXp) onAddXp(2);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950/60 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            Stacking & Tone Mechanics
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-100 mb-2">
            The Stacking & Affix Masterclass
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            In Tibetan, when letters attach above, below, or to the sides of a root, they cause predictable sound shifts:
            subscripts change the consonant sound, superscripts & prefixes elevate the pitch to high tone, and suffixes front vowels into umlauts.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-stone-800/60 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'subscripts', label: '1. Subscripts (འདོགས་ཅན)' },
            { id: 'superscripts', label: '2. Superscripts (མགོ་ཅན)' },
            { id: 'affixes', label: '3. Prefixes & Suffixes' },
            { id: 'umlauts', label: '4. Vowel Umlaut Fronting' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                audioEngine.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                activeSection === sec.id
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. SUBSCRIPTS SECTION */}
      {activeSection === 'subscripts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SUBSCRIPTS.map((sub) => (
              <button
                key={sub.name}
                onClick={() => {
                  setSelectedSubscript(sub);
                  audioEngine.playClick();
                }}
                className={`p-4 rounded-2xl border text-left transition ${
                  selectedSubscript.name === sub.name
                    ? 'bg-rose-950/80 border-amber-500 shadow-xl shadow-rose-950/60 ring-2 ring-amber-500/20'
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-tibetan text-3xl text-amber-300 font-bold">{sub.char}</span>
                  <span className="text-[10px] text-stone-500 font-mono">4 Subscripts</span>
                </div>
                <h4 className="font-bold text-sm text-stone-100">{sub.name}</h4>
                <p className="text-[11px] text-stone-400 mt-1 truncate">{sub.meaning}</p>
              </button>
            ))}
          </div>

          {/* Subscript Details & Examples Grid */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-tibetan text-4xl text-amber-300">{selectedSubscript.char}</span>
                <div>
                  <h3 className="font-title text-xl font-bold text-stone-100">
                    {selectedSubscript.name}
                  </h3>
                  <span className="text-xs text-rose-400 font-medium">{selectedSubscript.meaning}</span>
                </div>
              </div>
              <p className="text-sm text-stone-300 mt-2 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
                💡 <strong className="text-amber-300">Transformation Rule: </strong>
                {selectedSubscript.rule}
              </p>
            </div>

            {/* Before / After Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedSubscript.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-stone-950/90 border border-stone-800/80 hover:border-amber-500/40 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <span className="font-tibetan text-2xl text-stone-400 block">{ex.base}</span>
                      <span className="text-[10px] text-stone-500">Root</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
                    <div className="text-center">
                      <span className="font-tibetan text-3xl text-amber-300 font-bold block">{ex.sub}</span>
                      <span className="text-[10px] font-mono text-stone-400">/{ex.wylie}/</span>
                    </div>
                    <div className="ml-1">
                      <span className="text-xs font-bold text-amber-200 block">
                        {ex.phonetic}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {ex.note}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlaySound(ex.phonetic, 'high')}
                    className="p-2 rounded-xl bg-stone-900 group-hover:bg-amber-500 group-hover:text-stone-950 text-stone-400 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SUPERSCRIPTS SECTION */}
      {activeSection === 'superscripts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SUPERSCRIPTS.map((sup) => (
              <div
                key={sup.name}
                className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-tibetan text-4xl text-amber-300 font-bold">{sup.char}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                      Head Letter
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-100">{sup.name}</h4>
                  <p className="text-xs text-stone-300 mt-2 bg-stone-950 p-3 rounded-xl border border-stone-800 leading-relaxed">
                    {sup.rule}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Examples:</span>
                  {sup.examples.map((ex, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-stone-950/60">
                      <div className="flex items-center gap-2">
                        <span className="font-tibetan text-xl text-amber-200">{ex.stack}</span>
                        <span className="font-mono text-stone-300">({ex.wylie})</span>
                        <span className="text-stone-400 font-medium">→ /{ex.phonetic}/</span>
                      </div>
                      <button
                        onClick={() => handlePlaySound(ex.phonetic, 'high')}
                        className="p-1 rounded text-stone-400 hover:text-amber-400"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PREFIXES & SUFFIXES SECTION */}
      {activeSection === 'affixes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prefixes */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              The 5 Prefixes (སྔོན་འཇུག Ngon-juk)
            </span>
            <h3 className="font-title text-xl font-bold text-stone-100 mb-3">
              ག་ • ད་ • བ་ • མ་ • འ
            </h3>
            <p className="text-xs text-stone-300 mb-4 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/50">
              ⚡ <strong>Golden Rule:</strong> Prefixes are completely <strong>silent</strong> in modern Lhasa Tibetan. 
              Their magical function is to <strong>elevate low tone roots to High Tone</strong> and stabilize vowel clarity!
            </p>

            <div className="space-y-2">
              {PREFIXES.map((p) => (
                <div key={p.char} className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-tibetan text-2xl text-emerald-300 font-bold">{p.char}</span>
                    <div>
                      <span className="font-bold text-stone-200 block">{p.name} ({p.wylie})</span>
                      <span className="text-stone-400">{p.note}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suffixes */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-1">
              The 10 Suffixes (རྗེས་འཇུག Je-juk)
            </span>
            <h3 className="font-title text-xl font-bold text-stone-100 mb-3">
              ག་ ང་ ད་ ན་ བ་ མ་ འ་ ར་ ལ་ ས་
            </h3>
            <p className="text-xs text-stone-300 mb-4 bg-sky-950/30 p-3 rounded-xl border border-sky-900/50">
              🌪️ Suffixes close syllables. Notice that <strong>ད་, ན་, ལ་, ས་</strong> trigger <strong>Vowel Umlaut Fronting</strong> (a→ä, o→ö, u→ü)!
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {SUFFIXES.map((s) => (
                <div key={s.char} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-tibetan text-2xl text-sky-300 font-bold">{s.char}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      s.umlaut ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-stone-900 text-stone-500'
                    }`}>
                      {s.umlaut ? 'Umlauts' : 'Standard'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-amber-200 mt-1">/{s.sound}/</span>
                  <span className="text-[10px] text-stone-400 mt-0.5 truncate">{s.example}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. UMLAUT FRONTING SECTION */}
      {activeSection === 'umlauts' && (
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The Famous Tibetan Vowel Shift
            </span>
            <h3 className="font-title text-2xl font-bold text-stone-100 mt-1">
              Vowel Umlaut Calculator (ད་ ན་ ལ་ ས་)
            </h3>
            <p className="text-stone-300 text-sm mt-2 leading-relaxed">
              Whenever a syllable has suffixes <span className="text-amber-300 font-bold font-tibetan">ད་ (d)</span>, <span className="text-amber-300 font-bold font-tibetan">ན་ (n)</span>, <span className="text-amber-300 font-bold font-tibetan">ལ་ (l)</span>, or <span className="text-amber-300 font-bold font-tibetan">ས་ (s)</span>, 
              the preceding vowel undergoes <em>umlauting (fronting)</em>. This is why བོད (bod) is pronounced <strong className="text-rose-400">"Bö"</strong>, not "Bod"!
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-stone-950 rounded-2xl p-6 border border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Step 1: Base Vowel */}
            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                1. Select Base Vowel:
              </label>
              <div className="flex gap-2">
                {[
                  { v: 'a', label: 'a (pure)' },
                  { v: 'o', label: 'o (pure)' },
                  { v: 'u', label: 'u (pure)' },
                ].map((item) => (
                  <button
                    key={item.v}
                    onClick={() => {
                      setUmlautVowel(item.v);
                      audioEngine.playClick();
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                      umlautVowel === item.v
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-900 text-stone-300 border border-stone-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Umlauting Suffix */}
            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                2. Add Umlaut Suffix:
              </label>
              <div className="flex gap-2">
                {['ད་', 'ན་', 'ལ་', 'ས་'].map((sf) => (
                  <button
                    key={sf}
                    onClick={() => {
                      setUmlautSuffix(sf);
                      audioEngine.playClick();
                    }}
                    className={`flex-1 py-2 rounded-xl font-tibetan text-xl transition ${
                      umlautSuffix === sf
                        ? 'bg-rose-900 text-amber-200 border border-rose-600 shadow-md'
                        : 'bg-stone-900 text-stone-300 border border-stone-800'
                    }`}
                  >
                    {sf}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950 via-stone-900 to-amber-950 border border-rose-800/60 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Resulting Fronted Vowel
              </span>
              <span className="text-2xl font-black text-amber-200 block">
                {getUmlautResult(umlautVowel, umlautSuffix)}
              </span>
              <button
                onClick={() => handlePlaySound(umlautVowel === 'a' ? 'ä' : umlautVowel === 'o' ? 'ö' : 'ü', 'high')}
                className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition"
              >
                <Volume2 className="w-3.5 h-3.5" /> Hear Fronted Sound
              </button>
            </div>
          </div>

          {/* Reference Table */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {UMLAUT_RULES.map((rule, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800">
                <span className="font-bold text-amber-300 block mb-1">{rule.base} {rule.withSuffix}</span>
                <span className="text-stone-200 block font-semibold">{rule.result}</span>
                <span className="text-stone-400 text-[11px] mt-1 block">Example: {rule.example}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
