import React, { useState } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

interface ComprehensionQuestion {
  question: string;
  questionThai: string;
  options: string[];
  correctIndex: number;
  explanationThai: string;
}

interface ComprehensionStepProps {
  storyTitle: string;
  storyTitleThai: string;
  passage: string;
  passageThai: string;
  questions: ComprehensionQuestion[];
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const ComprehensionStep: React.FC<ComprehensionStepProps> = ({
  storyTitle,
  storyTitleThai,
  passage,
  passageThai,
  questions,
  thaiSupport,
  onComplete,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQ = questions[currentQIndex];
  const isFinished = answeredCount >= questions.length;

  const handleSelectOption = (idx: number) => {
    playClickPop();
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      setIsCorrect(true);
      playSuccessChime();
    } else {
      setIsCorrect(false);
      playTryAgainSound();
    }
  };

  const handleNextQuestion = () => {
    playClickPop();
    setSelectedOption(null);
    setIsCorrect(null);
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(currentQIndex + 1);
      setAnsweredCount(answeredCount + 1);
    } else {
      setAnsweredCount(questions.length);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-xs font-bold text-rose-800">
            Reading Comprehension / อ่านจับใจความ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {storyTitle}
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm text-slate-500 font-medium">
              {storyTitleThai}
            </p>
          )}
        </div>

        {/* Reading Passage Box */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>STORY PASSAGE / เนื้อเรื่อง</span>
            </span>

            <button
              onClick={() => {
                playClickPop();
                speakEnglish(passage, { rate: 0.82 });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-indigo-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Passage</span>
            </button>
          </div>

          <p className="text-lg sm:text-xl font-medium text-slate-800 leading-relaxed">
            {passage}
          </p>

          {thaiSupport !== 'challenge' && (
            <div className="pt-3 border-t border-slate-200 text-sm text-slate-500 leading-relaxed">
              <strong>คำแปล:</strong> {passageThai}
            </div>
          )}
        </div>

        {/* Question Area */}
        {!isFinished ? (
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <div className="text-xs font-bold text-indigo-600">
                Question {currentQIndex + 1} of {questions.length}
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {currentQ.question}
              </h3>
              {thaiSupport !== 'challenge' && (
                <div className="text-xs text-slate-500 font-medium">
                  {currentQ.questionThai}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                if (isSelected) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300';
                  } else {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-2xl border-2 font-bold text-left transition-all cursor-pointer shadow-xs ${btnStyle}`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selectedOption !== null && (
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
                    {isCorrect ? '✓ Correct! ถูกต้อง' : 'Try again! ลองหาคำตอบในเนื้อเรื่องอีกครั้ง'}
                  </div>
                  <div className="text-xs sm:text-sm font-medium mt-0.5">
                    {currentQ.explanationThai}
                  </div>
                </div>
              </div>
            )}

            {isCorrect && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{currentQIndex + 1 < questions.length ? 'Next Question / ข้อถัดไป' : 'Finish Comprehension / เสร็จสิ้น'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-4 animate-pop">
            <span className="text-6xl">🌟</span>
            <h3 className="text-2xl font-black text-emerald-950">
              Comprehension Mastered!
            </h3>
            <p className="text-sm font-medium text-emerald-800">
              คุณสามารถอ่านจับใจความเรื่องราวภาษาอังกฤษและตอบคำถามได้อย่างถูกต้องครบถ้วน
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
