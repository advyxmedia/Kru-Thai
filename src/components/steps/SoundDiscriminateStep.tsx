import React, { useState } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface SoundDiscriminateOption {
  word: string;
  thai: string;
  icon: string;
  isCorrect: boolean;
  soundExplanationThai: string;
}

interface SoundDiscriminateStepProps {
  soundPrompt: string;
  soundPromptThai: string;
  targetSound: string;
  options: SoundDiscriminateOption[];
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const SoundDiscriminateStep: React.FC<SoundDiscriminateStepProps> = ({
  soundPrompt,
  soundPromptThai,
  targetSound,
  options,
  thaiSupport,
  onComplete,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (index: number) => {
    playClickPop();
    const opt = options[index];
    setSelectedIndex(index);

    // Speak the word
    speakEnglish(opt.word);

    if (opt.isCorrect) {
      setIsCorrect(true);
      playSuccessChime();
    } else {
      setIsCorrect(false);
      playTryAgainSound();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Question Banner */}
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
            Phonemic Awareness / แยกแยะเสียง
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {soundPrompt}
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm font-medium text-slate-500">
              {soundPromptThai}
            </p>
          )}
          <div className="pt-2">
            <span className="inline-block bg-indigo-600 text-white font-mono text-xl font-bold px-4 py-1.5 rounded-xl shadow-xs">
              {targetSound}
            </span>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            let borderStyle = 'border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50';

            if (isSelected) {
              if (option.isCorrect) {
                borderStyle = 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-300';
              } else {
                borderStyle = 'border-rose-400 bg-rose-50/70';
              }
            }

            return (
              <button
                key={option.word}
                onClick={() => handleSelect(idx)}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center gap-3 cursor-pointer group ${borderStyle}`}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {option.icon}
                </span>

                <div>
                  <div className="text-xl font-extrabold text-slate-800 tracking-wide">
                    {option.word}
                  </div>
                  {thaiSupport !== 'challenge' && (
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      {option.thai}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] text-indigo-600 font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Tap to listen</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {selectedIndex !== null && (
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 animate-pop ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            )}

            <div className="space-y-1">
              <div className="font-extrabold text-base">
                {isCorrect ? '✓ Correct! ยอดเยี่ยมมาก!' : 'Try again! ลองใหม่อีกครั้งนะ'}
              </div>
              <p className="text-xs sm:text-sm font-medium">
                {options[selectedIndex].soundExplanationThai}
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {isCorrect && (
          <div className="pt-2">
            <button
              onClick={() => {
                playClickPop();
                onComplete();
              }}
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue / ไปข้อถัดไป</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
