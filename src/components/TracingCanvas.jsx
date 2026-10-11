import React, { useRef, useState, useEffect } from 'react';
import { Volume2, RotateCcw, Edit3, Sparkles } from 'lucide-react';
import { CONSONANTS } from '../data/tibetanData';
import { audioEngine } from '../utils/audioEngine';

export default function TracingCanvas({ onAddXp }) {
  const canvasRef = useRef(null);
  const [selectedLetter, setSelectedLetter] = useState(CONSONANTS[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#b45309'); // Saffron gold
  const [brushSize, setBrushSize] = useState(12);

  useEffect(() => {
    drawCanvasBackground();
  }, [selectedLetter]);

  const drawCanvasBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const isDark = document.documentElement.classList.contains('dark');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas base background
    ctx.fillStyle = isDark ? '#0c0a09' : '#faf7f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw faint grid guidelines
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Horizontal center
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    // Vertical center
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Draw Top baseline guide (Tibetan letters hang from the top line!)
    ctx.strokeStyle = isDark ? 'rgba(234, 179, 8, 0.25)' : 'rgba(180, 83, 9, 0.25)';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(40, 110);
    ctx.lineTo(canvas.width - 40, 110);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw faint ghost Tibetan letter template
    ctx.font = '220px "Noto Sans Tibetan", "Noto Serif Tibetan", serif';
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.13)' : 'rgba(0, 0, 0, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedLetter.tibetan, canvas.width / 2, canvas.height / 2 + 15);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (onAddXp) onAddXp(2);
    }
  };

  const clearCanvas = () => {
    drawCanvasBackground();
    audioEngine.playClick();
  };

  const colors = [
    { name: 'Saffron Gold', hex: '#b45309' },
    { name: 'Crimson', hex: '#be123c' },
    { name: 'Cyan', hex: '#0284c7' },
    { name: 'Black Ink', hex: '#1c1917' },
    { name: 'Pure Gold', hex: '#fbbf24' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-100 via-rose-50/70 to-amber-50/50 dark:from-stone-900 dark:via-rose-950/60 dark:to-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm dark:shadow-2xl transition-colors">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs font-semibold mb-3">
            <Edit3 className="w-3.5 h-3.5" />
            Kinesthetic Memory Accelerator
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-amber-100 mb-2">
            Tibetan Calligraphy & Tracing Pad
          </h2>
          <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Writing Tibetan creates muscular memory anchors in the brain. 
            Notice the <strong className="text-amber-700 dark:text-amber-400 font-semibold">top baseline</strong>: Tibetan letters hang suspended from the top line rather than sitting on a bottom floor!
          </p>
        </div>
      </div>

      {/* Main Tracing Workplace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Scrollable Letter Picker & Stroke Tips */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm dark:shadow-xl transition-colors">
            <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-3">
              Select Letter to Trace:
            </label>
            <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {CONSONANTS.map((c) => (
                <button
                  key={c.tibetan}
                  onClick={() => {
                    setSelectedLetter(c);
                    audioEngine.playPhonetic(c.phonetic, c.tone, c.tibetan);
                  }}
                  className={`p-2 rounded-xl transition flex flex-col items-center ${
                    selectedLetter.tibetan === c.tibetan
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md scale-105'
                      : 'bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <span className="font-tibetan text-xl">{c.tibetan}</span>
                  <span className="text-[9px] font-mono mt-0.5">{c.wylie}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stroke Sequence Guide */}
          <div className="bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm dark:shadow-xl text-xs transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-stone-900 dark:text-amber-300 font-mono text-sm">
                {selectedLetter.wylie.toUpperCase()} ({selectedLetter.tibetan})
              </span>
              <button
                onClick={() => audioEngine.playPhonetic(selectedLetter.phonetic, selectedLetter.tone, selectedLetter.tibetan)}
                className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-700 dark:text-stone-300 transition"
                title={`Hear ${selectedLetter.tibetan}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-stone-500 dark:text-stone-400 mb-2">Stroke Sequence:</p>
            <ol className="list-decimal list-inside space-y-1.5 text-stone-700 dark:text-stone-300">
              {selectedLetter.strokes?.map((st, i) => (
                <li key={i}>{st}</li>
              )) || <li>1. Top horizontal bar left to right</li>}
            </ol>
          </div>
        </div>

        {/* Right: The HTML5 Canvas Drawing Board */}
        <div className="lg:col-span-8 bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm dark:shadow-2xl flex flex-col items-center transition-colors">
          {/* Controls Bar */}
          <div className="w-full flex items-center justify-between flex-wrap gap-3 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800 text-xs">
            {/* Color Palette */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 dark:text-stone-400 font-semibold">Ink:</span>
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setBrushColor(c.hex)}
                  className={`w-6 h-6 rounded-full border-2 transition ${
                    brushColor === c.hex ? 'border-amber-500 scale-110 shadow-sm' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Thickness */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 dark:text-stone-400 font-semibold">Width:</span>
              {[8, 12, 18].map((size) => (
                <button
                  key={size}
                  onClick={() => setBrushSize(size)}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                    brushSize === size ? 'bg-amber-500 text-stone-950' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>

            {/* Clear Button */}
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Pad</span>
            </button>
          </div>

          {/* Responsive Touch / Mouse Canvas */}
          <div className="relative touch-none border-2 border-stone-300 dark:border-stone-800 rounded-3xl overflow-hidden bg-stone-50 dark:bg-stone-950 shadow-inner">
            <canvas
              ref={canvasRef}
              width={480}
              height={400}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="cursor-crosshair block max-w-full"
            />
          </div>

          <p className="text-xs text-stone-500 mt-3 text-center">
            Trace over the faint ghost outline. Always begin with the flat top hanging bar from left to right!
          </p>
        </div>
      </div>
    </div>
  );
}
