import React, { useState } from 'react';
import { QuizQuestion, QuizOptionItem, ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface QuizMultipleChoiceStepProps {
  quizData: QuizQuestion;
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const QuizMultipleChoiceStep: React.FC<QuizMultipleChoiceStepProps> = ({
  quizData,
  thaiSupport,
  onComplete,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Normalize options into QuizOptionItem
  const normalizedOptions: QuizOptionItem[] = quizData.options.map((opt, idx) => {
    if (typeof opt === 'string') {
      return {
        text: opt,
        isCorrect: quizData.correctIndex !== undefined ? quizData.correctIndex === idx : false,
      };
    }
    return opt;
  });

  const handleSelect = (idx: number) => {
    playClickPop();
    setSelectedIdx(idx);

    const option = normalizedOptions[idx];
    speakEnglish(option.text);

    if (option.isCorrect) {
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
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-bold text-indigo-800">
            Quick Check Quiz / ทดสอบความเข้าใจ
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {quizData.question}
          </h2>

          {thaiSupport !== 'challenge' && quizData.questionThai && (
            <p className="text-base font-semibold text-slate-500">
              {quizData.questionThai}
            </p>
          )}

          {quizData.audioPrompt && (
            <button
              onClick={() => {
                playClickPop();
                speakEnglish(quizData.audioPrompt || quizData.question);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-indigo-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Prompt</span>
            </button>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {normalizedOptions.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

            if (isSelected) {
              if (opt.isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300';
              } else {
                btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
              }
            }

            return (
              <button
                key={`${opt.text}-${idx}`}
                onClick={() => handleSelect(idx)}
                className={`p-4 rounded-2xl border-2 text-left font-bold text-lg transition-all cursor-pointer shadow-xs flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                  <div>
                    <span className="font-extrabold text-lg">{opt.text}</span>
                    {thaiSupport !== 'challenge' && opt.thai && (
                      <div className="text-xs text-slate-500 font-medium">
                        {opt.thai}
                      </div>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <span>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Feedback */}
        {selectedIdx !== null && (
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 animate-pop ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-extrabold text-sm">
                {isCorrect ? '✓ Correct! ถูกต้องแล้ว' : 'Not quite! ลองดูคำอธิบาย'}
              </div>
              <div className="text-xs sm:text-sm font-medium mt-0.5">
                {quizData.explanationThai}
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
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
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
