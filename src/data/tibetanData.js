// Complete Tibetan Phonetic & Alphabet Dataset

export const CONSONANTS = [
  // Row 1: Velar (Throat / མགྲིན་པ)
  {
    tibetan: 'ཀ',
    wylie: 'ka',
    ipa: 'ká',
    phonetic: 'ka',
    row: 1,
    col: 1,
    tone: 'high',
    aspiration: 'unaspirated',
    meaning: 'Pillar / Column',
    mnemonic: 'Looks like a pole or pillar (ཀ) holding up a flat roof.',
    strokes: ['Horizontal top line', 'Central vertical stem down', 'Right curve back to stem', 'Lower hook'],
    sampleWord: { tibetan: 'ཀ་བ', wylie: 'ka ba', meaning: 'Pillar' }
  },
  {
    tibetan: 'ཁ',
    wylie: 'kha',
    ipa: 'kʰá',
    phonetic: 'kha',
    row: 1,
    col: 2,
    tone: 'high',
    aspiration: 'aspirated',
    meaning: 'Mouth / Snow',
    mnemonic: 'Looks like an open mouth shouting with a puff of air (kh-).',
    strokes: ['Top bar', 'Curving mouth opening', 'Right vertical drop'],
    sampleWord: { tibetan: 'ཁ་བ', wylie: 'kha ba', meaning: 'Snow' }
  },
  {
    tibetan: 'ག',
    wylie: 'ga',
    ipa: 'kʰà / kà',
    phonetic: 'ga',
    phoneticNote: 'low tone, aspirated',
    row: 1,
    col: 3,
    tone: 'low',
    aspiration: 'aspirated-low',
    meaning: 'Where / Hearth',
    mnemonic: 'A deep gentle hook in the throat; low pitch.',
    strokes: ['Left drop hook', 'Top crossbar', 'Right vertical drop'],
    sampleWord: { tibetan: 'གང', wylie: 'gang', meaning: 'Full / Who' }
  },
  {
    tibetan: 'ང',
    wylie: 'nga',
    ipa: 'ŋà',
    phonetic: 'nga',
    row: 1,
    col: 4,
    tone: 'low',
    aspiration: 'nasal',
    meaning: 'I / Me',
    mnemonic: 'The famous "ng" nasal sound like in "si-NG-er", also means "I/me" in Tibetan!',
    strokes: ['Top line', 'Upper loop', 'Lower tail'],
    sampleWord: { tibetan: 'ང་རང', wylie: 'nga rang', meaning: 'I myself' }
  },

  // Row 2: Palatal (Palate / རྩེ་མོ)
  {
    tibetan: 'ཅ',
    wylie: 'ca',
    ipa: 'tɕá',
    phonetic: 'cha',
    phoneticNote: 'sharp, unaspirated',
    row: 2,
    col: 1,
    tone: 'high',
    aspiration: 'unaspirated',
    meaning: 'Sharp "ch"',
    mnemonic: 'Like an English "ch" in "chair", but crisp and high pitched without breath.',
    strokes: ['Top bar', 'Square loop left', 'Right vertical bar'],
    sampleWord: { tibetan: 'ཅི་ལགས', wylie: 'ci lags', meaning: 'What is it?' }
  },
  {
    tibetan: 'ཆ',
    wylie: 'cha',
    ipa: 'tɕʰá',
    phonetic: 'chha',
    row: 2,
    col: 2,
    tone: 'high',
    aspiration: 'aspirated',
    meaning: 'Water (ཆུ)',
    mnemonic: 'Two round bellies holding water (ཆུ), with an explosive breath puff.',
    strokes: ['Top bar', 'Left double loop', 'Right descending tail'],
    sampleWord: { tibetan: 'ཆོས', wylie: 'chos', meaning: 'Dharma / Teachings' }
  },
  {
    tibetan: 'ཇ',
    wylie: 'ja',
    ipa: 'tɕʰà / tɕà',
    phonetic: 'ja',
    phoneticNote: 'low tone',
    row: 2,
    col: 3,
    tone: 'low',
    aspiration: 'aspirated-low',
    meaning: 'Tea',
    mnemonic: 'Looks like a teapot spout pouring steaming Tibetan butter tea (ཇ)!',
    strokes: ['Top bar', 'Loop hanging down', 'Lower horizontal base and tail'],
    sampleWord: { tibetan: 'ཇ་མ', wylie: 'ja ma', meaning: 'Cook / Tea server' }
  },
  {
    tibetan: 'ཉ',
    wylie: 'nya',
    ipa: 'ɲà',
    phonetic: 'nya',
    row: 2,
    col: 4,
    tone: 'low',
    aspiration: 'nasal',
    meaning: 'Fish',
    mnemonic: 'Like "ny" in canyon or Spanish "ñ". The letter looks like a swimming fish!',
    strokes: ['Top bar', 'Curving body', 'Tail fin stroke'],
    sampleWord: { tibetan: 'ཉ', wylie: 'nya', meaning: 'Fish' }
  },

  // Row 3: Dental (Teeth / སོ)
  {
    tibetan: 'ཏ',
    wylie: 'ta',
    ipa: 'tá',
    phonetic: 'ta',
    row: 3,
    col: 1,
    tone: 'high',
    aspiration: 'unaspirated',
    meaning: 'Crisp T',
    mnemonic: 'Tongue touches front teeth, crisp high "ta" like Spanish "t".',
    strokes: ['Top bar', 'Slanted left drop', 'Right curving lower body'],
    sampleWord: { tibetan: 'ཏིང་ངེ་འཛིན', wylie: 'ting nge \'dzin', meaning: 'Samadhi / Concentration' }
  },
  {
    tibetan: 'ཐ',
    wylie: 'tha',
    ipa: 'tʰá',
    phonetic: 'tha',
    row: 3,
    col: 2,
    tone: 'high',
    aspiration: 'aspirated',
    meaning: 'End / Limit',
    mnemonic: 'Like "t" in English "tea", with a clear breath puff and high pitch.',
    strokes: ['Top bar', 'Curved rounded chamber', 'Center bar'],
    sampleWord: { tibetan: 'ཐུགས་རྗེ', wylie: 'thugs rje', meaning: 'Compassion' }
  },
  {
    tibetan: 'ད',
    wylie: 'da',
    ipa: 'tʰà / tà',
    phonetic: 'da',
    phoneticNote: 'low tone dental',
    row: 3,
    col: 3,
    tone: 'low',
    aspiration: 'aspirated-low',
    meaning: 'Now / Arrow (མདའ)',
    mnemonic: 'Deep low-toned dental; looks like a bow drawn back.',
    strokes: ['Top bar', 'Left curve', 'Right leg down'],
    sampleWord: { tibetan: 'དེང་སང', wylie: 'deng sang', meaning: 'Nowadays' }
  },
  {
    tibetan: 'ན',
    wylie: 'na',
    ipa: 'nà',
    phonetic: 'na',
    row: 3,
    col: 4,
    tone: 'low',
    aspiration: 'nasal',
    meaning: 'Nose / Sickness',
    mnemonic: 'Gentle low nasal "na" like "night" with lower pitch.',
    strokes: ['Top bar', 'Vertical stem', 'Curving lower belly'],
    sampleWord: { tibetan: 'ནམ་མཁའ', wylie: 'nam mkha\'', meaning: 'Sky / Space' }
  },

  // Row 4: Labial (Lips / མཆུ་ཏོ)
  {
    tibetan: 'པ',
    wylie: 'pa',
    ipa: 'pá',
    phonetic: 'pa',
    row: 4,
    col: 1,
    tone: 'high',
    aspiration: 'unaspirated',
    meaning: 'Father (ཕ)',
    mnemonic: 'High crisp "p" like Spanish "pan", lips pop cleanly without breath puff.',
    strokes: ['Top bar', 'Left vertical drop', 'Bottom connector', 'Right vertical drop'],
    sampleWord: { tibetan: 'པད་མ', wylie: 'pad ma', meaning: 'Lotus' }
  },
  {
    tibetan: 'ཕ',
    wylie: 'pha',
    ipa: 'pʰá',
    phonetic: 'pha',
    row: 4,
    col: 2,
    tone: 'high',
    aspiration: 'aspirated',
    meaning: 'Father / Beyond',
    mnemonic: 'Like English "park", heavy burst of air with high pitch.',
    strokes: ['Left drop', 'Looping center', 'Right vertical drop with extra loop'],
    sampleWord: { tibetan: 'ཕ་རོལ', wylie: 'pha rol', meaning: 'Beyond / Other side' }
  },
  {
    tibetan: 'བ',
    wylie: 'ba',
    ipa: 'pʰà / wà',
    phonetic: 'ba',
    phoneticNote: 'softens to wa intervocalically',
    row: 4,
    col: 3,
    tone: 'low',
    aspiration: 'aspirated-low',
    meaning: 'Cow / Bull',
    mnemonic: 'Low pitch "ba"; in the middle of words it softens to "wa"!',
    strokes: ['Top bar', 'Square box left', 'Vertical right leg'],
    sampleWord: { tibetan: 'བླ་མ', wylie: 'bla ma', meaning: 'Lama / Guru' }
  },
  {
    tibetan: 'མ',
    wylie: 'ma',
    ipa: 'mà',
    phonetic: 'ma',
    row: 4,
    col: 4,
    tone: 'low',
    aspiration: 'nasal',
    meaning: 'Mother',
    mnemonic: 'Universal word for Mother (མ)! Deep warm low nasal hum.',
    strokes: ['Top bar', 'Box shape', 'Lower rounded loop and tail'],
    sampleWord: { tibetan: 'མ་ཡུམ', wylie: 'ma yum', meaning: 'Revered Mother' }
  },

  // Row 5: Dental Affricate
  {
    tibetan: 'ཙ',
    wylie: 'tsa',
    ipa: 'tsá',
    phonetic: 'tsa',
    row: 5,
    col: 1,
    tone: 'high',
    aspiration: 'unaspirated',
    meaning: 'Grass (རྩྭ)',
    mnemonic: 'Like "ts" in "cats" or "tsunami", crisp and high flat pitch.',
    strokes: ['Top bar', 'Curved upper crest', 'Lower hook'],
    sampleWord: { tibetan: 'ཙན་དན', wylie: 'tsan dan', meaning: 'Sandalwood' }
  },
  {
    tibetan: 'ཚ',
    wylie: 'tsha',
    ipa: 'tsʰá',
    phonetic: 'tsha',
    row: 5,
    col: 2,
    tone: 'high',
    aspiration: 'aspirated',
    meaning: 'Salt / Hot',
    mnemonic: 'Like "ts" with huge breath of hot steam (tsha means hot!).',
    strokes: ['Top bar', 'Crest loop', 'Right descending tail with breath cross'],
    sampleWord: { tibetan: 'ཚ་བ', wylie: 'tsha ba', meaning: 'Heat / Fever' }
  },
  {
    tibetan: 'ཛ',
    wylie: 'dza',
    ipa: 'tsʰà / dzà',
    phonetic: 'dza',
    phoneticNote: 'low tone affricate',
    row: 5,
    col: 3,
    tone: 'low',
    aspiration: 'aspirated-low',
    meaning: 'Clay / Pot',
    mnemonic: 'Like "dz" in "adze" or "kids", low rising pitch.',
    strokes: ['Top bar', 'Double stepped curve', 'Lower right hook'],
    sampleWord: { tibetan: 'ཛམ་བྷ་ལ', wylie: 'dzam bha la', meaning: 'Dzambhala (Wealth Deity)' }
  },
  {
    tibetan: 'ཝ',
    wylie: 'wa',
    ipa: 'wà',
    phonetic: 'wa',
    row: 5,
    col: 4,
    tone: 'low',
    aspiration: 'nasal/glide',
    meaning: 'Fox',
    mnemonic: 'Looks like ཙ or བ with a little tail underneath; sounds like "water".',
    strokes: ['Top bar', 'Box loop', 'Right bottom tail'],
    sampleWord: { tibetan: 'ཝ་མོ', wylie: 'wa mo', meaning: 'Vixen / Fox' }
  },

  // Row 6: Sibilant & Glides
  {
    tibetan: 'ཞ',
    wylie: 'zha',
    ipa: 'ɕà',
    phonetic: 'zha',
    phoneticNote: 'soft fricative',
    row: 6,
    col: 1,
    tone: 'low',
    aspiration: 'fricative',
    meaning: 'Hat (ཞྭ)',
    mnemonic: 'Soft "zh" like "s" in "measure" or French "je", low pitch.',
    strokes: ['Top bar', 'Curving hook', 'Right stem with tail'],
    sampleWord: { tibetan: 'ཞི་བདེ', wylie: 'zhi bde', meaning: 'Peace' }
  },
  {
    tibetan: 'ཟ',
    wylie: 'za',
    ipa: 'sà',
    phonetic: 'za',
    row: 6,
    col: 2,
    tone: 'low',
    aspiration: 'fricative',
    meaning: 'Food / To eat',
    mnemonic: 'Low buzzing "za" like "zebra", also means food / eating.',
    strokes: ['Top bar', 'Upper diagonal', 'Lower loop back'],
    sampleWord: { tibetan: 'ཟ་མ', wylie: 'za ma', meaning: 'Food' }
  },
  {
    tibetan: 'འ',
    wylie: '\'a',
    ipa: 'ʔà / à',
    phonetic: 'a',
    phoneticNote: 'soft breathy A-chung',
    row: 6,
    col: 3,
    tone: 'low',
    aspiration: 'glottal',
    meaning: 'Little \'A (A-chung)',
    mnemonic: 'Known as "A-chung" (Little A). Soft breathy vowel carrier, low tone.',
    strokes: ['Top bar', 'Center hook', 'Descending gentle sweep'],
    sampleWord: { tibetan: 'འོད་ཟེར', wylie: '\'od zer', meaning: 'Ray of Light' }
  },
  {
    tibetan: 'ཡ',
    wylie: 'ya',
    ipa: 'jà',
    phonetic: 'ya',
    row: 6,
    col: 4,
    tone: 'low',
    aspiration: 'glide',
    meaning: 'Up / Above',
    mnemonic: 'Smooth "ya" like "yellow", low gentle tone.',
    strokes: ['Top bar', 'Left drop', 'Lower cup curving right'],
    sampleWord: { tibetan: 'ཡིད་བཞིན', wylie: 'yid bzhin', meaning: 'Wish-fulfilling' }
  },

  // Row 7: Liquids & Sibilants
  {
    tibetan: 'ར',
    wylie: 'ra',
    ipa: 'rà',
    phonetic: 'ra',
    row: 7,
    col: 1,
    tone: 'low',
    aspiration: 'liquid',
    meaning: 'Goat / Horn',
    mnemonic: 'A light tapped "r" like Italian/Spanish "pero". Looks like a sword.',
    strokes: ['Top bar', 'Slanted center', 'Curved tail'],
    sampleWord: { tibetan: 'རི་བོ', wylie: 'ri bo', meaning: 'Mountain' }
  },
  {
    tibetan: 'ལ',
    wylie: 'la',
    ipa: 'là',
    phonetic: 'la',
    row: 7,
    col: 2,
    tone: 'low',
    aspiration: 'liquid',
    meaning: 'Mountain Pass',
    mnemonic: 'Clear "la" like "lake". The famous Himalayan passes (e.g. Khardung La).',
    strokes: ['Top bar', 'Left arch', 'Right hanging hook'],
    sampleWord: { tibetan: 'ལམ་ཁ', wylie: 'lam kha', meaning: 'Road / Path' }
  },
  {
    tibetan: 'ཤ',
    wylie: 'sha',
    ipa: 'ɕá',
    phonetic: 'sha',
    row: 7,
    col: 3,
    tone: 'high',
    aspiration: 'fricative',
    meaning: 'Meat / Flesh',
    mnemonic: 'High pitch "sh" like "ship". Crisp and elevated.',
    strokes: ['Top bar', 'Left loop', 'Center loop', 'Right stem'],
    sampleWord: { tibetan: 'ཤེས་རབ', wylie: 'shes rab', meaning: 'Prajna / Wisdom' }
  },
  {
    tibetan: 'ས',
    wylie: 'sa',
    ipa: 'sá',
    phonetic: 'sa',
    row: 7,
    col: 4,
    tone: 'high',
    aspiration: 'fricative',
    meaning: 'Earth / Ground',
    mnemonic: 'High pitch "s" like "sun". Tibetan word for Earth/Soil (ས་)!',
    strokes: ['Top bar', 'Left angled leg', 'Right leg curving inward'],
    sampleWord: { tibetan: 'སངས་རྒྱས', wylie: 'sangs rgyas', meaning: 'Buddha' }
  },

  // Row 8: Aspirate & Radical
  {
    tibetan: 'ཧ',
    wylie: 'ha',
    ipa: 'há',
    phonetic: 'ha',
    row: 8,
    col: 1,
    tone: 'high',
    aspiration: 'aspirated',
    meaning: 'Breath / Laugh',
    mnemonic: 'Open high "ha" like a deep breath or laugh from the mountain peak.',
    strokes: ['Top bar', 'Open round loop', 'Right descending tail'],
    sampleWord: { tibetan: 'ཧ་ཅང', wylie: 'ha cang', meaning: 'Extremely / Very' }
  },
  {
    tibetan: 'ཨ',
    wylie: 'a',
    ipa: 'ʔá',
    phonetic: 'a (pure)',
    row: 8,
    col: 2,
    tone: 'high',
    aspiration: 'glottal',
    meaning: 'The Primordial A',
    mnemonic: 'The Great A (A-chen). The primordial sound of Dzogchen and mother of vowels.',
    strokes: ['Top bar', 'Left hook', 'Center descending stem', 'Lower curve'],
    sampleWord: { tibetan: 'ཨ་མ', wylie: 'a ma', meaning: 'Mother' }
  }
];

export const VOWELS = [
  {
    name: 'Gi-gu',
    tibetanName: 'གི་གུ',
    symbol: 'ི',
    vowelChar: 'i',
    ipa: 'i',
    position: 'above',
    sound: 'ee as in "see"',
    sample: 'ཀི',
    sampleWylie: 'ki',
    description: 'A curling hook placed on top of the root consonant.'
  },
  {
    name: 'Zhab-kyu',
    tibetanName: 'ཞབས་ཀྱུ',
    symbol: 'ུ',
    vowelChar: 'u',
    ipa: 'u',
    position: 'below',
    sound: 'oo as in "moon"',
    sample: 'ཀུ',
    sampleWylie: 'ku',
    description: 'A descending foot hook attached underneath the root letter.'
  },
  {
    name: 'Dreng-bu',
    tibetanName: 'འགྲེང་བུ',
    symbol: 'ེ',
    vowelChar: 'e',
    ipa: 'e',
    position: 'above',
    sound: 'ay as in "say"',
    sample: 'ཀེ',
    sampleWylie: 'ke',
    description: 'An upright horn or diagonal stroke on top of the root letter.'
  },
  {
    name: 'Na-ro',
    tibetanName: 'ན་རོ',
    symbol: 'ོ',
    vowelChar: 'o',
    ipa: 'o',
    position: 'above',
    sound: 'oh as in "go"',
    sample: 'ཀོ',
    sampleWylie: 'ko',
    description: 'Two curving ears or crown horns sitting on top of the letter.'
  }
];

export const SUBSCRIPTS = [
  {
    name: 'Ya-ta (ཡ་བཏགས)',
    char: 'ྱ',
    meaning: 'Subjoined Ya',
    rule: 'Attaches to 7 consonants: ཀ, ཁ, ག, པ, ཕ, བ, མ. Transforms labials and velars into palatals (ch/j/ny)!',
    examples: [
      { base: 'ཀ', sub: 'ཀྱ', wylie: 'kya', phonetic: 'ca (high sharp ch)', note: 'Turns k into palatal ch' },
      { base: 'ཁ', sub: 'ཁྱ', wylie: 'khya', phonetic: 'cha (high aspirated ch)', note: 'Aspirated ch' },
      { base: 'ག', sub: 'གྱ', wylie: 'gya', phonetic: 'jha (low ch/j)', note: 'Low voiced palatal' },
      { base: 'པ', sub: 'པྱ', wylie: 'pya', phonetic: 'ca (high sharp ch)', note: 'Labial converts to palatal ch' },
      { base: 'ཕ', sub: 'ཕྱ', wylie: 'phya', phonetic: 'cha (high breath ch)', note: 'Aspirated ch' },
      { base: 'བ', sub: 'བྱ', wylie: 'bya', phonetic: 'ja (low voiced)', note: 'Turns b into low j' },
      { base: 'མ', sub: 'མྱ', wylie: 'mya', phonetic: 'nya (nasal)', note: 'Turns m into nya' }
    ]
  },
  {
    name: 'Ra-ta (ར་བཏགས)',
    char: 'ྲ',
    meaning: 'Subjoined Ra',
    rule: 'Attaches to 11 consonants. Transforms them into retroflex (TR / THR) sounds where tongue curls back!',
    examples: [
      { base: 'ཀ', sub: 'ཀྲ', wylie: 'kra', phonetic: 'tra (high crisp retroflex)', note: 'High unaspirated retroflex' },
      { base: 'ཁ', sub: 'ཁྲ', wylie: 'khra', phonetic: 'thra (high breath retroflex)', note: 'High aspirated retroflex' },
      { base: 'ག', sub: 'གྲ', wylie: 'gra', phonetic: 'thra (low pitch retroflex)', note: 'Low retroflex' },
      { base: 'ཏ', sub: 'ཏྲ', wylie: 'tra', phonetic: 'tra', note: 'Dental becomes retroflex' },
      { base: 'ཐ', sub: 'ཐྲ', wylie: 'thra', phonetic: 'thra', note: 'Aspirated retroflex' },
      { base: 'ད', sub: 'དྲ', wylie: 'dra', phonetic: 'thra (low)', note: 'Low pitch retroflex' },
      { base: 'པ', sub: 'པྲ', wylie: 'pra', phonetic: 'tra', note: 'Labial becomes retroflex' },
      { base: 'ཕ', sub: 'ཕྲ', wylie: 'phra', phonetic: 'thra', note: 'High aspirated retroflex' },
      { base: 'བ', sub: 'བྲ', wylie: 'bra', phonetic: 'thra (low)', note: 'Low retroflex' },
      { base: 'ས', sub: 'སྲ', wylie: 'sra', phonetic: 'sa (high)', note: 'Ra becomes silent, stays sa' },
      { base: 'ཧ', sub: 'ཧྲ', wylie: 'hra', phonetic: 'hra (whispered r)', note: 'Voiceless r' }
    ]
  },
  {
    name: 'La-ta (ལ་བཏགས)',
    char: 'ླ',
    meaning: 'Subjoined La',
    rule: 'Attaches to 6 consonants: ཀ, ག, བ, ཟ, ར, ས. Miraculous rule: ALL except ཟ become HIGH TONE "LA"!',
    examples: [
      { base: 'ཀ', sub: 'ཀླ', wylie: 'kla', phonetic: 'la (high flat)', note: 'Becomes pure High La' },
      { base: 'ག', sub: 'གླ', wylie: 'gla', phonetic: 'la (high flat)', note: 'Low ga becomes High La!' },
      { base: 'བ', sub: 'བླ', wylie: 'bla', phonetic: 'la (high flat)', note: 'Low ba becomes High La! (e.g. བླ་མ Lama)' },
      { base: 'ཟ', sub: 'ཟླ', wylie: 'zla', phonetic: 'da (high flat)', note: 'Special exception: becomes high Da! (e.g. ཟླ་བ Moon)' },
      { base: 'ར', sub: 'རླ', wylie: 'rla', phonetic: 'la (high flat)', note: 'Becomes High La (e.g. རླུང Wind)' },
      { base: 'ས', sub: 'སླ', wylie: 'sla', phonetic: 'la (high flat)', note: 'Becomes High La (e.g. སློབ་མ Student)' }
    ]
  },
  {
    name: 'Wa-zur (ཝ་ཟུར)',
    char: 'ྭ',
    meaning: 'Corner Wa',
    rule: 'A tiny triangle attached at the bottom right corner. Does NOT change consonant sound, primarily disambiguates meaning or rounds vowel slightly.',
    examples: [
      { base: 'ཙ', sub: 'ཙྭ', wylie: 'tswa', phonetic: 'tsa / tswa', note: 'Distinguishes homophones' },
      { base: 'ཚ', sub: 'ཚྭ', wylie: 'tshwa', phonetic: 'tsha (salt)', note: 'Spells salt (ཚྭ)' },
      { base: 'ཞ', sub: 'ཞྭ', wylie: 'zhwa', phonetic: 'zhwa (hat)', note: 'Spells hat (ཞྭ)' }
    ]
  }
];

export const SUPERSCRIPTS = [
  {
    name: 'Ra-go (ར་མགོ)',
    char: 'ར',
    rule: 'Ra on head of 12 consonants: རྐ, རྒ, རྔ, རྗ, རྙ, རྟ, རྡ, རྣ, རྦ, རྨ, རྩ, རྫ. Elevates low consonants to HIGH TONE and remains silent!',
    examples: [
      { stack: 'རྐ', wylie: 'rka', phonetic: 'ka (high)', explanation: 'Ra is silent; root Ka is high' },
      { stack: 'རྒ', wylie: 'rga', phonetic: 'ga (high)', explanation: 'Root Ga was low, but Ra-go ELEVATES it to high flat tone!' },
      { stack: 'རྡ', wylie: 'rda', phonetic: 'da (high)', explanation: 'Root Da elevated from low to high tone' }
    ]
  },
  {
    name: 'La-go (ལ་མགོ)',
    char: 'ལ',
    rule: 'La on head of 10 consonants: ལྐ, ལྒ, ལྔ, ལྕ, ལྗ, ལྟ, ལྡ, ལྤ, ལྦ, ལྷ. Elevates tones and remains silent (except ལྷ which is voiceless Lha)!',
    examples: [
      { stack: 'ལྐ', wylie: 'lka', phonetic: 'ka (high)', explanation: 'La is silent; tone is high' },
      { stack: 'ལྒ', wylie: 'lga', phonetic: 'ga (high)', explanation: 'Elevates low Ga to high tone' },
      { stack: 'ལྷ', wylie: 'lha', phonetic: 'lha (whispered breathy l)', explanation: 'Voiceless aspirated Lha (as in Lhasa!)' }
    ]
  },
  {
    name: 'Sa-go (ས་མགོ)',
    char: 'ས',
    rule: 'Sa on head of 11 consonants: སྐ, སྒ, སྔ, སྙ, སྟ, སྡ, སྣ, སྤ, སྦ, སྨ, སྩ. Elevates tone to High and remains silent!',
    examples: [
      { stack: 'སྐ', wylie: 'ska', phonetic: 'ka (high)', explanation: 'Sa is silent; Ka is high' },
      { stack: 'སྒ', wylie: 'sga', phonetic: 'ga (high)', explanation: 'Elevates low Ga to high tone (e.g. སྒོ Door)' },
      { stack: 'སངས', wylie: 'sangs', phonetic: 'sang', explanation: 'Root Sa with suffix Nga (Buddha)' }
    ]
  }
];

export const PREFIXES = [
  { char: 'ག', wylie: 'g', name: 'Ga-prefix', note: 'Silent, elevates low tone roots to high level tone.' },
  { char: 'ད', wylie: 'd', name: 'Da-prefix', note: 'Silent, elevates tone.' },
  { char: 'བ', wylie: 'b', name: 'Ba-prefix', note: 'Silent, elevates tone. Very common past-tense marker!' },
  { char: 'མ', wylie: 'm', name: 'Ma-prefix', note: 'Silent, gives high tone and subtle nasalized onset.' },
  { char: 'འ', wylie: '\'a', name: '\'A-prefix', note: 'Silent, elevates tone and voices preceding vowel.' }
];

export const SUFFIXES = [
  {
    char: 'ག',
    wylie: 'g',
    sound: 'k / glottal stop',
    umlaut: false,
    example: 'བདག (dak - self)',
    explanation: 'Unreleased final -k or glottal stop.'
  },
  {
    char: 'ང',
    wylie: 'ng',
    sound: 'ng',
    umlaut: false,
    example: 'སངས (sang - purified)',
    explanation: 'Clear ringing nasal -ng like in "sing".'
  },
  {
    char: 'ད',
    wylie: 'd',
    sound: 'glottal stop + UMLAUT',
    umlaut: true,
    example: 'བོད (Bö - Tibet)',
    explanation: 'Silent! But causes vowel fronting: a→ä, o→ö, u→ü + sharp tone cutoff.'
  },
  {
    char: 'ན',
    wylie: 'n',
    sound: 'n + UMLAUT',
    umlaut: true,
    example: 'སྨན (Män - medicine)',
    explanation: 'Fronts vowels: a→än, o→ön, u→ün with nasal resonance.'
  },
  {
    char: 'བ',
    wylie: 'b',
    sound: 'p / b',
    umlaut: false,
    example: 'ཐོབ (thop - attain)',
    explanation: 'Unreleased final -p.'
  },
  {
    char: 'མ',
    wylie: 'm',
    sound: 'm',
    umlaut: false,
    example: 'ལམ (lam - path)',
    explanation: 'Clear final -m.'
  },
  {
    char: 'འ',
    wylie: '\'a',
    sound: 'lengthens vowel',
    umlaut: false,
    example: 'མཁའ (kha - sky)',
    explanation: 'Prolongs the preceding vowel with low steady tone.'
  },
  {
    char: 'ར',
    wylie: 'r',
    sound: 'r / retroflex glide',
    umlaut: false,
    example: 'མར (mar - butter)',
    explanation: 'Light vocalic r or vowel elongation.'
  },
  {
    char: 'ལ',
    wylie: 'l',
    sound: 'l + UMLAUT',
    umlaut: true,
    example: 'ཡུལ (Yül - country)',
    explanation: 'Fronts vowels: a→ä, o→ö, u→ü with final -l sound.'
  },
  {
    char: 'ས',
    wylie: 's',
    sound: 'silent + UMLAUT',
    umlaut: true,
    example: 'ཆོས (Chö - Dharma)',
    explanation: 'Silent! Fronts vowel: a→ä, o→ö, u→ü and creates falling tone.'
  }
];

export const UMLAUT_RULES = [
  { base: 'a (ཨ)', withSuffix: 'with ད་, ན་, ལ་, ས་', result: 'ä (like "e" in bed or "ai" in air)', example: 'ལས (las) → "lä" (action/karma)' },
  { base: 'o (ཨོ)', withSuffix: 'with ད་, ན་, ལ་, ས་', result: 'ö (like French "eu" in bleu or German "ö")', example: 'བོད (bod) → "Bö" (Tibet)' },
  { base: 'u (ཨུ)', withSuffix: 'with ད་, ན་, ལ་, ས་', result: 'ü (like French "u" in tu or German "ü")', example: 'ཡུལ (yul) → "Yül" (country)' }
];

export const CURATED_WORDS = [
  {
    tibetan: 'བཀྲ་ཤིས་བདེ་ལེགས',
    wylie: 'bkra shis bde legs',
    phonetic: 'Tashi Delek',
    meaning: 'Blessings / Auspicious Good Fortune (Tibetan greeting)',
    syllables: [
      {
        syllable: 'བཀྲ',
        prefix: 'བ',
        root: 'ཀ',
        subscript: 'ྲ',
        superscript: null,
        vowel: null,
        suffix: null,
        postsuffix: null,
        phonetic: 'Ta',
        wylie: 'bkra',
        tone: 'High flat (55)',
        spelling: 'Ba-ka-ra-ta Tra -> Ta!'
      },
      {
        syllable: 'ཤིས',
        prefix: null,
        root: 'ཤ',
        subscript: null,
        superscript: null,
        vowel: 'ི',
        suffix: 'ས',
        postsuffix: null,
        phonetic: 'Shi',
        wylie: 'shis',
        tone: 'High falling (53)',
        spelling: 'Sha-gigu Shi, Shi-sa Shi!'
      },
      {
        syllable: 'བདེ',
        prefix: 'བ',
        root: 'ད',
        subscript: null,
        superscript: null,
        vowel: 'ེ',
        suffix: null,
        postsuffix: null,
        phonetic: 'De',
        wylie: 'bde',
        tone: 'High flat (55)',
        spelling: 'Ba-da-drengbu De!'
      },
      {
        syllable: 'ལེགས',
        prefix: null,
        root: 'ལ',
        subscript: null,
        superscript: null,
        vowel: 'ེ',
        suffix: 'ག',
        postsuffix: 'ས',
        phonetic: 'Lek',
        wylie: 'legs',
        tone: 'Low falling (12)',
        spelling: 'La-drengbu Le, Le-ga Lek, Lek-sa Lek!'
      }
    ]
  },
  {
    tibetan: 'ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ',
    wylie: 'om ma ni pad me hum',
    phonetic: 'Om Mani Padme Hum',
    meaning: 'The Great Six-Syllable Mantra of Avalokiteshvara (Compassion)',
    syllables: [
      {
        syllable: 'ཨོཾ',
        prefix: null,
        root: 'ཨ',
        subscript: null,
        superscript: null,
        vowel: 'ོ',
        suffix: 'ཾ (bindu/m)',
        postsuffix: null,
        phonetic: 'Om',
        wylie: 'om',
        tone: 'High flat (55)',
        spelling: 'A-naro O with bindu Om!'
      },
      {
        syllable: 'མ',
        prefix: null,
        root: 'མ',
        subscript: null,
        superscript: null,
        vowel: null,
        suffix: null,
        postsuffix: null,
        phonetic: 'Ma',
        wylie: 'ma',
        tone: 'Low level (13)',
        spelling: 'Root Ma!'
      },
      {
        syllable: 'ཎི',
        prefix: null,
        root: 'ཎ',
        subscript: null,
        superscript: null,
        vowel: 'ི',
        suffix: null,
        postsuffix: null,
        phonetic: 'Ni',
        wylie: 'ni',
        tone: 'Low level (13)',
        spelling: 'Na-gigu Ni!'
      },
      {
        syllable: 'པད',
        prefix: null,
        root: 'པ',
        subscript: null,
        superscript: null,
        vowel: null,
        suffix: 'ད',
        postsuffix: null,
        phonetic: 'Pä',
        wylie: 'pad',
        tone: 'High falling (53)',
        spelling: 'Pa-da Pä!'
      },
      {
        syllable: 'མེ',
        prefix: null,
        root: 'མ',
        subscript: null,
        superscript: null,
        vowel: 'ེ',
        suffix: null,
        postsuffix: null,
        phonetic: 'Me',
        wylie: 'me',
        tone: 'Low level (13)',
        spelling: 'Ma-drengbu Me!'
      },
      {
        syllable: 'ཧཱུྃ',
        prefix: null,
        root: 'ཧ',
        subscript: null,
        superscript: null,
        vowel: 'ུ',
        suffix: 'ྃ (bindu)',
        postsuffix: null,
        phonetic: 'Hung',
        wylie: 'hum',
        tone: 'High falling (53)',
        spelling: 'Ha-zhabkyu Hu with bindu Hum!'
      }
    ]
  },
  {
    tibetan: 'སངས་རྒྱས',
    wylie: 'sangs rgyas',
    phonetic: 'Sangye',
    meaning: 'The Buddha (Purified & Blossomed)',
    syllables: [
      {
        syllable: 'སངས',
        prefix: null,
        root: 'ས',
        subscript: null,
        superscript: null,
        vowel: null,
        suffix: 'ང',
        postsuffix: 'ས',
        phonetic: 'Sang',
        wylie: 'sangs',
        tone: 'High flat (55)',
        spelling: 'Sa-nga Sang, Sang-sa Sang!'
      },
      {
        syllable: 'རྒྱས',
        prefix: null,
        root: 'ག',
        subscript: 'ྱ',
        superscript: 'ར',
        vowel: null,
        suffix: 'ས',
        postsuffix: null,
        phonetic: 'Gye',
        wylie: 'rgyas',
        tone: 'High flat (55)',
        spelling: 'Ra-ga-ta Ga, Ga-ya-ta Gya, Gya-sa Gye!'
      }
    ]
  },
  {
    tibetan: 'བསྒྲུབས',
    wylie: 'bsgrubs',
    phonetic: 'Drub',
    meaning: 'Accomplished / Practiced (The classic 7-slot masterpiece syllable)',
    syllables: [
      {
        syllable: 'བསྒྲུབས',
        prefix: 'བ',
        superscript: 'ས',
        root: 'ག',
        subscript: 'ྲ',
        vowel: 'ུ',
        suffix: 'བ',
        postsuffix: 'ས',
        phonetic: 'Drub',
        wylie: 'bsgrubs',
        tone: 'High falling (53)',
        spelling: 'Sa-ga-ta Ga, Ga-ra-ta Dra, Ba-dra-zhabkyu Dru, Dru-ba Drub, Drub-sa Drub!'
      }
    ]
  },
  {
    tibetan: 'བླ་མ',
    wylie: 'bla ma',
    phonetic: 'Lama',
    meaning: 'Guru / Spiritual Master (Highest Principle)',
    syllables: [
      {
        syllable: 'བླ',
        prefix: null,
        root: 'བ',
        subscript: 'ླ',
        superscript: null,
        vowel: null,
        suffix: null,
        postsuffix: null,
        phonetic: 'La',
        wylie: 'bla',
        tone: 'High flat (55)',
        spelling: 'Ba-la-ta La (elevated to High La)!'
      },
      {
        syllable: 'མ',
        prefix: null,
        root: 'མ',
        subscript: null,
        superscript: null,
        vowel: null,
        suffix: null,
        postsuffix: null,
        phonetic: 'Ma',
        wylie: 'ma',
        tone: 'Low level (13)',
        spelling: 'Ma!'
      }
    ]
  },
  {
    tibetan: 'ལྷ་ས',
    wylie: 'lha sa',
    phonetic: 'Lhasa',
    meaning: 'Abode of the Gods (Capital of Tibet)',
    syllables: [
      {
        syllable: 'ལྷ',
        prefix: null,
        root: 'ཧ',
        subscript: null,
        superscript: 'ལ',
        vowel: null,
        suffix: null,
        postsuffix: null,
        phonetic: 'Lha (breathy aspirated L)',
        wylie: 'lha',
        tone: 'High flat (55)',
        spelling: 'La-ha-ta Lha!'
      },
      {
        syllable: 'ས',
        prefix: null,
        root: 'ས',
        subscript: null,
        superscript: null,
        vowel: null,
        suffix: null,
        postsuffix: null,
        phonetic: 'Sa',
        wylie: 'sa',
        tone: 'High flat (55)',
        spelling: 'Root Sa (Place)!'
      }
    ]
  },
  {
    tibetan: 'ཐུགས་རྗེ་ཆེ',
    wylie: 'thugs rje che',
    phonetic: 'Thukje-che',
    meaning: 'Thank you (Lit. Great heart/compassion)',
    syllables: [
      {
        syllable: 'ཐུགས',
        prefix: null,
        root: 'ཐ',
        subscript: null,
        superscript: null,
        vowel: 'ུ',
        suffix: 'ག',
        postsuffix: 'ས',
        phonetic: 'Thuk',
        wylie: 'thugs',
        tone: 'High falling (53)',
        spelling: 'Tha-zhabkyu Thu, Thu-ga Thuk, Thuk-sa Thuk!'
      },
      {
        syllable: 'རྗེ',
        prefix: null,
        root: 'ཇ',
        subscript: null,
        superscript: 'ར',
        vowel: 'ེ',
        suffix: null,
        postsuffix: null,
        phonetic: 'Je',
        wylie: 'rje',
        tone: 'High flat (55)',
        spelling: 'Ra-ja-ta Ja (elevated), Ja-drengbu Je!'
      },
      {
        syllable: 'ཆེ',
        prefix: null,
        root: 'ཆ',
        subscript: null,
        superscript: null,
        vowel: 'ེ',
        suffix: null,
        postsuffix: null,
        phonetic: 'Che',
        wylie: 'che',
        tone: 'High flat (55)',
        spelling: 'Cha-drengbu Che!'
      }
    ]
  },
  {
    tibetan: 'བོད་སྐད',
    wylie: 'bod skad',
    phonetic: 'Bö-ke',
    meaning: 'Tibetan Spoken Language',
    syllables: [
      {
        syllable: 'བོད',
        prefix: null,
        root: 'བ',
        subscript: null,
        superscript: null,
        vowel: 'ོ',
        suffix: 'ད',
        postsuffix: null,
        phonetic: 'Bö',
        wylie: 'bod',
        tone: 'Low falling (12)',
        spelling: 'Ba-naro Bo, Bo-da Bö!'
      },
      {
        syllable: 'སྐད',
        prefix: null,
        root: 'ཀ',
        subscript: null,
        superscript: 'ས',
        vowel: null,
        suffix: 'ད',
        postsuffix: null,
        phonetic: 'Kä',
        wylie: 'skad',
        tone: 'High falling (53)',
        spelling: 'Sa-ka-ta Ka, Ka-da Kä!'
      }
    ]
  }
];
