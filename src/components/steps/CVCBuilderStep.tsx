import React, { useState, useEffect } from 'react';
import { CVCWord, ThaiSupportLevel } from '../../types';
import { speakEnglish, speakPhoneme, playSuccessChime, playTryAgainSound, playClickPop } from '../../utils/audio';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

interface CVCBuilderStepProps {
  cvcData: CVCWord;
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const CVCBuilderStep: React.FC<CVCBuilderStepProps> = ({
  cvcData,
  thaiSupport,
  onComplete,
}) => {
  // Slots where letters will be placed
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>(
    new Array(cvcData.letters.length).fill(null)
  );

  // Available letter tiles to pick from (shuffled or ordered)
  const [availableTiles, setAvailableTiles] = useState<
    { id: string; letter: string; isUsed: boolean }[]
  >([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isBlending, setIsBlending] = useState(false);
  const [blendingStep, setBlendingStep] = useState<number | null>(null);

  // Initialize tiles on mount or when cvcData changes
  useEffect(() => {
    // Shuffle tiles slightly so user interacts meaningfully
    const tiles = cvcData.letters.map((letter, i) => ({
      id: `${letter}-${i}`,
      letter,
      isUsed: false,
    }));
    // Shuffled for 3+ letters
    if (tiles.length > 2) {
      tiles.sort(() => Math.random() - 0.5);
    }
    setAvailableTiles(tiles);
    setPlacedLetters(new Array(cvcData.letters.length).fill(null));
    setIsSuccess(false);
    setIsBlending(false);
    setBlendingStep(null);
  }, [cvcData]);

  // Handle clicking a tile to place in next empty slot
  const handleSelectTile = (tileId: string) => {
    playClickPop();
    const tileIndex = availableTiles.findIndex((t) => t.id === tileId);
    if (tileIndex === -1 || availableTiles[tileIndex].isUsed) return;

    const tile = availableTiles[tileIndex];

    // Find first empty slot
    const firstEmptyIndex = placedLetters.findIndex((l) => l === null);
    if (firstEmptyIndex === -1) return;

    // Speak letter phoneme on placement
    const targetSound = cvcData.sounds[firstEmptyIndex] || tile.letter;
    speakPhoneme(targetSound, tile.letter);

    // Place letter
    const nextPlaced = [...placedLetters];
    nextPlaced[firstEmptyIndex] = tile.letter;
    setPlacedLetters(nextPlaced);

    // Mark tile used
    const nextTiles = [...availableTiles];
    nextTiles[tileIndex].isUsed = true;
    setAvailableTiles(nextTiles);

    // Check if word is complete
    if (nextPlaced.every((l) => l !== null)) {
      checkWord(nextPlaced as string[]);
    }
  };

  // Remove letter from slot
  const handleRemoveLetter = (slotIndex: number) => {
    playClickPop();
    const letter = placedLetters[slotIndex];
    if (!letter) return;

    // Find tile that matches and un-use it
    const tileIndex = availableTiles.findIndex((t) => t.letter === letter && t.isUsed);
    if (tileIndex !== -1) {
      const nextTiles = [...availableTiles];
      nextTiles[tileIndex].isUsed = false;
      setAvailableTiles(nextTiles);
    }

    const nextPlaced = [...placedLetters];
    nextPlaced[slotIndex] = null;
    setPlacedLetters(nextPlaced);
    setIsSuccess(false);
  };

  const handleReset = () => {
    playClickPop();
    setPlacedLetters(new Array(cvcData.letters.length).fill(null));
    setAvailableTiles(availableTiles.map((t) => ({ ...t, isUsed: false })));
    setIsSuccess(false);
    setIsBlending(false);
    setBlendingStep(null);
  };

  const checkWord = (letters: string[]) => {
    const spelled = letters.join('').toUpperCase();
    const target = cvcData.letters.join('').toUpperCase();

    if (spelled === target) {
      // Trigger phonics blending sequence: /s1/ -> /s2/ -> /s3/ -> Word!
      runPhonicsBlending();
    } else {
      playTryAgainSound();
    }
  };

  const runPhonicsBlending = () => {
    setIsBlending(true);

    // Blend sounds sequentially
    let step = 0;
    const playNext = () => {
      if (step < cvcData.sounds.length) {
        setBlendingStep(step);
        const sound = cvcData.sounds[step];
        const letter = cvcData.letters[step];
        speakPhoneme(sound, letter, () => {
          step++;
          setTimeout(playNext, 250);
        });
      } else {
        // Complete word pronunciation!
        setBlendingStep(null);
        setTimeout(() => {
          speakEnglish(cvcData.word, {
            onEnd: () => {
              setIsBlending(false);
              setIsSuccess(true);
              playSuccessChime();
            },
          });
        }, 300);
      }
    };

    playNext();
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-center">
        
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800">
            Phonics Word Builder / ผสมเสียงคำศัพท์
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Build: {cvcData.word.toUpperCase()}
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm text-slate-500 font-medium">
              แตะตัวอักษรเพื่อผสมเสียงคำว่า <strong className="text-indigo-600">"{cvcData.word}"</strong> ({cvcData.thai})
            </p>
          )}
        </div>

        {/* Target Slots Display */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 py-4">
          {placedLetters.map((letter, idx) => {
            const isHighlighted = blendingStep === idx;
            return (
              <div
                key={idx}
                onClick={() => handleRemoveLetter(idx)}
                className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-3 flex flex-col items-center justify-center transition-all cursor-pointer select-none relative ${
                  letter
                    ? isHighlighted
                      ? 'border-indigo-600 bg-indigo-100 text-indigo-900 scale-110 shadow-md ring-4 ring-indigo-300'
                      : isSuccess
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-indigo-400 bg-indigo-50 text-indigo-900 shadow-xs'
                    : 'border-dashed border-slate-300 bg-slate-50 text-slate-400 hover:border-slate-400'
                }`}
              >
                <span className="text-4xl sm:text-5xl font-black">
                  {letter || ''}
                </span>

                {/* Phoneme subtitle underneath slot */}
                <span className="text-xs font-mono font-bold mt-1 text-slate-500">
                  {cvcData.sounds[idx] || ''}
                </span>

                {letter && !isSuccess && (
                  <span className="text-[10px] text-slate-400 absolute top-1 right-2">
                    ✕
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Available Tiles */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 tracking-wider">
            AVAILABLE LETTER TILES / เลือกตัวอักษร
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {availableTiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleSelectTile(tile.id)}
                disabled={tile.isUsed || isBlending || isSuccess}
                className={`w-16 h-18 sm:w-20 sm:h-22 rounded-2xl font-black text-3xl sm:text-4xl shadow-xs transition-all flex items-center justify-center cursor-pointer select-none ${
                  tile.isUsed
                    ? 'opacity-25 bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-500 text-indigo-800 hover:scale-105 active:scale-95'
                }`}
              >
                {tile.letter}
              </button>
            ))}

            <button
              onClick={handleReset}
              disabled={isBlending}
              title="Reset slots"
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Card */}
        {isSuccess && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-3 animate-pop">
            <div className="text-6xl animate-bounce">{cvcData.icon}</div>
            
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-emerald-950">
                {cvcData.word.toUpperCase()}
              </span>
              <button
                onClick={() => {
                  playClickPop();
                  speakEnglish(cvcData.word);
                }}
                className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full transition-colors cursor-pointer"
                title="Hear Word Again"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {thaiSupport !== 'challenge' && (
              <div className="text-base font-bold text-emerald-800">
                ความหมาย: {cvcData.thai}
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>
                {cvcData.sounds.join(' + ')} = {cvcData.word.toUpperCase()}!
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  playClickPop();
                  onComplete();
                }}
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Awesome! Continue / ยอดเยี่ยม ไปต่อ</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
