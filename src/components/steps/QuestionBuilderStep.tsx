import React, { useState, useEffect } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';

interface QuestionBuilderStepProps {
  questionData: {
    targetQuestion: string;
    targetThai: string;
    answer: string;
    answerThai: string;
    blocks: string[];
    correctOrder: string[];
  };
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const QuestionBuilderStep: React.FC<QuestionBuilderStepProps> = ({
  questionData,
  thaiSupport,
  onComplete,
}) => {
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const shuffled = [...questionData.blocks].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setPlacedWords([]);
    setIsSuccess(false);
    setHasError(false);
  }, [questionData]);

  const handleAddWord = (word: string, index: number) => {
    playClickPop();
    speakEnglish(word);
    setHasError(false);

    const nextPlaced = [...placedWords, word];
    setPlacedWords(nextPlaced);

    // Remove one instance from available
    const nextAvail = [...availableWords];
    nextAvail.splice(index, 1);
    setAvailableWords(nextAvail);

    if (nextPlaced.length === questionData.correctOrder.length) {
      checkQuestion(nextPlaced);
    }
  };

  const handleRemoveWord = (index: number) => {
    playClickPop();
    const word = placedWords[index];
    setAvailableWords([...availableWords, word]);

    const nextPlaced = [...placedWords];
    nextPlaced.splice(index, 1);
    setPlacedWords(nextPlaced);
    setIsSuccess(false);
    setHasError(false);
  };

  const checkQuestion = (placed: string[]) => {
    const isCorrect = placed.join(' ') === questionData.correctOrder.join(' ');
    if (isCorrect) {
      setIsSuccess(true);
      setHasError(false);
      playSuccessChime();
      setTimeout(() => {
        speakEnglish(questionData.targetQuestion, {
          onEnd: () => {
            setTimeout(() => {
              speakEnglish(questionData.answer);
            }, 400);
          },
        });
      }, 300);
    } else {
      setHasError(true);
      playTryAgainSound();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-bold text-indigo-800">
            Question Builder / การตั้งคำถาม
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Build the question
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-base text-indigo-700 font-bold">
              ความหมาย: "{questionData.targetThai}"
            </p>
          )}
        </div>

        {/* Target Placement Box */}
        <div
          className={`min-h-[88px] p-4 rounded-2xl border-2 transition-all flex items-center justify-center flex-wrap gap-2.5 ${
            isSuccess
              ? 'border-emerald-500 bg-emerald-50/70'
              : hasError
              ? 'border-rose-400 bg-rose-50/70'
              : 'border-dashed border-slate-300 bg-slate-50'
          }`}
        >
          {placedWords.length === 0 ? (
            <span className="text-sm text-slate-400 font-medium">
              Tap words below to arrange your question
            </span>
          ) : (
            placedWords.map((word, idx) => (
              <button
                key={`${word}-${idx}`}
                onClick={() => handleRemoveWord(idx)}
                disabled={isSuccess}
                className="py-2.5 px-4 rounded-xl border-2 border-indigo-400 bg-indigo-50 text-indigo-900 font-black text-lg sm:text-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{word}</span>
                {!isSuccess && <span className="text-xs opacity-50">✕</span>}
              </button>
            ))
          )}
        </div>

        {/* Word Options */}
        <div className="flex items-center justify-center flex-wrap gap-3">
          {availableWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleAddWord(word, idx)}
              disabled={isSuccess}
              className="py-3 px-5 rounded-2xl border-2 border-slate-300 hover:border-indigo-500 bg-white hover:bg-indigo-50 text-slate-900 font-black text-lg sm:text-xl shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Success Card with Q & A */}
        {isSuccess && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 space-y-4 animate-pop">
            <div className="text-center font-black text-emerald-950 text-xl flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>Question Formed Correctly!</span>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-2xl border border-emerald-200">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-slate-400">QUESTION:</div>
                  <div className="text-lg font-black text-slate-900">
                    {questionData.targetQuestion}
                  </div>
                  {thaiSupport !== 'challenge' && (
                    <div className="text-xs text-slate-500 font-medium">
                      {questionData.targetThai}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    playClickPop();
                    speakEnglish(questionData.targetQuestion);
                  }}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="border-t border-slate-100 pt-2 flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-emerald-700">ANSWER:</div>
                  <div className="text-lg font-black text-emerald-950">
                    {questionData.answer}
                  </div>
                  {thaiSupport !== 'challenge' && (
                    <div className="text-xs text-emerald-700 font-medium">
                      {questionData.answerThai}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    playClickPop();
                    speakEnglish(questionData.answer);
                  }}
                  className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-xl"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                playClickPop();
                onComplete();
              }}
              className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
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
