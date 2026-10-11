# Learn Tibetan 101 (བོད་ཡིག་སྦྱོང་བ)
### Fast-Track Tibetan Reading Mastery PWA

A modern, responsive Progressive Web App (PWA) designed to teach reading Classical and Modern Tibetan (Uchen script / དབུ་ཅན་) in the fastest, most intuitive, and scientifically optimal way.

---

## ⚡ The Pedagogical Unlock: Why Traditional Methods Feel Slow & How This Solves It

Standard Tibetan learning materials present the script as a linear alphabet. However, Tibetan words are structured like **3-dimensional anatomical cubes** clustered around a single **Core Root Letter (མིང་གཞི Mingzhi)**.

This app breaks down Tibetan reading into an algorithmic sequence:
1. **The 4-Column Tonal Matrix (30 Consonants):**
   - Columns 1 & 2 are inherently **High Tone** (Ka, Kha, Ca, Cha, Ta, Tha, Pa, Pha, Tsa, Tsha).
   - Columns 3 & 4 are inherently **Low Tone** (Ga, Nga, Ja, Nya, Da, Na, Ba, Ma, Dza, Wa).
2. **The 4 Vowel Signs (དབྱངས་བཞི):**
   - Inherent vowel is `a`.
   - Gi-gu (ི i), Zhab-kyu (ུ u), Dreng-bu (ེ e), Na-ro (ོ o).
3. **Subscript Sound Mutations (འདོགས་ཅན):**
   - **Ya-ta (ྱ):** Transforms velars & labials into palatals (`k-ya` → *ca*, `b-ya` → *ja*, `m-ya` → *nya*).
   - **Ra-ta (ྲ):** Transforms letters into retroflex sounds (`kra` → *tra*, `gra` → *thra*).
   - **La-ta (ླ):** All consonants become pure **High Tone "La"** (except `zla` → *High Da*).
   - **Wa-zur (ྭ):** Distinguishes homophones.
4. **Superscript & Prefix Tone Elevation:**
   - Head letters (Ra-go ར, La-go ལ, Sa-go ས) and Prefixes (ག་, ད་, བ་, མ་, འ) are silent in Lhasa Tibetan, but elevate low tone roots to **High Tone**.
5. **Vowel Fronting / Umlauts (ད་, ན་, ལ་, ས་):**
   - Mutate vowels: `a` → **ä**, `o` → **ö**, `u` → **ü**.
6. **The Traditional Spelling Formula (Jor-lok / སྦྱོར་ཀློག):**
   - Step-by-step rhythmic chanting that Tibetans have used for centuries to achieve instant reading fluency.

---

## 🚀 Key Features

* **Syllable Anatomy Decoder (Flagship Feature):**
  - Type or paste *any* Tibetan text, or click from 60+ preloaded sacred and daily phrases (*Tashi Delek, Om Mani Padme Hum, Sangye, Lhasa, Bö-ke, Drub, Lama, etc.*).
  - Visual 7-Slot dissector: `[Prefix]` + `[Head]` + `[Root]` + `[Subscript]` + `[Vowel]` + `[Suffix]` + `[Post-suffix]`.
  - Step-by-step Jor-lok chanting player with visual highlights and auditory synthesis.
* **Consonant Matrix (གསལ་བྱེད་སུམ་ཅུ):**
  - 4-Column tone-coded grid with memory mnemonics, stroke order, and pronunciation audio.
* **Vowel Laboratory:**
  - Interactive Consonant-Vowel morphing simulator with real-time Unicode combining and acoustic formants.
* **Stacking & Tone Mechanics Lab:**
  - Interactive Subscript sound shift explorer, Superscript tone elevator, and Vowel Umlaut fronting calculator.
* **Kinesthetic Calligraphy & Tracing Pad:**
  - Touch and mouse-friendly HTML5 canvas with Tibetan baseline guides and stroke hints.
* **Practice Grounds:**
  - **Spaced Repetition Flashcards** (keyboard shortcuts: Space, flip, next).
  - **Syllable Decipher Quiz** with instant score and explanation.
  - **60-Second Reading Sprint** with particle confetti and high-score saving in `localStorage`.
* **Tibetan Audio Synthesizer Engine:**
  - Web Audio API formant filters (F1/F2/F3 for a, i, u, e, o, ä, ö, ü) with Tibetan pitch curves (High Flat 55, Low Rising 13/14, High Falling 53) and authentic singing bowl acoustics.
* **PWA & Offline Capability:**
  - `manifest.json` and custom Service Worker caching assets for 100% offline usage.
  - Installable to home screen on iOS, Android, macOS, and Windows.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 with custom Himalayan prayer flag elements and Tibetan typography (`Noto Sans Tibetan`, `Noto Serif Tibetan`, `Cinzel`)
- **Audio:** Web Audio API Native Synthesizer & Speech Engine
- **Icons & Effects:** Lucide React, Canvas Confetti

---

## 📱 Running the Project

```bash
# Start Development Server
npm run dev

# Build Production Assets
npm run build

# Preview Production Build
npm run preview
```
