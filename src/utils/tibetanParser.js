// Tibetan Syllable Anatomy Parser & Deciphering Logic

// Subjoined character unicode mapping to base
const SUBJOINED_MAP = {
  '\u0FB1': { char: 'ྱ', type: 'ya-ta', baseWylie: 'ya', name: 'Ya-ta' },
  '\u0FB2': { char: 'ྲ', type: 'ra-ta', baseWylie: 'ra', name: 'Ra-ta' },
  '\u0FB3': { char: 'ླ', type: 'la-ta', baseWylie: 'la', name: 'La-ta' },
  '\u0FAD': { char: 'ྭ', type: 'wa-zur', baseWylie: 'wa', name: 'Wa-zur' },
};

const VOWEL_MAP = {
  '\u0F72': { char: 'ི', name: 'Gi-gu', vowel: 'i', sound: 'ee' },
  '\u0F74': { char: 'ུ', name: 'Zhab-kyu', vowel: 'u', sound: 'oo' },
  '\u0F7A': { char: 'ེ', name: 'Dreng-bu', vowel: 'e', sound: 'ay' },
  '\u0F7C': { char: 'ོ', name: 'Na-ro', vowel: 'o', sound: 'oh' },
  '\u0F7E': { char: 'ཾ', name: 'Bindu (Anusvara)', vowel: 'm', sound: 'm' },
  '\u0F83': { char: 'ྃ', name: 'Nada / Candrabindu', vowel: 'm', sound: 'ng' }
};

const PREFIXES = new Set(['ག', 'ད', 'བ', 'མ', 'འ']);
const SUPERSCRIPTS = new Set(['ར', 'ལ', 'ས']);
const SUFFIXES = new Set(['ག', 'ང', 'ད', 'ན', 'བ', 'མ', 'འ', 'ར', 'ལ', 'ས']);
const POST_SUFFIXES = new Set(['ད', 'ས']);
const UMLAUT_SUFFIXES = new Set(['ད', 'ན', 'ལ', 'ས']);

const CONSONANT_METADATA = {
  'ཀ': { wylie: 'ka', tone: 'high', asp: 'unaspirated', phonetic: 'ka' },
  'ཁ': { wylie: 'kha', tone: 'high', asp: 'aspirated', phonetic: 'kha' },
  'ག': { wylie: 'ga', tone: 'low', asp: 'aspirated-low', phonetic: 'ga' },
  'ང': { wylie: 'nga', tone: 'low', asp: 'nasal', phonetic: 'nga' },
  'ཅ': { wylie: 'ca', tone: 'high', asp: 'unaspirated', phonetic: 'cha' },
  'ཆ': { wylie: 'cha', tone: 'high', asp: 'aspirated', phonetic: 'chha' },
  'ཇ': { wylie: 'ja', tone: 'low', asp: 'aspirated-low', phonetic: 'ja' },
  'ཉ': { wylie: 'nya', tone: 'low', asp: 'nasal', phonetic: 'nya' },
  'ཏ': { wylie: 'ta', tone: 'high', asp: 'unaspirated', phonetic: 'ta' },
  'ཐ': { wylie: 'tha', tone: 'high', asp: 'aspirated', phonetic: 'tha' },
  'ད': { wylie: 'da', tone: 'low', asp: 'aspirated-low', phonetic: 'da' },
  'ན': { wylie: 'na', tone: 'low', asp: 'nasal', phonetic: 'na' },
  'པ': { wylie: 'pa', tone: 'high', asp: 'unaspirated', phonetic: 'pa' },
  'ཕ': { wylie: 'pha', tone: 'high', asp: 'aspirated', phonetic: 'pha' },
  'བ': { wylie: 'ba', tone: 'low', asp: 'aspirated-low', phonetic: 'ba' },
  'མ': { wylie: 'ma', tone: 'low', asp: 'nasal', phonetic: 'ma' },
  'ཙ': { wylie: 'tsa', tone: 'high', asp: 'unaspirated', phonetic: 'tsa' },
  'ཚ': { wylie: 'tsha', tone: 'high', asp: 'aspirated', phonetic: 'tsha' },
  'ཛ': { wylie: 'dza', tone: 'low', asp: 'aspirated-low', phonetic: 'dza' },
  'ཝ': { wylie: 'wa', tone: 'low', asp: 'glide', phonetic: 'wa' },
  'ཞ': { wylie: 'zha', tone: 'low', asp: 'fricative', phonetic: 'zha' },
  'ཟ': { wylie: 'za', tone: 'low', asp: 'fricative', phonetic: 'za' },
  'འ': { wylie: '\'a', tone: 'low', asp: 'glottal', phonetic: '\'a' },
  'ཡ': { wylie: 'ya', tone: 'low', asp: 'glide', phonetic: 'ya' },
  'ར': { wylie: 'ra', tone: 'low', asp: 'liquid', phonetic: 'ra' },
  'ལ': { wylie: 'la', tone: 'low', asp: 'liquid', phonetic: 'la' },
  'ཤ': { wylie: 'sha', tone: 'high', asp: 'fricative', phonetic: 'sha' },
  'ས': { wylie: 'sa', tone: 'high', asp: 'fricative', phonetic: 'sa' },
  'ཧ': { wylie: 'ha', tone: 'high', asp: 'aspirated', phonetic: 'ha' },
  'ཨ': { wylie: 'a', tone: 'high', asp: 'glottal', phonetic: 'a' },
};

/**
 * Deconstruct a single Tibetan syllable into its anatomical parts
 */
export function parseSyllable(rawSyllable) {
  if (!rawSyllable) return null;
  // Clean whitespace, tsheg, shad
  const clean = rawSyllable.replace(/[་།\s]/g, '');
  if (!clean) return null;

  let prefix = null;
  let superscript = null;
  let root = null;
  let subscript = null;
  let vowel = null;
  let suffix = null;
  let postsuffix = null;

  // Extract vowels or subjoined characters
  let vowelChar = null;
  let subjoinedChar = null;

  for (let char of clean) {
    if (VOWEL_MAP[char]) {
      vowel = VOWEL_MAP[char];
    }
    if (SUBJOINED_MAP[char]) {
      subscript = SUBJOINED_MAP[char];
    }
  }

  // Base characters (excluding combining marks)
  const baseChars = Array.from(clean).filter(
    (c) => !VOWEL_MAP[c] && !SUBJOINED_MAP[c] && c.charCodeAt(0) >= 0x0f40 && c.charCodeAt(0) <= 0x0f6a
  );

  const numBases = baseChars.length;

  if (numBases === 1) {
    // Single base letter: this is the root
    root = baseChars[0];
  } else if (numBases === 2) {
    // 2 base letters: Could be Root + Suffix OR Prefix + Root
    // In Tibetan rules, if 2nd letter is in suffix set, usually Root + Suffix (unless root has explicit vowel)
    if (vowel) {
      // If there is a vowel, it sits on the root.
      // Check which base letter the vowel was positioned on
      const vIndex = clean.indexOf(vowel.char);
      const firstCharIdx = clean.indexOf(baseChars[0]);
      const secondCharIdx = clean.indexOf(baseChars[1]);

      if (vIndex < secondCharIdx) {
        root = baseChars[0];
        suffix = baseChars[1];
      } else {
        prefix = baseChars[0];
        root = baseChars[1];
      }
    } else if (subscript) {
      // Subscript always attaches to the root!
      if (clean.indexOf(subscript.char) > clean.indexOf(baseChars[0])) {
        root = baseChars[0];
        suffix = baseChars[1];
      } else {
        prefix = baseChars[0];
        root = baseChars[1];
      }
    } else {
      // By default with 2 consonants and no marks: Root + Suffix (e.g. གང, ལམ, བོད)
      // Exception: if second letter cannot be suffix, first is prefix.
      if (SUFFIXES.has(baseChars[1])) {
        root = baseChars[0];
        suffix = baseChars[1];
      } else {
        prefix = baseChars[0];
        root = baseChars[1];
      }
    }
  } else if (numBases === 3) {
    // 3 base letters:
    // Pattern A: Prefix + Root + Suffix (e.g. བཀག, དགའ, མཁའ)
    // Pattern B: Root + Suffix + Post-suffix (e.g. སངས, ལེགས, གངས)
    // Pattern C: Head + Root + Suffix (e.g. རྒལ, སྒོམ)
    if (SUPERSCRIPTS.has(baseChars[0]) && !PREFIXES.has(baseChars[0])) {
      superscript = baseChars[0];
      root = baseChars[1];
      suffix = baseChars[2];
    } else if (POST_SUFFIXES.has(baseChars[2]) && SUFFIXES.has(baseChars[1])) {
      // Check if first is prefix or root
      if (PREFIXES.has(baseChars[0])) {
        prefix = baseChars[0];
        root = baseChars[1];
        suffix = baseChars[2];
      } else {
        root = baseChars[0];
        suffix = baseChars[1];
        postsuffix = baseChars[2];
      }
    } else if (PREFIXES.has(baseChars[0])) {
      prefix = baseChars[0];
      root = baseChars[1];
      suffix = baseChars[2];
    } else {
      root = baseChars[0];
      suffix = baseChars[1];
      postsuffix = baseChars[2];
    }
  } else if (numBases >= 4) {
    // 4 base letters: Prefix + Head/Root + Suffix + Post-suffix (e.g. བསྒྲུབས)
    if (PREFIXES.has(baseChars[0])) {
      prefix = baseChars[0];
      if (SUPERSCRIPTS.has(baseChars[1])) {
        superscript = baseChars[1];
        root = baseChars[2];
        suffix = baseChars[3];
        if (baseChars[4] && POST_SUFFIXES.has(baseChars[4])) {
          postsuffix = baseChars[4];
        }
      } else {
        root = baseChars[1];
        suffix = baseChars[2];
        postsuffix = baseChars[3];
      }
    } else {
      superscript = baseChars[0];
      root = baseChars[1];
      suffix = baseChars[2];
      postsuffix = baseChars[3];
    }
  }

  // Fallback if root not detected
  if (!root && baseChars.length > 0) {
    root = baseChars[0];
  }

  const rootMeta = CONSONANT_METADATA[root] || { wylie: root, tone: 'high', phonetic: root };

  // Calculate tone:
  // Low tone roots (Ga, Ja, Da, Ba, Dza, etc.) are ELEVATED to High Tone if they have:
  // - A Prefix (ག, ད, བ, མ, འ)
  // - A Superscript (ར, ལ, ས)
  // - A Subscript (like Ra-ta or La-ta)
  let calculatedTone = rootMeta.tone;
  let toneElevated = false;

  if (rootMeta.tone === 'low' && (prefix || superscript || (subscript && subscript.type === 'la-ta'))) {
    calculatedTone = 'high';
    toneElevated = true;
  }

  // Calculate base sound & subscript mutations
  let coreConsonantSound = rootMeta.phonetic;
  let mutationExplanation = '';

  if (subscript) {
    if (subscript.type === 'ya-ta') {
      // Palatalization
      if (root === 'ཀ' || root === 'པ') {
        coreConsonantSound = 'ca (sharp ch)';
        mutationExplanation = 'Ya-ta turns velar/labial into sharp palatal "ch".';
      } else if (root === 'ཁ' || root === 'ཕ') {
        coreConsonantSound = 'cha (aspirated ch)';
        mutationExplanation = 'Ya-ta turns aspirated letter into aspirated "ch".';
      } else if (root === 'ག' || root === 'བ') {
        coreConsonantSound = 'ja';
        mutationExplanation = 'Ya-ta turns voiced letter into low "ja".';
      } else if (root === 'མ') {
        coreConsonantSound = 'nya';
        mutationExplanation = 'Ya-ta turns Ma into palatal nasal "nya".';
      }
    } else if (subscript.type === 'ra-ta') {
      // Retroflexion
      if (root === 'ཀ' || root === 'ཏ' || root === 'པ') {
        coreConsonantSound = 'tra (crisp retroflex)';
        mutationExplanation = 'Ra-ta turns consonant into retroflex "tra" (tongue curled back).';
      } else if (root === 'ཁ' || root === 'ཐ' || root === 'ཕ') {
        coreConsonantSound = 'thra (aspirated retroflex)';
        mutationExplanation = 'Ra-ta turns aspirated consonant into "thra" with air burst.';
      } else if (root === 'ག' || root === 'ད' || root === 'བ') {
        coreConsonantSound = 'thra (low)';
        mutationExplanation = 'Ra-ta turns low consonants into retroflex "thra".';
      } else if (root === 'ས') {
        coreConsonantSound = 'sa';
        mutationExplanation = 'With Sa, the Ra is silent; remains high "sa".';
      } else if (root === 'ཧ') {
        coreConsonantSound = 'hra';
        mutationExplanation = 'Ra-ta makes voiceless whispered "hra".';
      }
    } else if (subscript.type === 'la-ta') {
      if (root === 'ཟ') {
        coreConsonantSound = 'da (high flat)';
        mutationExplanation = 'Exceptional rule: Zla becomes High "Da"!';
      } else {
        coreConsonantSound = 'la (high flat)';
        mutationExplanation = 'Rule of La-ta: All consonants become pure HIGH TONE "La"!';
      }
    }
  }

  // Vowel mutation / Umlauting
  let finalVowelSound = vowel ? vowel.vowel : 'a';
  let isUmlauted = false;
  let umlautNote = '';

  if (suffix && UMLAUT_SUFFIXES.has(suffix)) {
    if (finalVowelSound === 'a') {
      finalVowelSound = 'ä';
      isUmlauted = true;
      umlautNote = `Suffix "${suffix}" mutates vowel "a" into umlaut "ä" (like 'e' in pet).`;
    } else if (finalVowelSound === 'o') {
      finalVowelSound = 'ö';
      isUmlauted = true;
      umlautNote = `Suffix "${suffix}" mutates vowel "o" into umlaut "ö" (like German ö / French eu).`;
    } else if (finalVowelSound === 'u') {
      finalVowelSound = 'ü';
      isUmlauted = true;
      umlautNote = `Suffix "${suffix}" mutates vowel "u" into umlaut "ü" (like German ü / French u).`;
    }
  }

  // Suffix final pronunciation
  let suffixSound = '';
  if (suffix) {
    if (suffix === 'ག') suffixSound = 'k';
    else if (suffix === 'ང') suffixSound = 'ng';
    else if (suffix === 'ད') suffixSound = ' (glottal stop)';
    else if (suffix === 'ན') suffixSound = 'n';
    else if (suffix === 'བ') suffixSound = 'p';
    else if (suffix === 'མ') suffixSound = 'm';
    else if (suffix === 'འ') suffixSound = ' (long)';
    else if (suffix === 'ར') suffixSound = 'r';
    else if (suffix === 'ལ') suffixSound = 'l';
    else if (suffix === 'ས') suffixSound = ' (silent, falling tone)';
  }

  // Traditional Jor-lok (Spelling chant) steps
  const jorlokSteps = [];
  if (superscript) {
    const headName = superscript === 'ར' ? 'Ra-go' : superscript === 'ལ' ? 'La-go' : 'Sa-go';
    jorlokSteps.push({
      text: `${superscript} ${root}-ta ${root}`,
      sound: `${superscript} ${root}`,
      explanation: `${headName} elevates ${root} to high tone`
    });
  }
  if (subscript) {
    jorlokSteps.push({
      text: `${root} ${subscript.name} ${coreConsonantSound.split(' ')[0]}`,
      sound: coreConsonantSound.split(' ')[0],
      explanation: `${subscript.name} transforms sound to ${coreConsonantSound}`
    });
  }
  if (prefix) {
    jorlokSteps.push({
      text: `Prefix ${prefix} (silent, stabilizes high tone)`,
      sound: prefix,
      explanation: `Prefix ${prefix} is silent in speech`
    });
  }
  if (vowel) {
    jorlokSteps.push({
      text: `${vowel.name} (${vowel.symbol}) -> ${finalVowelSound}`,
      sound: finalVowelSound,
      explanation: `Adds vowel ${vowel.sound}`
    });
  }
  if (suffix) {
    jorlokSteps.push({
      text: `Suffix ${suffix} -> ${suffixSound}`,
      sound: suffixSound,
      explanation: `Suffix ${suffix} closes the syllable ${isUmlauted ? 'with vowel umlauting' : ''}`
    });
  }
  if (postsuffix) {
    jorlokSteps.push({
      text: `Post-suffix ${postsuffix}`,
      sound: '',
      explanation: `Post-suffix ${postsuffix} is silent and adds a falling tone contour`
    });
  }

  // Assembled Phonetic Result
  const phoneticResult = `${coreConsonantSound.replace(/\s*\(.*\)/, '')}${finalVowelSound !== 'a' ? finalVowelSound : (vowel ? vowel.vowel : 'a')}${suffixSound.replace(/\s*\(.*\)/, '')}`.trim();

  return {
    raw: rawSyllable,
    clean,
    prefix,
    superscript,
    root,
    subscript: subscript ? subscript.char : null,
    subscriptName: subscript ? subscript.name : null,
    vowel: vowel ? vowel.symbol : null,
    vowelName: vowel ? vowel.name : null,
    suffix,
    postsuffix,
    calculatedTone,
    toneElevated,
    coreConsonantSound,
    finalVowelSound,
    isUmlauted,
    umlautNote,
    mutationExplanation,
    suffixSound,
    phoneticResult,
    jorlokSteps
  };
}

/**
 * Parse an entire Tibetan text / phrase (multiple syllables separated by tsheg or spaces)
 */
export function parseTibetanPhrase(phrase) {
  if (!phrase) return [];
  // Split on tsheg (་) and whitespace
  const rawParts = phrase.split(/[་\s]+/).filter((p) => p.trim().length > 0);
  return rawParts.map((syllable) => parseSyllable(syllable)).filter(Boolean);
}
