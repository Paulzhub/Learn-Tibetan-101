import React from 'react';
import { X, Printer, Sparkles } from 'lucide-react';
import { CONSONANTS, VOWELS, SUBSCRIPTS, SUPERSCRIPTS, PREFIXES, SUFFIXES, UMLAUT_RULES } from '../data/tibetanData';

export default function CheatSheetModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700/80 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Reading Reference
            </span>
            <h3 className="font-title text-2xl font-bold text-stone-900 dark:text-stone-100">
              Tibetan Reading Master Cheat Sheet
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition hidden sm:flex items-center gap-1 text-xs"
              title="Print Cheat Sheet"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6 text-xs text-stone-700 dark:text-stone-300">
          {/* 1. 4-Column Consonants Table */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
            <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm mb-3">
              1. The 30 Consonants: 4-Column Tonal Matrix
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/40 rounded-xl text-emerald-900 dark:text-emerald-300">
                <span className="font-bold block text-[11px]">COL 1: High Unasp.</span>
                <span className="font-tibetan text-lg font-bold block my-1">ཀ ཅ ཏ པ ཙ</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">ka, ca, ta, pa, tsa</span>
              </div>
              <div className="p-2 bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800/40 rounded-xl text-sky-900 dark:text-sky-300">
                <span className="font-bold block text-[11px]">COL 2: High Asp.</span>
                <span className="font-tibetan text-lg font-bold block my-1">ཁ ཆ ཐ ཕ ཚ</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">kha, cha, tha, pha, tsha</span>
              </div>
              <div className="p-2 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/40 rounded-xl text-amber-900 dark:text-amber-300">
                <span className="font-bold block text-[11px]">COL 3: Low Voiced</span>
                <span className="font-tibetan text-lg font-bold block my-1">ག ཇ ད བ ཛ</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">ga, ja, da, ba, dza</span>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/40 rounded-xl text-purple-900 dark:text-purple-300">
                <span className="font-bold block text-[11px]">COL 4: Low Nasal</span>
                <span className="font-tibetan text-lg font-bold block my-1">ང ཉ ན མ ཝ</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400">nga, nya, na, ma, wa</span>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
              Remaining: ཞ (zha - low), ཟ (za - low), འ ('a - low), ཡ (ya - low), ར (ra - low), ལ (la - low), ཤ (sha - high), ས (sa - high), ཧ (ha - high), ཨ (a - high).
            </p>
          </div>

          {/* 2. Vowels & Umlauts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <h4 className="font-bold text-amber-700 dark:text-amber-300 text-sm mb-2">
                2. The 4 Vowel Diacritics (དབྱངས་བཞི)
              </h4>
              <ul className="space-y-1.5">
                <li><strong className="text-stone-900 dark:text-stone-100 font-tibetan text-base">ི</strong> <strong>Gi-gu:</strong> "i" (ee as in see) - hook on top</li>
                <li><strong className="text-stone-900 dark:text-stone-100 font-tibetan text-base">ུ</strong> <strong>Zhab-kyu:</strong> "u" (oo as in moon) - hook below</li>
                <li><strong className="text-stone-900 dark:text-stone-100 font-tibetan text-base">ེ</strong> <strong>Dreng-bu:</strong> "e" (ay as in say) - horn on top</li>
                <li><strong className="text-stone-900 dark:text-stone-100 font-tibetan text-base">ོ</strong> <strong>Na-ro:</strong> "o" (oh as in go) - ears on top</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <h4 className="font-bold text-rose-700 dark:text-rose-300 text-sm mb-2">
                3. Vowel Fronting (Umlauts with ད་ ན་ ལ་ ས་)
              </h4>
              <ul className="space-y-1.5">
                <li>• <strong>a + (d, n, l, s)</strong> → <strong>ä</strong> (like "e" in pet)</li>
                <li>• <strong>o + (d, n, l, s)</strong> → <strong>ö</strong> (like German ö / French eu)</li>
                <li>• <strong>u + (d, n, l, s)</strong> → <strong>ü</strong> (like German ü / French u)</li>
                <li>• <em>Note:</em> <strong>ད་</strong> and <strong>ས་</strong> are silent and add a falling tone.</li>
              </ul>
            </div>
          </div>

          {/* 3. Subscripts & Superscripts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <h4 className="font-bold text-cyan-700 dark:text-cyan-300 text-sm mb-2">
                4. Subscripts (འདོགས་ཅན) Sound Morphing
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>• <strong>Ya-ta (ྱ):</strong> turns velars/labials to palatal ch/j (kya→ca, phya→cha, bya→ja).</li>
                <li>• <strong>Ra-ta (ྲ):</strong> turns consonants into retroflex tra/thra (kra→tra, gra→thra).</li>
                <li>• <strong>La-ta (ླ):</strong> ALL turn into pure HIGH LA! (Except zla→da).</li>
                <li>• <strong>Wa-zur (ྭ):</strong> silent, clarifies homophones.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 text-sm mb-2">
                5. Superscripts & Tone Elevation
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>• <strong>Ra-go (ར), La-go (ལ), Sa-go (ས):</strong> remain silent!</li>
                <li>• <strong>Tone Elevation Rule:</strong> When low consonants (Ga, Ja, Da, Ba, Dza) have a head letter, their tone rises to <strong>HIGH TONE</strong>.</li>
                <li>• <strong>The 5 Prefixes (ག་ ད་ བ་ མ་ འ):</strong> also silent, and elevate tone to High!</li>
              </ul>
            </div>
          </div>

          {/* 4. The 7-Slot Anatomy Reminder */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-100/70 via-stone-50 to-amber-100/40 dark:from-rose-950/60 dark:to-stone-950 border border-rose-200 dark:border-rose-900/50">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-1">
              6. Deciphering Any Syllable (The Golden Algorithm)
            </h4>
            <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
              Find the <strong>Core Root (མིང་གཞི)</strong> first! The root is the letter with any vowel sign or subscript. 
              Prefixes are only from the 5 set [ག, ད་, བ་, མ་, འ]. 
              Once the root is known, check if prefixes/heads elevate the tone to High, apply subscript consonant shifts, apply vowel, and front the vowel if suffix is [ད་, ན་, ལ་, ས་]. Done!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
