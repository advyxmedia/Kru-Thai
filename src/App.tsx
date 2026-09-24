/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  UserProgress, 
  ThaiSupportLevel, 
  UserMode, 
  Lesson,
  UserAccount,
  ThemeMode
} from './types';
import { 
  loadProgress, 
  saveProgress 
} from './utils/storage';
import { 
  getActiveUser, 
  setActiveUserId, 
  getUserProgress, 
  saveUserProgress 
} from './utils/auth';
import { 
  getInitialThemeMode, 
  applyThemeMode 
} from './utils/theme';
import { CURRICULUM_LEVELS } from './data/curriculum';

import { Navbar } from './components/Navbar';
import { CurriculumRoadmap } from './components/CurriculumRoadmap';
import { LessonViewer } from './components/LessonViewer';
import { PhonicsSoundboard } from './components/PhonicsSoundboard';
import { SentenceWorkshop } from './components/SentenceWorkshop';
import { VocabularyExplorer } from './components/VocabularyExplorer';
import { TPRGame } from './components/TPRGame';
import { TeacherConsole } from './components/TeacherConsole';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getActiveUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'profiles' | 'login'>('profiles');
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);

  const [progress, setProgress] = useState<UserProgress>(() => {
    const active = getActiveUser();
    return loadProgress(active ? active.id : 'user_somchai_35');
  });

  const [currentView, setCurrentView] = useState<
    'roadmap' | 'lesson' | 'phonics_sandbox' | 'sentence_workshop' | 'vocab_explorer' | 'tpr_game' | 'teacher_console'
  >('roadmap');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Apply theme whenever themeMode changes or interval ticks for day/night
  useEffect(() => {
    applyThemeMode(themeMode);

    // Periodically re-check day/night if in 'auto' mode
    const interval = setInterval(() => {
      if (themeMode === 'auto') {
        applyThemeMode('auto');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [themeMode]);

  // Sync progress changes to localStorage whenever progress changes
  useEffect(() => {
    if (progress && currentUser) {
      saveProgress(progress);
      saveUserProgress(currentUser.id, progress);
    }
  }, [progress, currentUser]);

  // Handle user login / switch
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setActiveUserId(user.id);
    const userProg = loadProgress(user.id);
    setProgress(userProg);
    setIsAuthModalOpen(false);

    if (user.role === 'teacher') {
      setCurrentView('teacher_console');
      setProgress(p => ({ ...p, userMode: 'teacher' }));
    } else {
      if (currentView === 'teacher_console') {
        setCurrentView('roadmap');
      }
      setProgress(p => ({ ...p, userMode: 'student' }));
    }
  };

  const handleSelectUser = (user: UserAccount) => {
    handleLoginSuccess(user);
  };

  const openAuthModal = (tab: 'profiles' | 'login' = 'profiles') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  // Handle lesson selection
  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle lesson completion
  const handleCompleteLesson = (lessonId: string, earnedXp: number) => {
    setProgress((prev) => {
      const nextCompleted = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];

      // Check if current level should advance
      let nextLevel = prev.currentLevel;
      const currentLevelData = CURRICULUM_LEVELS.find((l) => l.id === prev.currentLevel);
      if (currentLevelData) {
        const allDone = currentLevelData.lessons.every((l) => nextCompleted.includes(l.id));
        if (allDone && nextLevel < CURRICULUM_LEVELS.length - 1) {
          nextLevel = prev.currentLevel + 1;
        }
      }

      return {
        ...prev,
        completedLessons: nextCompleted,
        currentLevel: nextLevel,
        xp: prev.xp + earnedXp,
      };
    });
  };

  // Find next lesson to proceed seamlessly
  const handleGoToNextLesson = () => {
    if (!activeLesson) return;

    const allLessons: Lesson[] = [];
    CURRICULUM_LEVELS.forEach((lvl) => {
      allLessons.push(...lvl.lessons);
    });

    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex !== -1 && currentIndex + 1 < allLessons.length) {
      const nextLesson = allLessons[currentIndex + 1];
      setActiveLesson(nextLesson);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('roadmap');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors w-full max-w-full overflow-x-hidden">
      
      {/* Top Application Navbar with Day/Night & User badge */}
      <Navbar
        userMode={progress.userMode}
        setUserMode={(mode) => setProgress((p) => ({ ...p, userMode: mode }))}
        thaiSupport={progress.thaiSupport}
        setThaiSupport={(level) => setProgress((p) => ({ ...p, thaiSupport: level }))}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        currentUser={currentUser}
        onSelectUser={handleSelectUser}
        onOpenAuthModal={openAuthModal}
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        streakDays={progress.streakDays}
        xp={progress.xp}
      />

      {/* Main View Router - with bottom padding on mobile/tablet for bottom nav bar */}
      <main className="flex-1 pb-20 lg:pb-8 w-full max-w-full overflow-x-hidden">
        {currentView === 'roadmap' && (
          <CurriculumRoadmap
            progress={progress}
            thaiSupport={progress.thaiSupport}
            onSelectLesson={handleSelectLesson}
            currentUser={currentUser}
          />
        )}

        {currentView === 'lesson' && activeLesson && (
          <LessonViewer
            lesson={activeLesson}
            thaiSupport={progress.thaiSupport}
            onExit={() => setCurrentView('roadmap')}
            onCompleteLesson={handleCompleteLesson}
            onGoToNextLesson={handleGoToNextLesson}
          />
        )}

        {currentView === 'phonics_sandbox' && (
          <PhonicsSoundboard thaiSupport={progress.thaiSupport} />
        )}

        {currentView === 'sentence_workshop' && (
          <SentenceWorkshop thaiSupport={progress.thaiSupport} />
        )}

        {currentView === 'vocab_explorer' && (
          <VocabularyExplorer thaiSupport={progress.thaiSupport} />
        )}

        {currentView === 'tpr_game' && (
          <TPRGame 
            thaiSupport={progress.thaiSupport}
            onAwardXp={(pts) => setProgress((p) => ({ ...p, xp: p.xp + pts }))}
          />
        )}

        {currentView === 'teacher_console' && (
          <TeacherConsole
            progress={progress}
            setProgress={setProgress}
            onSelectLesson={handleSelectLesson}
            onSelectStudentProfile={handleSelectUser}
          />
        )}
      </main>

      {/* Global Authentication Modal (Required on first use, switchable anytime) */}
      {isAuthModalOpen && (
        <AuthModal
          currentUser={currentUser}
          initialTab={authModalTab}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsAuthModalOpen(false)}
          canClose={true}
        />
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-semibold text-slate-700 dark:text-slate-200">
            KruThai English · Local-First Bilingual Learning for Thai Beginners (Ages 5 - 70)
          </div>
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-400">
            <span>Offline-First (No Server Required)</span>
            <span>·</span>
            <span>All Countries Phone / Email Login</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
