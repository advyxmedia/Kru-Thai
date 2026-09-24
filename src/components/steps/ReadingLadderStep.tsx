import React, { useState } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playClickPop } from '../../utils/audio';
import { Volume2, CheckCircle2, ArrowRight } from 'lucide-react';

interface ReadingLadderStage {
  text: string;
  thai: string;
}

interface ReadingLadderStepProps {
  stages: ReadingLadderStage[];
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const ReadingLadderStep: React.FC<ReadingLadderStepProps> = ({
  stages,
  thaiSupport,
  onComplete,
}) => {
  const [activeStage, setActiveStage] = useState(0);

  const handleListenLine = (index: number) => {
    playClickPop();
    setActiveStage(index);
    speakEnglish(stages[index].text, { rate: 0.82 });
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-bold text-teal-800">
            Reading Development Ladder / บันไดพัฒนาการอ่าน
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Read Step by Step
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm text-slate-500 font-medium">
              คลิกที่แต่ละบรรทัดเพื่อฟังเสียงและฝึกอ่านออกเสียงตาม
            </p>
          )}
        </div>

        {/* The Reading Ladder */}
        <div className="space-y-3 py-2">
          {stages.map((stage, idx) => {
            const isCurrent = activeStage === idx;

            return (
              <div
                key={idx}
                onClick={() => handleListenLine(idx)}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer ${
                  isCurrent
                    ? 'border-teal-500 bg-teal-50/70 shadow-xs ring-2 ring-teal-200'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-2xs">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      {stage.text}
                    </div>
                    {thaiSupport !== 'challenge' && (
                      <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                        {stage.thai}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="p-2.5 rounded-xl bg-white text-teal-700 border border-slate-200 shadow-2xs hover:bg-teal-100 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Read All Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              playClickPop();
              const fullPassage = stages.map((s) => s.text).join(' ');
              speakEnglish(fullPassage, { rate: 0.85 });
            }}
            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Volume2 className="w-5 h-5 text-indigo-600" />
            <span>Read All Together / อ่านทั้งบท</span>
          </button>

          <button
            onClick={() => {
              playClickPop();
              onComplete();
            }}
            className="flex-1 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>✓ I Can Read This! / อ่านได้แล้ว</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
