// High-Clarity Tibetan Phonetic Audio Engine & Speech Synthesizer

class TibetanAudioEngine {
  constructor() {
    this.ctx = null;
    this.voices = [];
    this.isVoicesLoaded = false;
    this.initVoices();
  }

  initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
          this.isVoicesLoaded = true;
        };
      }
    }
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Find the clearest and most natural voice available
  getBestVoice() {
    if (!this.voices || this.voices.length === 0) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        this.voices = window.speechSynthesis.getVoices();
      }
    }

    // 1. Look for Tibetan voice if available
    const tibetanVoice = this.voices.find(v => v.lang.startsWith('bo'));
    if (tibetanVoice) return tibetanVoice;

    // 2. Look for natural English or Indic voices (Hindi, Nepali) that articulate Sanskrit/Tibetan phonetics crisply
    const preferredVoice = this.voices.find(v => 
      (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen'))) ||
      v.lang.startsWith('hi') || v.lang.startsWith('ne')
    );
    if (preferredVoice) return preferredVoice;

    // 3. Fallback to any English or default voice
    const englishVoice = this.voices.find(v => v.lang.startsWith('en'));
    return englishVoice || this.voices[0] || null;
  }

  // Clean phonetic text for crisp, intelligible speech
  normalizePhoneticForSpeech(input) {
    if (!input) return 'Ah';

    let str = input.toString();

    // Remove editorial notes, parentheses, brackets, slashes
    str = str.replace(/\(.*?\)/g, '');
    str = str.replace(/\[.*?\]/g, '');
    str = str.replace(/\/.*?\//g, '');
    str = str.replace(/high|low|flat|falling|sharp|breathy|voiced|nasal/gi, '');

    // Handle slash alternatives like "ga / kha" -> take first one
    if (str.includes('/')) {
      str = str.split('/')[0];
    }

    str = str.trim();

    // Specialized phonetic mapping for crystal-clear enunciation
    const PHONETIC_MAP = {
      'ka': 'Kah',
      'kha': 'Kha',
      'ga': 'Gha',
      'nga': 'Nga',
      'ca': 'Cha',
      'cha': 'Chha',
      'chha': 'Chha',
      'ja': 'Jha',
      'nya': 'Nya',
      'ta': 'Tah',
      'tha': 'Thah',
      'da': 'Dah',
      'na': 'Nah',
      'pa': 'Pah',
      'pha': 'Phah',
      'ba': 'Bah',
      'ma': 'Mah',
      'tsa': 'Tsa',
      'tsha': 'Tsha',
      'dza': 'Dza',
      'wa': 'Wah',
      'zha': 'Zha',
      'za': 'Zah',
      "'a": 'Ah',
      'a': 'Ah',
      'ya': 'Yah',
      'ra': 'Rah',
      'la': 'Lah',
      'sha': 'Shah',
      'sa': 'Sah',
      'ha': 'Hah',

      // Vowels
      'i': 'Ee',
      'u': 'Oo',
      'e': 'Ay',
      'o': 'Oh',
      'ä': 'Eh',
      'ö': 'Ur',
      'ü': 'Yoo',

      // Combinations & Subscripts
      'kya': 'Cha',
      'khya': 'Chha',
      'gya': 'Jha',
      'pya': 'Cha',
      'phya': 'Chha',
      'bya': 'Jha',
      'mya': 'Nya',
      'kra': 'Tra',
      'khra': 'Thra',
      'gra': 'Thra',
      'tra': 'Tra',
      'thra': 'Thra',
      'dra': 'Thra',
      'pra': 'Tra',
      'phra': 'Thra',
      'bra': 'Thra',
      'kla': 'Lah',
      'gla': 'Lah',
      'bla': 'Lah',
      'zla': 'Dah',
      'rla': 'Lah',
      'sla': 'Lah',

      // Words & Mantras
      'tashi delek': 'Tah-shee Deh-lek',
      'om mani padme hum': 'Ohm Mah-nee Pahd-may Hoom',
      'sangye': 'Sahng-gyay',
      'drub': 'Droop',
      'lama': 'Lah-mah',
      'lhasa': 'Hlah-sah',
      'thukje-che': 'Took-jay-chay',
      'thukje che': 'Took-jay-chay',
      'bö-ke': 'Bö kay',
      'chos': 'Chö',
      'ting nge \'dzin': 'Ting-ngay-dzin'
    };

    const lower = str.toLowerCase();
    if (PHONETIC_MAP[lower]) {
      return PHONETIC_MAP[lower];
    }

    return str || 'Ah';
  }

  // Play crystal-clear phonetic pronunciation
  playPhonetic(phoneticStr, toneType = 'high', duration = 0.6) {
    if (typeof window === 'undefined') return;

    const spokenText = this.normalizePhoneticForSpeech(phoneticStr);

    // Play subtle soft bell harmonic in background for authentic tone feel
    this.playSoftHarmonic(toneType === 'low' ? 190 : 260);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(spokenText);
      const voice = this.getBestVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Pitch: Elevate slightly for High Tone, lower for Low Tone to teach tones audibly
      if (toneType === 'high' || toneType === 'high flat (55)') {
        utterance.pitch = 1.15;
      } else if (toneType === 'low' || toneType === 'low level (13)' || toneType === 'low falling (12)') {
        utterance.pitch = 0.90;
      } else {
        utterance.pitch = 1.0;
      }

      // Slightly slower speech rate so every consonant aspiration is crystal clear
      utterance.rate = 0.85;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    }
  }

  // Subtle clean acoustic chime accompanying the pronunciation
  playSoftHarmonic(freq = 240) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      // Very soft background bell chime (0.04 gain)
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    } catch (e) {}
  }

  // Play Traditional Spelling Chant (Jor-lok) with clear articulate recitation
  playChantFormula(steps, onStepCallback) {
    if (!Array.isArray(steps) || steps.length === 0) return;
    if (typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    let delay = 0;
    steps.forEach((step, index) => {
      setTimeout(() => {
        if (onStepCallback) onStepCallback(index, step);

        const textToSpeak = step.text
          .replace(/->/g, 'becomes')
          .replace(/Ta/g, 'Tra')
          .replace(/\(.*?\)/g, '')
          .trim();

        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          const voice = this.getBestVoice();
          if (voice) utterance.voice = voice;
          utterance.rate = 0.9;
          utterance.pitch = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      }, delay);

      delay += 1100; // Give each step 1.1 seconds to finish speaking cleanly
    });
  }

  // UI Sound Effects
  playSuccessSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.setValueAtTime(659.25, t + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, t + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, t + 0.24); // C6

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } catch (e) {}
  }

  playErrorSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.2);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch (e) {}
  }

  playClick() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, t);
      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    } catch (e) {}
  }

  playSingingBowl() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const fundamental = 261.63; // C4 Singing bowl
      const harmonics = [1, 2.76, 5.4, 8.9];
      const gains = [0.22, 0.10, 0.05, 0.02];

      harmonics.forEach((harmonic, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * harmonic, t);

        const decay = 3.0 / (idx + 1);
        gain.gain.setValueAtTime(gains[idx], t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + decay);
      });
    } catch (e) {}
  }
}

export const audioEngine = new TibetanAudioEngine();
