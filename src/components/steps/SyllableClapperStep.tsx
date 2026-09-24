import React, { useState } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playClapSound, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface SyllableClapperStepProps {
  syllableData: {
    word: string;
    thai: string;
    icon: string;
    count: number;
    syllableBreak: string;
  };
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const SyllableClapperStep: React.FC<SyllableClapperStepProps> = ({
  syllableData,
  thaiSupport,
  onComplete,
}) => {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isClappingAnim, setIsClappingAnim] = useState(false);

  const handleClapChoice = (choice: number) => {
    playClickPop();
    setSelectedCount(choice);

    // Play clap sound burst
    playClapSequence(choice);

    if (choice === syllableData.count) {
      setIsCorrect(true);
      setTimeout(() => {
        playSuccessChime();
        speakEnglish(syllableData.word);
      }, choice * 220 + 150);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        playTryAgainSound();
      }, choice * 200);
    }
  };

  const playClapSequence = (times: number) => {
    setIsClappingAnim(true);
    let clapped = 0;
    const interval = setInterval(() => {
      playClapSound();
      clapped++;
      if (clapped >= times) {
        clearInterval(interval);
        setTimeout(() => setIsClappingAnim(false), 300);
      }
    }, 220);
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-center">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800">
            Syllable Rhythm / จังหวะพยางค์คำ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How many syllables (claps)?
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm text-slate-500 font-medium">
              คำนี้มีกี่พยางค์? ลองปรบมือออกเสียงตามจังหวะ
            </p>
          )}
        </div>

        {/* Word Showcase */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-3">
          <div className={`text-6xl sm:text-7xl transition-transform ${isClappingAnim ? 'scale-125' : ''}`}>
            {syllableData.icon}
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl font-black tracking-wider text-slate-900">
              {syllableData.word}
            </span>
            <button
              onClick={() => {
                playClickPop();
                speakEnglish(syllableData.word);
              }}
              className="p-2.5 bg-white hover:bg-slate-100 text-indigo-600 rounded-2xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              title="Hear Word"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {thaiSupport !== 'challenge' && (
            <div className="text-sm font-semibold text-slate-500">
              ความหมาย: {syllableData.thai}
            </div>
          )}
        </div>

        {/* Clapping Buttons: 1, 2, 3 */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 tracking-wider">
            TAP YOUR CLAP COUNT / เลือกจำนวนครั้งที่ปรบมือ
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((num) => {
              const isSelected = selectedCount === num;
              let btnStyle = 'bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-400 text-slate-800';

              if (isSelected) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300';
                } else {
                  btnStyle = 'bg-rose-50 border-2 border-rose-400 text-rose-900';
                }
              }

              return (
                <button
                  key={num}
                  onClick={() => handleClapChoice(num)}
                  className={`py-5 px-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${btnStyle}`}
                >
                  <span className="text-3xl sm:text-4xl">👏</span>
                  <div className="text-xl sm:text-2xl font-black">
                    {num} {num === 1 ? 'Clap' : 'Claps'}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {num} พยางค์
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Banner */}
        {selectedCount !== null && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-center gap-3 animate-pop ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
            )}

            <div className="text-left">
              <div className="font-extrabold text-base">
                {isCorrect ? '✓ Correct! ถูกต้องแล้ว!' : 'Try again! ลองนับใหม่อีกทีนะ'}
              </div>
              <div className="text-xs sm:text-sm font-medium">
                {syllableData.syllableBreak}
              </div>
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
              <span>Continue / ไปต่อ</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
