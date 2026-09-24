import React, { useState } from 'react';
import { WordType, ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface WordItem {
  word: string;
  thai: string;
  icon: string;
  type: WordType;
}

interface WordTypeSortStepProps {
  words: WordItem[];
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const WordTypeSortStep: React.FC<WordTypeSortStepProps> = ({
  words,
  thaiSupport,
  onComplete,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  const currentWord = words[currentWordIndex];
  const isFinished = completedCount >= words.length;

  const categories: { type: WordType; label: string; labelThai: string; color: string; desc: string }[] = [
    {
      type: 'noun',
      label: 'NOUN',
      labelThai: 'คำนาม',
      color: 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100',
      desc: 'Person, animal, place, thing (คน/สัตว์/สิ่งของ)'
    },
    {
      type: 'verb',
      label: 'VERB',
      labelThai: 'คำกริยา',
      color: 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100',
      desc: 'Action word (การกระทำ)'
    },
    {
      type: 'adjective',
      label: 'ADJECTIVE',
      labelThai: 'คำคุณศัพท์',
      color: 'border-sky-300 bg-sky-50 text-sky-900 hover:bg-sky-100',
      desc: 'Describes something (บอกลักษณะ ขนาด สี)'
    }
  ];

  const handleSelectCategory = (selectedType: WordType) => {
    playClickPop();
    speakEnglish(currentWord.word);

    if (selectedType === currentWord.type) {
      playSuccessChime();
      setFeedback({
        isCorrect: true,
        message: `✓ Correct! "${currentWord.word.toUpperCase()}" is a ${selectedType.toUpperCase()}.`,
      });

      setTimeout(() => {
        setFeedback(null);
        if (currentWordIndex + 1 < words.length) {
          setCurrentWordIndex(currentWordIndex + 1);
          setCompletedCount(completedCount + 1);
        } else {
          setCompletedCount(words.length);
        }
      }, 1000);
    } else {
      playTryAgainSound();
      setFeedback({
        isCorrect: false,
        message: `Not quite! "${currentWord.word}" is an action/thing. Try again.`,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-center">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-bold text-indigo-800">
            Word Types Sorter / จำแนกประเภทของคำ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            What type of word is this?
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm text-slate-500 font-medium">
              คำนี้คือ คำนาม (Noun), คำกริยา (Verb) หรือ คำคุณศัพท์ (Adjective)?
            </p>
          )}
        </div>

        {!isFinished ? (
          <>
            {/* Word Card to Sort */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-3">
              <span className="text-6xl sm:text-7xl select-none inline-block">
                {currentWord.icon}
              </span>
              <div className="text-4xl font-black text-slate-900 tracking-wide">
                {currentWord.word}
              </div>
              {thaiSupport !== 'challenge' && (
                <div className="text-base font-bold text-indigo-700">
                  {currentWord.thai}
                </div>
              )}
              <div className="text-xs font-semibold text-slate-400">
                Word {currentWordIndex + 1} of {words.length}
              </div>
            </div>

            {/* Category Choices */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 tracking-wider">
                CHOOSE CATEGORY / แตะเลือกประเภท
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.type}
                    onClick={() => handleSelectCategory(cat.type)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center space-y-1 shadow-xs ${cat.color}`}
                  >
                    <div className="text-lg font-black">{cat.label}</div>
                    <div className="text-xs font-bold opacity-80">{cat.labelThai}</div>
                    <div className="text-[11px] opacity-70 leading-tight pt-1">
                      {cat.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 animate-pop ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span className="font-bold text-sm">{feedback.message}</span>
              </div>
            )}
          </>
        ) : (
          /* Finished State */
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-4 animate-pop">
            <span className="text-6xl">🎉</span>
            <h3 className="text-2xl font-black text-emerald-950">
              Word Types Mastered!
            </h3>
            <p className="text-sm font-medium text-emerald-800">
              คุณสามารถจำแนก Noun, Verb และ Adjective ได้อย่างถูกต้องแล้ว
            </p>
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
