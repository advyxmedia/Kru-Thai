import React, { useState } from 'react';
import { ThaiSupportLevel } from '../../types';
import { speakEnglish, playClickPop, playSuccessChime } from '../../utils/audio';
import { Volume2, Mic, ArrowRight, UserCheck } from 'lucide-react';

interface DialogueLine {
  speaker: 'A' | 'B';
  text: string;
  thai: string;
  role?: string;
}

interface DialogueRoleplayStepProps {
  topic: string;
  topicThai: string;
  lines: DialogueLine[];
  thaiSupport: ThaiSupportLevel;
  onComplete: () => void;
}

export const DialogueRoleplayStep: React.FC<DialogueRoleplayStepProps> = ({
  topic,
  topicThai,
  lines,
  thaiSupport,
  onComplete,
}) => {
  const [selectedRole, setSelectedRole] = useState<'A' | 'B' | 'all'>('all');
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);

  const handleSpeakLine = (index: number) => {
    playClickPop();
    setActiveLineIdx(index);
    speakEnglish(lines[index].text, { rate: 0.85 });
  };

  const handlePlayFullDialogue = () => {
    playClickPop();
    let idx = 0;
    const playNext = () => {
      if (idx < lines.length) {
        setActiveLineIdx(idx);
        speakEnglish(lines[idx].text, {
          rate: 0.85,
          onEnd: () => {
            idx++;
            setTimeout(playNext, 400);
          },
        });
      } else {
        setActiveLineIdx(null);
        playSuccessChime();
      }
    };
    playNext();
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-xs font-bold text-sky-800">
            Interactive Conversation / บทสนทนาจริง
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {topic}
          </h2>
          {thaiSupport !== 'challenge' && (
            <p className="text-sm text-slate-500 font-medium">
              {topicThai}
            </p>
          )}
        </div>

        {/* Role Selector Controls */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-sm mx-auto">
          <button
            onClick={() => setSelectedRole('all')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Roles
          </button>
          <button
            onClick={() => setSelectedRole('A')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'A'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I am Person A
          </button>
          <button
            onClick={() => setSelectedRole('B')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedRole === 'B'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I am Person B
          </button>
        </div>

        {/* Dialogue Script */}
        <div className="space-y-3 py-2">
          {lines.map((line, idx) => {
            const isSpeakerA = line.speaker === 'A';
            const isMyTurn = (selectedRole === 'A' && isSpeakerA) || (selectedRole === 'B' && !isSpeakerA);
            const isPlaying = activeLineIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => handleSpeakLine(idx)}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  isPlaying
                    ? 'border-indigo-500 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-200'
                    : isMyTurn
                    ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    isSpeakerA
                      ? 'bg-indigo-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {line.speaker}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      Person {line.speaker} {line.role ? `(${line.role})` : ''}
                    </span>
                    {isMyTurn && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md">
                        YOUR TURN TO SPEAK
                      </span>
                    )}
                  </div>

                  <div className="text-lg sm:text-xl font-bold text-slate-900">
                    "{line.text}"
                  </div>

                  {thaiSupport !== 'challenge' && (
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">
                      {line.thai}
                    </div>
                  )}
                </div>

                <button
                  className="p-2 text-indigo-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handlePlayFullDialogue}
            className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Volume2 className="w-5 h-5 text-indigo-600" />
            <span>Play Full Conversation</span>
          </button>

          <button
            onClick={() => {
              playClickPop();
              onComplete();
            }}
            className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>✓ Complete Roleplay / จบบทสนทนา</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
