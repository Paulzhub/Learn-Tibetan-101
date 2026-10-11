// High-Clarity Tibetan Audio Engine & Windows Native Tibetan Voice Engine

class TibetanAudioEngine {
  constructor() {
    this.ctx = null;
    this.voices = [];
    this.selectedVoice = null;
    this.isTibetanVoiceAvailable = false;
    this.voiceMode = 'auto'; // 'auto', 'tibetan', 'phonetic'
    this.listeners = new Set();

    this.initVoices();
  }

  initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Immediate load attempt
      this.refreshVoices();

      // Async voice load listener
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.refreshVoices();
        };
      }
    }
  }

  refreshVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return [];
    this.voices = window.speechSynthesis.getVoices() || [];

    // Search for Native Tibetan voice installed in Windows / OS
    const tibetanVoice = this.voices.find((v) => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return (
        lang.startsWith('bo') ||
        lang.includes('tibt') ||
        name.includes('tibetan') ||
        name.includes('bod') ||
        name.includes('བོད་')
      );
    });

    if (tibetanVoice) {
      this.isTibetanVoiceAvailable = true;
      if (!this.selectedVoice || this.voiceMode === 'auto') {
        this.selectedVoice = tibetanVoice;
      }
    } else {
      this.isTibetanVoiceAvailable = false;
    }

    this.notifyListeners();
    return this.voices;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach((fn) => {
      try {
        fn({
          voices: this.voices,
          selectedVoice: this.selectedVoice,
          isTibetanVoiceAvailable: this.isTibetanVoiceAvailable,
          voiceMode: this.voiceMode,
        });
      } catch (e) {}
    });
  }

  setVoiceMode(mode) {
    this.voiceMode = mode;
    if (mode === 'tibetan') {
      const tibVoice = this.voices.find((v) => (v.lang || '').toLowerCase().startsWith('bo') || (v.name || '').toLowerCase().includes('tibetan'));
      if (tibVoice) this.selectedVoice = tibVoice;
    } else if (mode === 'phonetic') {
      const fallback = this.getFallbackVoice();
      if (fallback) this.selectedVoice = fallback;
    }
    this.notifyListeners();
  }

  setSelectedVoice(voice) {
    this.selectedVoice = voice;
    this.notifyListeners();
  }

  getNativeTibetanVoice() {
    return this.voices.find((v) => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return (
        lang.startsWith('bo') ||
        lang.includes('tibt') ||
        name.includes('tibetan') ||
        name.includes('bod') ||
        name.includes('བོད་')
      );
    });
  }

  getFallbackVoice() {
    // Look for clear natural English or Indic voice
    const naturalVoice = this.voices.find(
      (v) =>
        (v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel') ||
            v.name.includes('Karen') ||
            v.name.includes('Guy'))) ||
        v.lang.startsWith('hi') ||
        v.lang.startsWith('ne')
    );
    if (naturalVoice) return naturalVoice;

    return this.voices.find((v) => v.lang.startsWith('en')) || this.voices[0] || null;
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

  // Convert Roman phonetic to pristine speech tokens if fallback is needed
  normalizePhoneticForSpeech(input) {
    if (!input) return 'Ah';
    let str = input.toString();

    str = str.replace(/\(.*?\)/g, '');
    str = str.replace(/\[.*?\]/g, '');
    str = str.replace(/\/.*?\//g, '');
    str = str.replace(/high|low|flat|falling|sharp|breathy|voiced|nasal/gi, '');

    if (str.includes('/')) {
      str = str.split('/')[0];
    }
    str = str.trim();

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

      // Combinations
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

      // Curated Words
      'tashi delek': 'Tah-shee Deh-lek',
      'om mani padme hum': 'Ohm Mah-nee Pahd-may Hoom',
      'sangye': 'Sahng-gyay',
      'drub': 'Droop',
      'lama': 'Lah-mah',
      'lhasa': 'Hlah-sah',
      'thukje-che': 'Took-jay-chay',
      'thukje che': 'Took-jay-chay',
      'bod skad': 'Bö kay',
      'chos': 'Chö',
    };

    const lower = str.toLowerCase();
    return PHONETIC_MAP[lower] || str || 'Ah';
  }

  /**
   * Main speech function:
   * Accepts both phonetic string AND Tibetan text.
   * If a Windows Tibetan voice is available, speaks the actual authentic Tibetan script!
   * Otherwise, speaks the normalized Roman phonetic string.
   */
  playPhonetic(phoneticStr, toneType = 'high', tibetanText = '') {
    if (typeof window === 'undefined') return;

    // Check voices if not loaded
    if (this.voices.length === 0) {
      this.refreshVoices();
    }

    const tibetanVoice = this.getNativeTibetanVoice();
    const shouldUseTibetanVoice = (this.voiceMode === 'tibetan' || (this.voiceMode === 'auto' && tibetanVoice)) && tibetanText;

    // Subtle soft bell tone in background
    this.playSoftHarmonic(toneType === 'low' ? 180 : 260);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Clear any queued speech

      let textToSpeak = '';
      let targetVoice = null;
      let targetLang = 'en-US';

      if (shouldUseTibetanVoice && tibetanVoice) {
        // NATIVE TIBETAN PRONUNCIATION VIA WINDOWS TIBETAN VOICE
        textToSpeak = tibetanText;
        targetVoice = this.selectedVoice && this.selectedVoice.lang.toLowerCase().startsWith('bo') ? this.selectedVoice : tibetanVoice;
        targetLang = targetVoice.lang || 'bo-CN';
      } else {
        // Fallback: Clear phonetic approximation
        textToSpeak = this.normalizePhoneticForSpeech(phoneticStr);
        targetVoice = this.selectedVoice || this.getFallbackVoice();
        targetLang = targetVoice ? targetVoice.lang : 'en-US';
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      utterance.lang = targetLang;

      // Rate and pitch adjustments
      if (shouldUseTibetanVoice) {
        utterance.rate = 0.85; // slightly deliberate for pristine learning
        utterance.pitch = 1.0;
      } else {
        utterance.pitch = toneType === 'high' ? 1.15 : 0.90;
        utterance.rate = 0.85;
      }

      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Convenient alias
  playTibetan(tibetanText, phoneticFallback = '', toneType = 'high') {
    this.playPhonetic(phoneticFallback || tibetanText, toneType, tibetanText);
  }

  // Soft crystalline harmonic ding
  playSoftHarmonic(freq = 240) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    } catch (e) {}
  }

  // Play Traditional Spelling Chant (Jor-lok)
  playChantFormula(steps, onStepCallback) {
    if (!Array.isArray(steps) || steps.length === 0) return;
    if (typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const tibetanVoice = this.getNativeTibetanVoice();

    let delay = 0;
    steps.forEach((step, index) => {
      setTimeout(() => {
        if (onStepCallback) onStepCallback(index, step);

        if ('speechSynthesis' in window) {
          const textToSpeak = step.text
            .replace(/->/g, 'becomes')
            .replace(/\(.*?\)/g, '')
            .trim();

          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          const voice = this.getFallbackVoice();
          if (voice) utterance.voice = voice;
          utterance.rate = 0.9;
          utterance.pitch = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      }, delay);

      delay += 1150;
    });
  }

  // UI Sounds
  playSuccessSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, t);
      osc.frequency.setValueAtTime(659.25, t + 0.08);
      osc.frequency.setValueAtTime(783.99, t + 0.16);
      osc.frequency.setValueAtTime(1046.50, t + 0.24);

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
      const fundamental = 261.63;
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
