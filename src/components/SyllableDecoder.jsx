import React, { useState, useEffect } from 'react';
import { Volume2, Play, Sparkles, AlertCircle, Info, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { parseTibetanPhrase, parseSyllable } from '../utils/tibetanParser';
import { CURATED_WORDS } from '../data/tibetanData';
import { audioEngine } from '../utils/audioEngine';

export default function SyllableDecoder({ onAddXp }) {
  const [inputText, setInputText] = useState('བཀྲ་ཤིས་བདེ་ལེགས');
  const [selectedWordObj, setSelectedWordObj] = useState(CURATED_WORDS[0]);
  const [parsedSyllables, setParsedSyllables] = useState([]);
  const [activeSyllableIdx, setActiveSyllableIdx] = useState(0);
  const [chantingStep, setChantingStep] = useState(-1);
  const [isChanting, setIsChanting] = useState(false);

  // Update syllables when input text changes
  useEffect(() => {
    const syllables = parseTibetanPhrase(inputText);
    setParsedSyllables(syllables);
    setActiveSyllableIdx(0);
  }, [inputText]);

  const activeSyllable = parsedSyllables[activeSyllableIdx] || null;

  const handleSelectCuratedWord = (word) => {
    setSelectedWordObj(word);
    setInputText(word.tibetan);
    audioEngine.playClick();
  };

  const handlePlaySound = (phonetic, tone, tibetanWord) => {
    const textToSpeak = tibetanWord || (activeSyllable ? activeSyllable.clean : inputText);
    audioEngine.playPhonetic(phonetic, tone, textToSpeak);
    if (onAddXp) onAddXp(5);
  };

  const handlePlayChant = () => {
    if (!activeSyllable || !activeSyllable.jorlokSteps || activeSyllable.jorlokSteps.length === 0) return;
    setIsChanting(true);
    setChantingStep(0);

    audioEngine.playChantFormula(activeSyllable.jorlokSteps, (stepIdx) => {
      setChantingStep(stepIdx);
      if (stepIdx === activeSyllable.jorlokSteps.length - 1) {
        setTimeout(() => {
          setIsChanting(false);
          setChantingStep(-1);
          if (onAddXp) onAddXp(15);
        }, 1200);
      }
    });
  };

  const appendTibetanChar = (char) => {
    setInputText((prev) => prev + char);
    audioEngine.playClick();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-100/70 via-stone-50 to-amber-100/50 dark:from-rose-950/70 dark:via-stone-900 dark:to-amber-950/40 border border-stone-200 dark:border-rose-900/50 p-6 sm:p-8 shadow-sm dark:shadow-2xl transition-colors">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            The Decryption Formula (སྦྱོར་ཀློག)
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-amber-100 mb-2">
            Tibetan Syllable Anatomy Decoder
          </h2>
          <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            In Tibetan, letters don’t read purely left-to-right. They cluster like architectural cubes around a single central 
            <strong className="text-amber-700 dark:text-amber-400 font-semibold"> Core Root Letter (མིང་གཞི)</strong>. 
            Once you identify the Root, everything else clicks into place effortlessly!
          </p>
        </div>

        {/* Quick Sample Selector Chips */}
        <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-800/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
            Try Famous Sacred & Everyday Phrases:
          </p>
          <div className="flex flex-wrap gap-2">
            {CURATED_WORDS.map((w) => (
              <button
                key={w.tibetan}
                onClick={() => handleSelectCuratedWord(w)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  inputText === w.tibetan
                    ? 'bg-rose-900 text-amber-100 border border-rose-700 shadow-md'
                    : 'bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
                }`}
              >
                <span className="font-tibetan text-base">{w.tibetan}</span>
                <span className="text-stone-500 dark:text-stone-400 text-[11px]">({w.phonetic})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input / Explorer Bar */}
      <div className="bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste Tibetan text (e.g. བཀྲ་ཤིས་ or བསྒྲུབས་)..."
              className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700/80 rounded-xl px-4 py-3 text-lg sm:text-xl font-tibetan text-stone-900 dark:text-amber-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
            />
          </div>
          <button
            onClick={() => setInputText('')}
            className="px-4 py-3 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-xs font-semibold transition"
          >
            Clear
          </button>
        </div>

        {/* Quick Tibetan Virtual Helpers for Mobile / Desktop without Tibetan keyboard */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-stone-500 dark:text-stone-400 scrollbar-none">
          <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 shrink-0">Quick Insert:</span>
          {['་', 'ི', 'ུ', 'ེ', 'ོ', 'ྱ', 'ྲ', 'ླ', 'ྭ', '།', 'བ', 'ས', 'ག', 'ད'].map((ch) => (
            <button
              key={ch}
              onClick={() => appendTibetanChar(ch)}
              className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 font-tibetan text-stone-800 dark:text-amber-300 text-sm hover:scale-110 active:scale-95 transition"
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Syllable Selector (If multiple syllables in phrase) */}
      {parsedSyllables.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
            Syllables ({parsedSyllables.length}):
          </span>
          {parsedSyllables.map((syl, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSyllableIdx(idx);
                audioEngine.playClick();
              }}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeSyllableIdx === idx
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950 font-bold scale-105'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span className="font-tibetan text-lg">{syl.clean}</span>
              <span className="text-xs opacity-80">({syl.phoneticResult})</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Breakdown Section */}
      {activeSyllable ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Visual 7-Slot Anatomy Cube */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800/90 rounded-3xl p-6 sm:p-7 shadow-sm dark:shadow-2xl relative transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Syllable Architecture
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <h3 className="font-tibetan text-4xl sm:text-5xl text-stone-900 dark:text-amber-300 font-bold tracking-wide">
                    {activeSyllable.clean}
                  </h3>
                  <span className="text-stone-500 dark:text-stone-400 text-lg font-medium">
                    = <span className="text-amber-700 dark:text-amber-200 font-semibold">{activeSyllable.phoneticResult}</span>
                  </span>
                </div>
              </div>

              {/* Sound & Chant Trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlaySound(activeSyllable.phoneticResult, activeSyllable.calculatedTone, activeSyllable.clean)}
                  className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 text-stone-950 font-bold hover:scale-105 active:scale-95 shadow-md transition flex items-center gap-1.5"
                  title="Listen to Syllable Pronunciation"
                >
                  <Volume2 className="w-5 h-5 text-stone-950" />
                  <span className="text-xs font-extrabold pr-1">Hear</span>
                </button>
              </div>
            </div>

            {/* The 7 Slot Visualization */}
            <div className="bg-stone-50 dark:bg-stone-950/80 rounded-2xl p-5 border border-stone-200 dark:border-stone-800/80 mb-6 transition-colors">
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>The 7 Anatomical Positions:</span>
                <span className="text-amber-700 dark:text-amber-400/90 font-mono text-[11px]">Center = Anchor</span>
              </p>

              {/* Graphical Anatomy Cube */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 text-center">
                {/* 1. Prefix */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeSyllable.prefix
                      ? 'bg-emerald-950/60 border-emerald-700/70 text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'bg-stone-900/40 border-stone-800/40 text-stone-600'
                  }`}
                >
                  <span className="text-[10px] block font-bold uppercase tracking-wider text-stone-400">
                    1. Prefix (སྔོན)
                  </span>
                  <span className="font-tibetan text-2xl font-bold my-1 block">
                    {activeSyllable.prefix || '—'}
                  </span>
                  <span className="text-[10px] text-stone-400 block">
                    {activeSyllable.prefix ? 'Silent (Elevates)' : 'None'}
                  </span>
                </div>

                {/* 2 & 3 & 4: The Central Stack (Head, Root, Subscript) */}
                <div className="col-span-1 sm:col-span-3 grid grid-cols-1 gap-2 bg-stone-900/30 p-2 rounded-xl border border-amber-900/30">
                  {/* Superscript */}
                  <div
                    className={`p-2 rounded-lg border text-center transition-all ${
                      activeSyllable.superscript
                        ? 'bg-purple-950/70 border-purple-700/70 text-purple-300'
                        : 'bg-stone-900/30 border-stone-800/30 text-stone-600'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      2. Head / Superscript (མགོ)
                    </span>
                    <span className="font-tibetan text-xl font-bold block">
                      {activeSyllable.superscript || '—'}
                    </span>
                  </div>

                  {/* Core Root Letter (Gilded Highlight) */}
                  <div
                    className="p-3 rounded-xl bg-gradient-to-r from-amber-900/80 via-amber-950 to-rose-950 border-2 border-amber-500/80 text-amber-200 shadow-lg shadow-amber-950/60 gold-glow"
                  >
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1">
                      ⭐ 3. Core Root (མིང་གཞི)
                    </span>
                    <span className="font-tibetan text-3xl font-black text-amber-300 block my-0.5">
                      {activeSyllable.root || '—'}
                    </span>
                    <span className="text-[11px] text-amber-200/90 font-medium">
                      Base sound: {activeSyllable.coreConsonantSound}
                    </span>
                  </div>

                  {/* Subscript */}
                  <div
                    className={`p-2 rounded-lg border text-center transition-all ${
                      activeSyllable.subscript
                        ? 'bg-cyan-950/70 border-cyan-700/70 text-cyan-300'
                        : 'bg-stone-900/30 border-stone-800/30 text-stone-600'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      4. Subscript (འདོགས)
                    </span>
                    <span className="font-tibetan text-xl font-bold block">
                      {activeSyllable.subscript || '—'}
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      {activeSyllable.subscriptName || 'None'}
                    </span>
                  </div>
                </div>

                {/* 5. Vowel */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeSyllable.vowel
                      ? 'bg-rose-950/70 border-rose-700/70 text-rose-300 ring-2 ring-rose-500/20'
                      : 'bg-stone-900/40 border-stone-800/40 text-stone-600'
                  }`}
                >
                  <span className="text-[10px] block font-bold uppercase tracking-wider text-stone-400">
                    5. Vowel (དབྱངས)
                  </span>
                  <span className="font-tibetan text-2xl font-bold my-1 block">
                    {activeSyllable.vowel || 'a (implicit)'}
                  </span>
                  <span className="text-[10px] text-stone-400 block">
                    {activeSyllable.vowelName || 'Pure A'}
                  </span>
                </div>

                {/* 6. Suffix */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeSyllable.suffix
                      ? 'bg-sky-950/70 border-sky-700/70 text-sky-300 ring-2 ring-sky-500/20'
                      : 'bg-stone-900/40 border-stone-800/40 text-stone-600'
                  }`}
                >
                  <span className="text-[10px] block font-bold uppercase tracking-wider text-stone-400">
                    6. Suffix (རྗེས)
                  </span>
                  <span className="font-tibetan text-2xl font-bold my-1 block">
                    {activeSyllable.suffix || '—'}
                  </span>
                  <span className="text-[10px] text-stone-400 block">
                    {activeSyllable.isUmlauted ? 'Umlaut Fronting' : activeSyllable.suffixSound || 'None'}
                  </span>
                </div>

                {/* 7. Post-suffix */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeSyllable.postsuffix
                      ? 'bg-amber-950/70 border-amber-700/70 text-amber-300'
                      : 'bg-stone-900/40 border-stone-800/40 text-stone-600'
                  }`}
                >
                  <span className="text-[10px] block font-bold uppercase tracking-wider text-stone-400">
                    7. Post-Suffix (ཡང)
                  </span>
                  <span className="font-tibetan text-2xl font-bold my-1 block">
                    {activeSyllable.postsuffix || '—'}
                  </span>
                  <span className="text-[10px] text-stone-400 block">
                    {activeSyllable.postsuffix ? 'Silent (Falling)' : 'None'}
                  </span>
                </div>
              </div>
            </div>

            {/* Rules Applied Summary */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-950/50 border border-stone-800 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">Tone Analysis: </strong>
                  <span>
                    The final tone is{' '}
                    <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold uppercase">
                      {activeSyllable.calculatedTone} Tone
                    </span>
                    {activeSyllable.toneElevated
                      ? ' (Originally a low-tone root, but elevated to High Tone by prefix/superscript!)'
                      : ' (Follows the intrinsic root letter pitch).'}
                  </span>
                </div>
              </div>

              {activeSyllable.mutationExplanation && (
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cyan-300">Subscript Sound Mutation: </strong>
                    <span>{activeSyllable.mutationExplanation}</span>
                  </div>
                </div>
              )}

              {activeSyllable.isUmlauted && (
                <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-800/40 text-sky-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sky-300">Vowel Umlaut Fronting: </strong>
                    <span>{activeSyllable.umlautNote}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Traditional Jor-lok (Spelling Chant) Player */}
          <div className="lg:col-span-5 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800/90 rounded-3xl p-6 sm:p-7 shadow-sm dark:shadow-2xl flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                    Traditional Pedagogy
                  </span>
                  <h4 className="font-title text-xl font-bold text-stone-900 dark:text-amber-100">
                    Spelling Chant (སྦྱོར་ཀློག)
                  </h4>
                </div>
                <button
                  onClick={handlePlayChant}
                  disabled={isChanting}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isChanting
                      ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                      : 'bg-rose-900 text-amber-100 dark:bg-rose-900/80 dark:text-amber-200 hover:brightness-110 shadow-md'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${isChanting ? 'animate-spin' : ''}`} />
                  <span>{isChanting ? 'Reciting...' : 'Play Chant'}</span>
                </button>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
                Tibetan children master reading within weeks through rhythmic chanting. Watch each step assemble the sound:
              </p>

              {/* Steps List */}
              <div className="space-y-2.5">
                {activeSyllable.jorlokSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                      chantingStep === idx
                        ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md scale-102 font-bold'
                        : 'bg-stone-50 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800/70 text-stone-800 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          chantingStep === idx ? 'bg-stone-950 text-amber-400' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span>{step.text}</span>
                    </div>

                    <button
                      onClick={() => handlePlaySound(step.sound, 'high', activeSyllable.clean)}
                      className={`p-1 rounded-lg ${
                        chantingStep === idx ? 'text-stone-950 hover:bg-amber-600' : 'text-stone-400 hover:text-amber-600 dark:hover:text-amber-400'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Target Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-100/70 via-stone-50 to-amber-100/50 dark:from-rose-950/90 dark:to-stone-950 border border-rose-200 dark:border-rose-800/50 flex items-center justify-between transition-colors">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
                  Final Decoded Result
                </span>
                <span className="text-2xl font-black text-stone-900 dark:text-amber-300">
                  {activeSyllable.phoneticResult}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
                  Tone: {activeSyllable.calculatedTone} flat/falling
                </span>
              </div>
              <button
                onClick={() => handlePlaySound(activeSyllable.phoneticResult, activeSyllable.calculatedTone, activeSyllable.clean)}
                className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shadow-md"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-stone-900/40 rounded-3xl border border-stone-200 dark:border-stone-800">
          <p className="text-stone-500 dark:text-stone-400">Please enter Tibetan text above to begin decoding.</p>
        </div>
      )}
    </div>
  );
}
