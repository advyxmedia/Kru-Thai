import React, { useState, useEffect } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

interface SentenceBlock {
  id: string;
  text: string;
  role: 'who' | 'action' | 'thing' | 'extra';
  thaiHint?: string;
}

interface SentenceBuilderStepProps {
  sentenceData: {
    targetSentence: string;
    targetThai: string;
    blocks: SentenceBlock[];
    correctOrder: string[];
  };
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const SentenceBuilderStep: React.FC<SentenceBuilderStepProps> = ({
  sentenceData,
  thaiSupport,
  onComplete,
}) => {
  // Ordered array of placed block IDs
  const [placedBlockIds, setPlacedBlockIds] = useState<string[]>([]);
  // Shuffled available blocks
  const [availableBlocks, setAvailableBlocks] = useState<SentenceBlock[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Shuffle blocks for challenge
    const shuffled = [...sentenceData.blocks].sort(() => Math.random() - 0.5);
    setAvailableBlocks(shuffled);
    setPlacedBlockIds([]);
    setIsSuccess(false);
    setHasError(false);
  }, [sentenceData]);

  const roleStyles: Record<string, { bg: string; border: string; text: string; label: string }> = {
    who: { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-900', label: 'WHO (ประธาน)' },
    action: { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-900', label: 'ACTION (กริยา)' },
    thing: { bg: 'bg-sky-100', border: 'border-sky-400', text: 'text-sky-900', label: 'THING (กรรม)' },
    extra: { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-900', label: 'EXTRA (ส่วนขยาย)' },
  };

  const handleAddBlock = (block: SentenceBlock) => {
    playClickPop();
    setHasError(false);
    speakEnglish(block.text);

    const nextPlaced = [...placedBlockIds, block.id];
    setPlacedBlockIds(nextPlaced);

    // If all blocks placed, auto check
    if (nextPlaced.length === sentenceData.blocks.length) {
      checkSentence(nextPlaced);
    }
  };

  const handleRemoveBlock = (blockId: string) => {
    playClickPop();
    setHasError(false);
    setIsSuccess(false);
    setPlacedBlockIds(placedBlockIds.filter((id) => id !== blockId));
  };

  const handleReset = () => {
    playClickPop();
    setPlacedBlockIds([]);
    setIsSuccess(false);
    setHasError(false);
  };

  const checkSentence = (placed: string[]) => {
    const blockMap = new Map(sentenceData.blocks.map((b) => [b.id, b.text]));
    const currentWords = placed.map((id) => blockMap.get(id) || '');
    const correctWords = sentenceData.correctOrder;

    const isMatch = currentWords.join(' ') === correctWords.join(' ');

    if (isMatch) {
      setIsSuccess(true);
      setHasError(false);
      playSuccessChime();
      setTimeout(() => {
        speakEnglish(sentenceData.targetSentence);
      }, 400);
    } else {
      setHasError(true);
      playTryAgainSound();
    }
  };

  const blockMap = new Map(sentenceData.blocks.map((b) => [b.id, b]));

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800">
            Sentence Building Engine / โครงสร้างประโยค
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Build the sentence
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-base text-indigo-700 font-bold">
              ความหมาย: "{sentenceData.targetThai}"
            </p>
          )}
        </div>

        {/* Sentence Block Placement Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 tracking-wider">
            <span>YOUR SENTENCE / ประโยคของคุณ</span>
            {placedBlockIds.length > 0 && (
              <button
                onClick={handleReset}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div
            className={`min-h-[96px] p-4 rounded-2xl border-2 transition-all flex items-center justify-center flex-wrap gap-2.5 ${
              isSuccess
                ? 'border-emerald-500 bg-emerald-50/60'
                : hasError
                ? 'border-rose-400 bg-rose-50/60'
                : 'border-dashed border-slate-300 bg-slate-50'
            }`}
          >
            {placedBlockIds.length === 0 ? (
              <span className="text-sm text-slate-400 font-medium">
                Tap words below to arrange your sentence in order
              </span>
            ) : (
              placedBlockIds.map((id) => {
                const b = blockMap.get(id);
                if (!b) return null;
                const style = roleStyles[b.role] || roleStyles.extra;
                return (
                  <button
                    key={id}
                    onClick={() => handleRemoveBlock(id)}
                    disabled={isSuccess}
                    className={`py-2.5 px-4 rounded-xl border-2 font-black text-lg sm:text-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer ${style.bg} ${style.border} ${style.text} hover:scale-95`}
                    title="Click to remove"
                  >
                    <span>{b.text}</span>
                    {!isSuccess && <span className="text-xs opacity-50">✕</span>}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Available Blocks to Pick */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 tracking-wider text-center">
            TAP WORD BLOCKS TO PLACE / แตะคำเพื่อเลือกใส่ประโยค
          </div>

          <div className="flex items-center justify-center flex-wrap gap-3">
            {availableBlocks.map((b) => {
              const isUsed = placedBlockIds.includes(b.id);
              const style = roleStyles[b.role] || roleStyles.extra;

              return (
                <button
                  key={b.id}
                  onClick={() => handleAddBlock(b)}
                  disabled={isUsed || isSuccess}
                  className={`py-3 px-5 rounded-2xl border-2 font-black text-lg sm:text-xl shadow-xs transition-all cursor-pointer select-none flex flex-col items-center justify-center ${
                    isUsed
                      ? 'opacity-20 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                      : `bg-white hover:${style.bg} border-slate-300 hover:${style.border} text-slate-800 hover:scale-105 active:scale-95`
                  }`}
                >
                  <span>{b.text}</span>
                  {thaiSupport !== 'challenge' && b.thaiHint && (
                    <span className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {b.thaiHint}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Structure Guide (WHO + ACTION + THING diagram) */}
        {thaiSupport !== 'challenge' && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-around text-slate-600 font-medium">
            <span className="text-amber-800 font-bold">WHO (ใคร)</span>
            <span className="text-slate-400">+</span>
            <span className="text-emerald-800 font-bold">ACTION (ทำอะไร)</span>
            <span className="text-slate-400">+</span>
            <span className="text-sky-800 font-bold">THING (กับสิ่งไหน)</span>
          </div>
        )}

        {/* Success Banner */}
        {isSuccess && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-4 animate-pop">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              <span className="text-2xl font-black text-emerald-950">
                ✓ Perfect Sentence! ถูกต้องสมบูรณ์!
              </span>
            </div>

            <div className="text-2xl font-extrabold text-slate-900 flex items-center justify-center gap-3">
              <span>"{sentenceData.targetSentence}"</span>
              <button
                onClick={() => {
                  playClickPop();
                  speakEnglish(sentenceData.targetSentence);
                }}
                className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full transition-colors cursor-pointer"
                title="Listen Again"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {thaiSupport !== 'challenge' && (
              <div className="text-base font-bold text-emerald-800">
                แปล: {sentenceData.targetThai}
              </div>
            )}

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

        {/* Error Notification */}
        {hasError && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs font-semibold text-center animate-pop">
            ลำดับประโยคยังไม่ถูกต้อง ลองกด Reset แล้วเรียงใหม่อีกครั้งนะ!
          </div>
        )}

      </div>
    </div>
  );
};
