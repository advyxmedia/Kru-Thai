import React, { useState } from 'react';
import { ThaiSupportLevel } from '../types';
import { speakEnglish, playSuccessChime, playClickPop } from '../utils/audio';
import { Volume2, Play, CheckCircle2, RotateCcw, Flame, Sparkles } from 'lucide-react';

interface ActionCommand {
  id: string;
  command: string;
  thai: string;
  icon: string;
}

const COMMANDS: ActionCommand[] = [
  { id: 'c1', command: 'Stand up!', thai: 'ยืนขึ้น!', icon: '🧍' },
  { id: 'c2', command: 'Sit down!', thai: 'นั่งลง!', icon: '🪑' },
  { id: 'c3', command: 'Clap your hands!', thai: 'ปรบมือ!', icon: '👏' },
  { id: 'c4', command: 'Touch your nose!', thai: 'จับจมูกของคุณ!', icon: '👃' },
  { id: 'c5', command: 'Touch your head!', thai: 'จับหัวของคุณ!', icon: '🙆' },
  { id: 'c6', command: 'Jump two times!', thai: 'กระโดดสองครั้ง!', icon: '🦘' },
  { id: 'c7', command: 'Raise your hand!', thai: 'ยกมือขึ้น!', icon: '🙋' },
  { id: 'c8', command: 'Turn around!', thai: 'หมุนตัวหนึ่งรอบ!', icon: '🔄' },
  { id: 'c9', command: 'Open your book!', thai: 'เปิดหนังสือ!', icon: '📖' },
  { id: 'c10', command: 'Smile!', thai: 'ยิ้มกว้างๆ!', icon: '😄' },
];

export const TPRGame: React.FC<{ 
  thaiSupport: ThaiSupportLevel;
  onAwardXp?: (xp: number) => void;
}> = ({ thaiSupport, onAwardXp }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentCommand = COMMANDS[currentIdx];

  const handleStart = () => {
    playClickPop();
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setCurrentIdx(0);
    announceCommand(COMMANDS[0]);
  };

  const announceCommand = (cmd: ActionCommand) => {
    speakEnglish(cmd.command, { rate: 0.9, pitch: 1.05 });
  };

  const handleDoneAction = () => {
    playClickPop();
    playSuccessChime();
    setScore((s) => s + 10);
    setStreak((st) => st + 1);
    if (onAwardXp) {
      onAwardXp(10); // Award real 10 XP per completed physical action exercise
    }

    const nextIdx = (currentIdx + 1) % COMMANDS.length;
    setCurrentIdx(nextIdx);
    announceCommand(COMMANDS[nextIdx]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-bold text-amber-800 dark:text-amber-300">
          TPR Action Game · เรียนรู้ผ่านการเคลื่อนไหวร่างกาย
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Teacher Says: Action Game!
        </h1>
        {thaiSupport !== 'challenge' && (
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
            Listen to the English spoken command and physically perform it! ฝึกฟังและทำท่าทางตามคำสั่ง
          </p>
        )}
      </div>

      {!isPlaying ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200 dark:border-amber-800 shadow-sm p-6 sm:p-12 text-center space-y-6">
          <div className="text-7xl sm:text-8xl">🏃‍♂️</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Ready to Move & Learn?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            การเรียนรู้ภาษาอังกฤษผ่านการเคลื่อนไหวร่างกาย (Total Physical Response) ช่วยให้สมองจำคำศัพท์และคำสั่งได้เร็วกว่าการท่องจำถึง 3 เท่า
          </p>
          <button
            onClick={handleStart}
            className="py-4 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            <span>Start Action Game / เริ่มเล่น</span>
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-300 dark:border-amber-700 shadow-sm p-5 sm:p-10 text-center space-y-6">
          
          {/* Stats bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-black text-sm sm:text-base">
              <Flame className="w-5 h-5 fill-current" />
              <span>Combo: {streak}x</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-black text-sm sm:text-base">
              <Sparkles className="w-5 h-5 fill-current" />
              <span>Score: {score}</span>
            </div>
          </div>

          {/* Action Card */}
          <div className="py-6 space-y-4">
            <div className="text-7xl sm:text-9xl animate-bounce-slow">
              {currentCommand.icon}
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {currentCommand.command}
              </div>

              {thaiSupport !== 'challenge' && (
                <div className="text-base sm:text-xl font-bold text-amber-700 dark:text-amber-400 pt-1">
                  ({currentCommand.thai})
                </div>
              )}
            </div>

            <button
              onClick={() => announceCommand(currentCommand)}
              className="py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Again / ฟังเสียงซ้ำ</span>
            </button>
          </div>

          {/* Player Response Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleDoneAction}
              className="w-full sm:w-auto py-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span>I Did It! / ทำท่าทางแล้ว!</span>
            </button>

            <button
              onClick={() => setIsPlaying(false)}
              className="py-3 px-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>End Game / ออก</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
