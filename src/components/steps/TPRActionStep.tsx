import React, { useState } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playSuccessChime, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, ArrowRight, UserCheck } from 'lucide-react';

interface TPRActionStepProps {
  tprData: {
    command: string;
    thaiMeaning: string;
    icon: string;
    actionPromptThai: string;
  };
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const TPRActionStep: React.FC<TPRActionStepProps> = ({
  tprData,
  thaiSupport,
  onComplete,
}) => {
  const [performed, setPerformed] = useState(false);

  const handleCommandAudio = () => {
    playClickPop();
    speakEnglish(tprData.command, { rate: 0.9, pitch: 1.05 });
  };

  const handleConfirmAction = () => {
    playClickPop();
    setPerformed(true);
    playSuccessChime();
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 text-center">
        
        {/* Header Badge */}
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800">
            Total Physical Response / กิจกรรมเคลื่อนไหวร่างกาย
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Listen & Do the Action!
          </h2>
        </div>

        {/* Big Action Card */}
        <div className="bg-amber-500/10 border-3 border-amber-400 rounded-3xl p-8 sm:p-12 space-y-5 animate-pulse-subtle">
          <span className="text-8xl sm:text-9xl select-none inline-block drop-shadow-sm">
            {tprData.icon}
          </span>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-amber-950 uppercase">
              {tprData.command}
            </h1>

            {thaiSupport !== 'challenge' && (
              <div className="text-2xl font-black text-amber-800">
                {tprData.thaiMeaning}
              </div>
            )}
          </div>

          <button
            onClick={handleCommandAudio}
            className="inline-flex items-center gap-2 py-2.5 px-5 bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 rounded-2xl shadow-xs font-bold text-sm cursor-pointer transition-colors"
          >
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>Hear Command / ฟังคำสั่ง</span>
          </button>
        </div>

        {/* Action Prompt Note */}
        {thaiSupport !== 'challenge' && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700">
            🏃 <strong>คำสั่งสำหรับนักเรียน:</strong> {tprData.actionPromptThai}
          </div>
        )}

        {/* Confirmation Button */}
        <div>
          <button
            onClick={handleConfirmAction}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              performed
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {performed ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>Great Action! / ปฏิบัติเรียบร้อยแล้ว</span>
              </>
            ) : (
              <>
                <UserCheck className="w-6 h-6" />
                <span>I Did It! / ฉันทำท่านี้แล้ว!</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
