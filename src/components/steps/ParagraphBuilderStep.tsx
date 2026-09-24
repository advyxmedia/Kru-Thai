import React, { useState, useEffect } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, FileText } from 'lucide-react';

interface ParagraphSentence {
  id: string;
  text: string;
  thai: string;
}

interface ParagraphBuilderStepProps {
  paragraphData: {
    topic: string;
    topicThai: string;
    sentences: ParagraphSentence[];
    correctOrder: string[];
    explanationThai: string;
  };
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const ParagraphBuilderStep: React.FC<ParagraphBuilderStepProps> = ({
  paragraphData,
  thaiSupport,
  onComplete,
}) => {
  const [placedIds, setPlacedIds] = useState<string[]>([]);
  const [availableSentences, setAvailableSentences] = useState<ParagraphSentence[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const shuffled = [...paragraphData.sentences].sort(() => Math.random() - 0.5);
    setAvailableSentences(shuffled);
    setPlacedIds([]);
    setIsSuccess(false);
    setHasError(false);
  }, [paragraphData]);

  const handleAddSentence = (sentence: ParagraphSentence) => {
    playClickPop();
    speakEnglish(sentence.text);
    setHasError(false);

    const nextPlaced = [...placedIds, sentence.id];
    setPlacedIds(nextPlaced);

    if (nextPlaced.length === paragraphData.sentences.length) {
      checkParagraph(nextPlaced);
    }
  };

  const handleRemoveSentence = (id: string) => {
    playClickPop();
    setPlacedIds(placedIds.filter((item) => item !== id));
    setIsSuccess(false);
    setHasError(false);
  };

  const checkParagraph = (placed: string[]) => {
    const isCorrect = placed.join(',') === paragraphData.correctOrder.join(',');

    if (isCorrect) {
      setIsSuccess(true);
      setHasError(false);
      playSuccessChime();
      setTimeout(() => {
        const fullText = paragraphData.sentences
          .slice()
          .sort(
            (a, b) =>
              paragraphData.correctOrder.indexOf(a.id) -
              paragraphData.correctOrder.indexOf(b.id)
          )
          .map((s) => s.text)
          .join(' ');
        speakEnglish(fullText);
      }, 500);
    } else {
      setHasError(true);
      playTryAgainSound();
    }
  };

  const sentenceMap = new Map(paragraphData.sentences.map((s) => [s.id, s]));

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full text-xs font-bold text-cyan-800">
            Paragraph Builder / โครงสร้างย่อหน้า
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Topic: {paragraphData.topic}
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm text-slate-500 font-medium">
              หัวข้อ: {paragraphData.topicThai}
            </p>
          )}
        </div>

        {/* Thai educational explanation note */}
        {thaiSupport !== 'challenge' && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed">
            💡 <strong>คำแนะนำ:</strong> {paragraphData.explanationThai}
          </div>
        )}

        {/* Placed Sentences List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 tracking-wider">
            <span>YOUR ASSEMBLED PARAGRAPH / ย่อหน้าของคุณ</span>
            {placedIds.length > 0 && !isSuccess && (
              <button
                onClick={() => {
                  playClickPop();
                  setPlacedIds([]);
                  setHasError(false);
                }}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div
            className={`min-h-[140px] p-4 rounded-2xl border-2 space-y-2.5 transition-all ${
              isSuccess
                ? 'border-emerald-500 bg-emerald-50/70'
                : hasError
                ? 'border-rose-400 bg-rose-50/70'
                : 'border-dashed border-slate-300 bg-slate-50'
            }`}
          >
            {placedIds.length === 0 ? (
              <div className="h-28 flex items-center justify-center text-sm text-slate-400 font-medium">
                Tap sentence cards below in logical order (1 → 2 → 3 → 4)
              </div>
            ) : (
              placedIds.map((id, idx) => {
                const s = sentenceMap.get(id);
                if (!s) return null;
                return (
                  <div
                    key={id}
                    onClick={() => !isSuccess && handleRemoveSentence(id)}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3 cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-slate-800 text-base">{s.text}</div>
                        {thaiSupport !== 'challenge' && (
                          <div className="text-xs text-slate-500">{s.thai}</div>
                        )}
                      </div>
                    </div>
                    {!isSuccess && <span className="text-xs text-slate-400">✕</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Available Sentences */}
        {!isSuccess && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 tracking-wider">
              AVAILABLE SENTENCES / แตะประโยคเพื่อนำไปวาง
            </div>
            <div className="space-y-2">
              {availableSentences.map((s) => {
                const isUsed = placedIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => handleAddSentence(s)}
                    disabled={isUsed}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isUsed
                        ? 'opacity-25 bg-slate-100 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-indigo-50/50 border-slate-200 hover:border-indigo-400 hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                  >
                    <div className="font-bold text-slate-800 text-base">{s.text}</div>
                    {thaiSupport !== 'challenge' && (
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{s.thai}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Success Card */}
        {isSuccess && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-4 animate-pop">
            <div className="flex items-center justify-center gap-2 text-2xl font-black text-emerald-950">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              <span>Great Paragraph Construction!</span>
            </div>
            <p className="text-sm text-emerald-800 font-medium">
              คุณเรียงลำดับประโยคตั้งแต่เปิดเรื่องจนจบได้อย่างเป็นธรรมชาติ
            </p>
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
