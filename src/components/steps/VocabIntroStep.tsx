import React, { useState } from 'react';
import { VocabularyItem, ThaiSupportLevel } from '../../types';
import { speakEnglish, playClickPop } from '../../utils/audio';
import { Volume2, Snail, CheckCircle2, Bookmark, ArrowRight } from 'lucide-react';

interface VocabIntroStepProps {
  vocabData: VocabularyItem;
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const VocabIntroStep: React.FC<VocabIntroStepProps> = ({
  vocabData,
  thaiSupport,
  onComplete,
}) => {
  const [hasListened, setHasListened] = useState(false);

  const handleListenWord = (slow = false) => {
    playClickPop();
    setHasListened(true);
    speakEnglish(vocabData.word, { rate: slow ? 0.65 : 0.85 });
  };

  const handleListenSentence = () => {
    playClickPop();
    speakEnglish(vocabData.exampleSentence, { rate: 0.85 });
  };

  const typeColorMap: Record<string, string> = {
    noun: 'bg-amber-100 text-amber-900 border-amber-300',
    verb: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    adjective: 'bg-sky-100 text-sky-900 border-sky-300',
    pronoun: 'bg-purple-100 text-purple-900 border-purple-300',
  };

  const typeThaiMap: Record<string, string> = {
    noun: 'คำนาม (คน/สัตว์/สิ่งของ)',
    verb: 'คำกริยา (การกระทำ)',
    adjective: 'คำคุณศัพท์ (บอกลักษณะ)',
    pronoun: 'คำสรรพนาม',
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-center">
        
        {/* Word Type & Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Category: {vocabData.category}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${typeColorMap[vocabData.type] || 'bg-slate-100 text-slate-800'}`}>
            {vocabData.type.toUpperCase()} · {typeThaiMap[vocabData.type] || ''}
          </span>
        </div>

        {/* Big Visual Icon */}
        <div className="py-2">
          <span className="text-7xl sm:text-8xl inline-block hover:scale-105 transition-transform select-none">
            {vocabData.icon}
          </span>
        </div>

        {/* Word & Phonetic */}
        <div className="space-y-1">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {vocabData.word}
          </h2>

          {vocabData.phonetic && (
            <div className="text-slate-500 font-mono text-sm">
              {vocabData.phonetic}
            </div>
          )}

          {thaiSupport !== 'challenge' && (
            <div className="text-xl font-bold text-indigo-700 pt-1">
              {vocabData.thai}
            </div>
          )}
        </div>

        {/* Audio Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleListenWord(false)}
            className="flex items-center gap-2 py-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xs transition-all cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Listen Word</span>
          </button>

          <button
            onClick={() => handleListenWord(true)}
            className="flex items-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl border border-slate-200 transition-colors cursor-pointer"
          >
            <Snail className="w-5 h-5 text-amber-600" />
            <span>Slow</span>
          </button>
        </div>

        {/* Example Sentence Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-2">
          <div className="text-xs font-bold text-slate-400 tracking-wider">
            EXAMPLE SENTENCE / ตัวอย่างประโยค
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-bold text-slate-800">
                "{vocabData.exampleSentence}"
              </div>
              {thaiSupport !== 'challenge' && (
                <div className="text-sm text-slate-500 font-medium mt-0.5">
                  {vocabData.exampleThai}
                </div>
              )}
            </div>

            <button
              onClick={handleListenSentence}
              className="p-2.5 bg-white hover:bg-indigo-50 text-indigo-600 rounded-xl border border-slate-200 shadow-2xs transition-colors shrink-0 cursor-pointer"
              title="Hear Sentence"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Complete Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              playClickPop();
              onComplete();
            }}
            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>✓ I Mastered this Word! Continue / จำคำนี้ได้แล้ว</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
