import React from 'react';
import { CURRICULUM_LEVELS } from '../data/curriculum';
import { UserProgress, ThaiSupportLevel, Lesson, UserAccount } from '../types';
import { playClickPop } from '../utils/audio';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Flame,
  UserCheck
} from 'lucide-react';

interface CurriculumRoadmapProps {
  progress: UserProgress;
  thaiSupport: ThaiSupportLevel;
  onSelectLesson: (lesson: Lesson) => void;
  currentUser?: UserAccount | null;
}

export const CurriculumRoadmap: React.FC<CurriculumRoadmapProps> = ({
  progress,
  thaiSupport,
  onSelectLesson,
  currentUser,
}) => {
  const getAgeLabel = (ageGroup?: string) => {
    switch (ageGroup) {
      case 'child': return 'Child Learner (5-12 yrs) · วัยเด็กเล็ก';
      case 'teen': return 'Teen Learner (13-19 yrs) · วัยรุ่น';
      case 'young_adult': return 'Young Adult (20-29 yrs) · วัยมหาวิทยาลัย/เริ่มทำงาน';
      case 'adult': return 'Working Adult (30-49 yrs) · วัยทำงาน';
      case 'senior': return 'Senior Learner (50-70+ yrs) · ผู้สูงวัย';
      default: return 'All Ages (5-70 yrs)';
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs rounded-full text-xs font-semibold text-indigo-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Structured Path for Thai Beginners · ทุกวัยตั้งแต่ 5 ถึง 70 ปี</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            English Learning Journey
          </h1>

          {thaiSupport !== 'challenge' && (
            <p className="text-xs sm:text-base text-indigo-100 font-medium max-w-xl">
              เริ่มต้นตั้งแต่เสียงตัวอักษร → ผสมคำโฟนิกส์ → สร้างประโยค → สู่การสนทนาจริง ไม่ข้ามขั้น ไม่ต้องท่องจำแบบเดิม
            </p>
          )}

          {/* Quick Stats Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-xl border border-white/10">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{progress.streakDays} Day(s) Streak / วันต่อเนื่อง</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-xl border border-white/10">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{progress.xp} XP (Earned Points)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{progress.completedLessons.length} Lessons / บทเรียนจบ</span>
            </div>
          </div>

          {/* Automatic Age Detection Badge (Students only, hidden in teacher mode) */}
          {currentUser && currentUser.role !== 'teacher' && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 backdrop-blur-xs rounded-xl text-xs font-bold text-emerald-100 border border-emerald-400/30">
              <UserCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>
                Auto-Detected Student Age: <strong>{getAgeLabel(currentUser.ageGroup)}</strong> · บทเรียนปรับตามวัยอัตโนมัติ
              </span>
            </div>
          )}
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Systematic Path Stages Indicator */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs">
        <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-2">
          THE 12-STAGE NATURAL PROGRESSION / ลำดับพัฒนาการ 12 ขั้น
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
          {[
            '0. Sound (เสียง)',
            '1. Letters (ตัวอักษร)',
            '2. Phonics (โฟนิกส์)',
            '3. Syllables (พยางค์)',
            '4. Words (คำศัพท์)',
            '5. Word Types (ชนิดคำ)',
            '6. Sentences (ประโยค)',
            '7. Grammar (ไวยากรณ์)',
            '8. Questions (คำถาม)',
            '9. Paragraphs (ย่อหน้า)',
            '10. Reading (การอ่าน)',
            '11. Conversation (สนทนา)'
          ].map((st, i) => (
            <React.Fragment key={st}>
              {i > 0 && <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">→</span>}
              <span className={`px-2 py-0.5 rounded ${
                i <= progress.currentLevel 
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold' 
                  : 'text-slate-400 dark:text-slate-600'
              }`}>
                {st}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Roadmap Levels List */}
      <div className="space-y-6">
        {CURRICULUM_LEVELS.map((level) => {
          const isCurrent = level.id === progress.currentLevel;
          const isPassed = level.id < progress.currentLevel;
          const isLocked = level.id > progress.currentLevel;

          const completedInThisLevel = level.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;

          return (
            <div
              key={level.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl border-2 transition-all overflow-hidden ${
                isCurrent
                  ? 'border-indigo-600 dark:border-indigo-500 shadow-md ring-4 ring-indigo-50 dark:ring-indigo-950/40'
                  : isPassed
                  ? 'border-slate-200 dark:border-slate-800 shadow-2xs'
                  : 'border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              {/* Level Header */}
              <div
                className={`p-5 sm:p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/50'
                    : 'bg-slate-50/60 dark:bg-slate-850/60 border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-md ${
                        isCurrent
                          ? 'bg-indigo-600 text-white'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      LEVEL {level.id}
                    </span>

                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {level.stage || level.title}
                    </span>

                    {isPassed && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Passed / ผ่านแล้ว</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {level.title}
                  </h3>

                  {thaiSupport !== 'challenge' && (
                    <div className="text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                      {level.titleThai || level.thaiTitle}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                    {level.tagline || level.description}
                  </p>
                </div>

                {/* Level status indicator */}
                <div className="text-left sm:text-right shrink-0 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {completedInThisLevel} / {level.lessons.length} Lessons / บทเรียน
                  </div>
                  <div className="w-24 sm:w-28 h-2 bg-slate-200 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                      style={{
                        width: `${Math.round(
                          (completedInThisLevel / level.lessons.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Lessons within this level */}
              <div className="p-4 sm:p-6 divide-y divide-slate-100 dark:divide-slate-800">
                {level.lessons.map((lesson, idx) => {
                  const isLessonDone = progress.completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className="py-3 sm:py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isLessonDone
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : isCurrent
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {isLessonDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                            {lesson.title}
                          </div>
                          {thaiSupport !== 'challenge' && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                              {lesson.titleThai || lesson.thaiTitle}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Start / Review Button */}
                      <button
                        onClick={() => {
                          playClickPop();
                          onSelectLesson(lesson);
                        }}
                        className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0 ${
                          isLessonDone
                            ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                            : isCurrent
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isLessonDone ? 'Review / ทบทวน' : 'Start / เริ่มเรียน'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
