import React, { useState } from 'react';
import { SoundItem, ThaiSupportLevel } from '../../types';
import { speakEnglish, speakPhoneme, playClickPop, playSuccessChime } from '../../utils/audio';
import { Volume2, Mic, CheckCircle2, Snail, Sparkles } from 'lucide-react';

interface SoundIntroStepProps {
  soundData: SoundItem;
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const SoundIntroStep: React.FC<SoundIntroStepProps> = ({
  soundData,
  thaiSupport,
  onComplete,
}) => {
  const [hasListened, setHasListened] = useState(false);
  const [hasPracticed, setHasPracticed] = useState(false);
  const [isSpeakingPrompt, setIsSpeakingPrompt] = useState(false);

  const handleListen = (slow = false) => {
    playClickPop();
    setHasListened(true);
    // Speak phonetic sound then sample word
    speakPhoneme(soundData.ipa, soundData.letter, () => {
      setTimeout(() => {
        speakEnglish(soundData.sampleWord, { rate: slow ? 0.65 : 0.85 });
      }, 350);
    });
  };

  const handleSpeakPractice = () => {
    playClickPop();
    setIsSpeakingPrompt(true);
    // Simulate speech coaching prompt
    setTimeout(() => {
      setIsSpeakingPrompt(false);
      setHasPracticed(true);
      playSuccessChime();
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Sound Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center space-y-6">
        
        {/* Letter & Phoneme Display */}
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 shadow-xs">
            <span className="text-6xl font-black">{soundData.letter}</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-lg font-bold text-slate-700">
            <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 text-indigo-900 font-mono text-xl">
              {soundData.ipa}
            </span>
            <span>Letter Name: <strong className="text-indigo-600">{soundData.name}</strong></span>
          </div>
        </div>

        {/* Thai Explanation based on support level */}
        {thaiSupport !== 'challenge' && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-left space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <span>🔊 เสียงภาษาไทยเทียบเคียง:</span>
              <span className="text-base text-amber-700 font-extrabold">{soundData.thaiSoundHint}</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
              {soundData.thaiExplanation}
            </p>
            {soundData.mouthTipThai && thaiSupport === 'beginner' && (
              <div className="pt-2 border-t border-amber-200/60 text-xs text-amber-900 font-medium">
                👄 <strong>วิธีจัดรูปปาก:</strong> {soundData.mouthTipThai}
              </div>
            )}
          </div>
        )}

        {/* Sample Word Connection */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{soundData.sampleIcon}</span>
            <div className="text-left">
              <div className="text-xl font-extrabold text-slate-900 tracking-wide">
                {soundData.sampleWord}
              </div>
              {thaiSupport !== 'challenge' && (
                <div className="text-xs text-slate-500 font-medium">
                  {soundData.sampleWordThai}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              playClickPop();
              speakEnglish(soundData.sampleWord);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-indigo-600" />
            <span>Hear Word</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleListen(false)}
            className="flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>Listen to Sound</span>
          </button>

          <button
            onClick={() => handleListen(true)}
            className="flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer"
          >
            <Snail className="w-5 h-5 text-amber-600" />
            <span>Slow Sound</span>
          </button>
        </div>

        {/* Say It Out Loud Practice */}
        <div className="pt-2">
          <button
            onClick={handleSpeakPractice}
            disabled={isSpeakingPrompt}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-bold transition-all cursor-pointer ${
              hasPracticed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
            }`}
          >
            {hasPracticed ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Great practice! / ออกเสียงยอดเยี่ยม!</span>
              </>
            ) : isSpeakingPrompt ? (
              <>
                <Sparkles className="w-5 h-5 text-indigo-600 animate-spin" />
                <span>Listening to your voice... (พูดเลย!)</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 text-indigo-600" />
                <span>Practice Saying: "{soundData.sampleWord}" (กดเพื่อฝึกพูด)</span>
              </>
            )}
          </button>
        </div>

        {/* Continue Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              playClickPop();
              onComplete();
            }}
            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>✓ I Understand! Continue / เข้าใจแล้ว ไปต่อ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
