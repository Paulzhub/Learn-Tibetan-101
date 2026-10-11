import React, { useState, useEffect } from 'react';
import { Volume2, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles, Zap, Flame, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONSONANTS, CURATED_WORDS } from '../data/tibetanData';
import { audioEngine } from '../utils/audioEngine';

export default function PracticeGrounds({ onAddXp, onIncrementStreak }) {
  const [practiceMode, setPracticeMode] = useState('flashcards'); // 'flashcards', 'decipherQuiz', 'speedSprint'

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = CONSONANTS[cardIndex % CONSONANTS.length];

  // Decipher Quiz state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);

  // Speed Sprint state
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintTimeLeft, setSprintTimeLeft] = useState(45);
  const [sprintScore, setSprintScore] = useState(0);
  const [sprintTarget, setSprintTarget] = useState(CONSONANTS[0]);
  const [sprintOptions, setSprintOptions] = useState([]);
  const [sprintHighScore, setSprintHighScore] = useState(() => {
    return parseInt(localStorage.getItem('tibetan_sprint_highscore') || '0', 10);
  });

  // Quiz Questions Generator
  const quizQuestions = [
    {
      syllable: 'བཀྲ་ཤིས',
      target: 'བཀྲ',
      question: 'In the syllable བཀྲ (Tra), what is the CORE ROOT LETTER (མིང་གཞི)?',
      options: ['བ (Ba)', 'ཀ (Ka)', 'ྲ (Ra-ta)', 'None'],
      correctIndex: 1,
      explanation: 'ཀ (Ka) is the root! བ is the prefix, and ྲ is the subscript Ra-ta.'
    },
    {
      syllable: 'བསྒྲུབས',
      target: 'བསྒྲུབས',
      question: 'In the classic syllable བསྒྲུབས (Drub), what is the core Root Letter?',
      options: ['བ (Ba)', 'ས (Sa)', 'ག (Ga)', 'བ (Suffix Ba)'],
      correctIndex: 2,
      explanation: 'ག (Ga) is the core root! It is surrounded by Prefix བ, Superscript ས, Subscript ྲ, Vowel ུ, Suffix བ, and Post-suffix ས!'
    },
    {
      syllable: 'བླ་མ',
      target: 'བླ',
      question: 'What is the correct Lhasa pronunciation of བླ (bla)?',
      options: ['bla (low)', 'la (High flat)', 'ba (low)', 'wa (falling)'],
      correctIndex: 1,
      explanation: 'Rule of La-ta (ལ་བཏགས): When La subjoins, almost all combinations become pure HIGH TONE "LA"!'
    },
    {
      syllable: 'བོད',
      target: 'བོད',
      question: 'Why is བོད (bod - Tibet) pronounced "Bö" rather than "Bod"?',
      options: [
        'Suffix ད་ causes vowel fronting (umlaut) and is silent',
        'Suffix ད་ is pronounced as a heavy "t"',
        'Prefix བ alters the tone',
        'It is an irregular loanword'
      ],
      correctIndex: 0,
      explanation: 'Suffixes ད་, ན་, ལ་, ས་ cause umlaut fronting: o becomes ö, and final ད་ creates a sharp glottal stop cutoff.'
    },
    {
      syllable: 'སངས་རྒྱས',
      target: 'རྒྱས',
      question: 'What happens to the tone of ག (Ga) in རྒྱས (rgyas)?',
      options: [
        'Remains low tone',
        'Ra-go (ར་མགོ) elevates low Ga to HIGH TONE',
        'Becomes a silent whisper',
        'Turns into a nasal'
      ],
      correctIndex: 1,
      explanation: 'Superscripts (Ra-go, La-go, Sa-go) ELEVATE low consonants to High Tone.'
    }
  ];

  const currentQuiz = quizQuestions[quizQuestionIndex % quizQuestions.length];

  // Sprint setup
  const generateSprintRound = () => {
    const target = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
    const options = [target];
    while (options.length < 4) {
      const rand = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
      if (!options.some((o) => o.tibetan === rand.tibetan)) {
        options.push(rand);
      }
    }
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    setSprintTarget(target);
    setSprintOptions(options);
  };

  useEffect(() => {
    let timer;
    if (sprintActive && sprintTimeLeft > 0) {
      timer = setInterval(() => {
        setSprintTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (sprintActive && sprintTimeLeft === 0) {
      setSprintActive(false);
      audioEngine.playSuccessSound();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      if (sprintScore > sprintHighScore) {
        setSprintHighScore(sprintScore);
        localStorage.setItem('tibetan_sprint_highscore', sprintScore.toString());
      }
    }
    return () => clearInterval(timer);
  }, [sprintActive, sprintTimeLeft, sprintScore, sprintHighScore]);

  const handleStartSprint = () => {
    setSprintScore(0);
    setSprintTimeLeft(45);
    generateSprintRound();
    setSprintActive(true);
    audioEngine.playClick();
  };

  const handleSprintChoice = (choice) => {
    if (!sprintActive) return;
    if (choice.tibetan === sprintTarget.tibetan) {
      setSprintScore((prev) => prev + 1);
      audioEngine.playClick();
      if (onAddXp) onAddXp(5);
      generateSprintRound();
    } else {
      audioEngine.playErrorSound();
      setSprintTimeLeft((prev) => Math.max(0, prev - 2)); // 2 sec penalty
    }
  };

  const handleQuizAnswer = (idx) => {
    if (isQuizAnswered) return;
    setSelectedOption(idx);
    setIsQuizAnswered(true);

    if (idx === currentQuiz.correctIndex) {
      setQuizScore((prev) => prev + 1);
      audioEngine.playSuccessSound();
      if (onAddXp) onAddXp(20);
      if (onIncrementStreak) onIncrementStreak();
    } else {
      audioEngine.playErrorSound();
    }
  };

  const nextQuizQuestion = () => {
    setSelectedOption(null);
    setIsQuizAnswered(false);
    setQuizQuestionIndex((prev) => prev + 1);
    audioEngine.playClick();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Modes Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-stone-800 pb-4">
        <div>
          <h2 className="font-title text-2xl font-bold text-amber-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            Tibetan Mastery Training Grounds
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Reinforce reading fluency through spaced repetition and rapid deciphers
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: 'flashcards', label: 'Spaced Flashcards', icon: Zap },
            { id: 'decipherQuiz', label: 'Decipher Quiz', icon: Award },
            { id: 'speedSprint', label: 'Speed Sprint', icon: Flame },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setPracticeMode(m.id);
                  audioEngine.playClick();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  practiceMode === m.id
                    ? 'bg-rose-900 text-amber-200 border border-rose-600 shadow-lg shadow-rose-950'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. FLASHCARDS MODE */}
      {practiceMode === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-400 px-2">
            <span>Card { (cardIndex % CONSONANTS.length) + 1 } of { CONSONANTS.length }</span>
            <span>Click card or Spacebar to flip</span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => {
              setIsFlipped(!isFlipped);
              audioEngine.playClick();
            }}
            className="w-full min-h-[340px] bg-gradient-to-br from-stone-900 via-rose-950/40 to-stone-900 border-2 border-stone-800 hover:border-amber-500/60 rounded-3xl p-8 flex flex-col justify-between items-center text-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-101"
          >
            {!isFlipped ? (
              /* FRONT */
              <div className="my-auto space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Identify This Consonant & Tone:
                </span>
                <span className="font-tibetan text-8xl sm:text-9xl text-amber-300 font-bold block my-4 select-none">
                  {currentCard.tibetan}
                </span>
                <span className="text-xs text-stone-400 bg-stone-950/60 px-4 py-1.5 rounded-full border border-stone-800">
                  Tap card to reveal answer
                </span>
              </div>
            ) : (
              /* BACK */
              <div className="my-auto space-y-4 animate-fadeIn">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-4xl font-extrabold text-amber-200">
                    {currentCard.wylie}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      currentCard.tone === 'high'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {currentCard.tone} Tone (55)
                  </span>
                </div>

                <div className="p-3 bg-stone-950/80 rounded-2xl border border-stone-800 text-xs text-stone-300 max-w-sm">
                  <p className="font-medium text-amber-300 mb-1">💡 Memory Hook:</p>
                  <p>{currentCard.mnemonic}</p>
                </div>

                <div className="text-xs text-stone-400">
                  Phonetic: <strong className="text-stone-200">/{currentCard.phonetic}/</strong> • Row {currentCard.row}, Col {currentCard.col}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioEngine.playPhonetic(currentCard.phonetic, currentCard.tone);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition shadow-md"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>
            )}
          </div>

          {/* Card Action Controls */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                setCardIndex((prev) => Math.max(0, prev - 1));
                setIsFlipped(false);
                audioEngine.playClick();
              }}
              className="py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-bold transition"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setIsFlipped(!isFlipped);
                audioEngine.playClick();
              }}
              className="py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-lg shadow-amber-950"
            >
              Flip Card
            </button>
            <button
              onClick={() => {
                setCardIndex((prev) => prev + 1);
                setIsFlipped(false);
                audioEngine.playClick();
                if (onAddXp) onAddXp(3);
              }}
              className="py-3 rounded-2xl bg-rose-900 hover:bg-rose-800 text-amber-200 border border-rose-700 text-xs font-bold transition"
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {/* 2. DECIPHER QUIZ MODE */}
      {practiceMode === 'decipherQuiz' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Question Header */}
            <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-3 border-b border-stone-800">
              <span className="font-bold text-amber-400 uppercase tracking-wider">
                Question { (quizQuestionIndex % quizQuestions.length) + 1 } of { quizQuestions.length }
              </span>
              <span className="font-semibold text-emerald-400">Score: {quizScore}</span>
            </div>

            {/* Target Display */}
            <div className="text-center py-6 bg-stone-950/70 rounded-2xl border border-stone-800/80 mb-6">
              <span className="text-xs font-bold text-stone-500 uppercase block mb-1">Examine Syllable:</span>
              <span className="font-tibetan text-6xl text-amber-300 font-bold block my-1">
                {currentQuiz.target}
              </span>
              <span className="text-xs text-stone-400">From word: {currentQuiz.syllable}</span>
            </div>

            {/* Question Title */}
            <h3 className="text-base sm:text-lg font-bold text-stone-100 mb-4 leading-relaxed">
              {currentQuiz.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQuiz.options.map((opt, idx) => {
                let btnStyle = 'bg-stone-950 hover:bg-stone-850 text-stone-300 border-stone-800';
                if (isQuizAnswered) {
                  if (idx === currentQuiz.correctIndex) {
                    btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-950 border-rose-500 text-rose-200 font-bold';
                  } else {
                    btnStyle = 'opacity-40 border-stone-900';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isQuizAnswered}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isQuizAnswered && idx === currentQuiz.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {isQuizAnswered && selectedOption === idx && idx !== currentQuiz.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Banner */}
            {isQuizAnswered && (
              <div className="mt-6 p-4 rounded-2xl bg-stone-950 border border-stone-800 animate-fadeIn">
                <span className="text-xs font-bold text-amber-300 block mb-1">
                  💡 Explanation:
                </span>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  {currentQuiz.explanation}
                </p>
                <button
                  onClick={nextQuizQuestion}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SPEED SPRINT MODE */}
      {practiceMode === 'speedSprint' && (
        <div className="max-w-lg mx-auto space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            {!sprintActive ? (
              <div className="space-y-5 py-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-950 border border-rose-700 mx-auto flex items-center justify-center text-rose-400">
                  <Flame className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-title text-2xl font-bold text-amber-100">
                    60-Second Reading Sprint
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                    Test your instant recognition reflex! Identify as many consonants as possible before the timer runs out.
                  </p>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-300 inline-block">
                  🏆 All-Time High Score: <strong className="text-amber-400">{sprintHighScore}</strong> correct
                </div>

                <div>
                  <button
                    onClick={handleStartSprint}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-stone-950 font-black text-sm hover:brightness-110 shadow-xl shadow-rose-950 transition active:scale-95"
                  >
                    Start Sprint!
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Timer & Score header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    ⏱️ Time Left: <span className="font-mono text-base text-rose-200">{sprintTimeLeft}s</span>
                  </span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    ⚡ Score: <span className="font-mono text-base text-emerald-200">{sprintScore}</span>
                  </span>
                </div>

                {/* Big Target Letter */}
                <div className="py-8 bg-stone-950 rounded-2xl border border-stone-800">
                  <span className="font-tibetan text-8xl text-amber-300 font-bold block select-none">
                    {sprintTarget.tibetan}
                  </span>
                </div>

                {/* 4 Quick Options */}
                <div className="grid grid-cols-2 gap-3">
                  {sprintOptions.map((opt) => (
                    <button
                      key={opt.tibetan}
                      onClick={() => handleSprintChoice(opt)}
                      className="py-4 px-3 rounded-2xl bg-stone-950 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-800 hover:border-amber-400 font-mono text-lg font-bold transition active:scale-95"
                    >
                      {opt.wylie}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
