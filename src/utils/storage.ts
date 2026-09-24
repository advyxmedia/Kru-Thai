import { UserProgress, ThaiSupportLevel, UserMode } from '../types';

const STORAGE_KEY = 'kruthai_learning_progress_v2'; // Bumped key version to bypass old cached storage

export const INITIAL_PROGRESS: UserProgress = {
  userId: '',
  currentLevel: 0,
  completedLessons: [],
  lessonScores: {},
  masteredSounds: [],
  masteredWords: [],
  masteredSentences: [],
  thaiSupport: 'beginner',
  userMode: 'student',
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  clapsMastered: 0,
  xp: 0,
};

/**
 * Calculates genuine consecutive login days based on calendar dates
 */
export function calculateUserStreak(
  lastActiveDate: string | undefined, 
  currentStreak: number = 0
): { streak: number; lastDate: string } {
  const today = new Date().toISOString().split('T')[0];
  if (!lastActiveDate) {
    return { streak: 1, lastDate: today };
  }
  if (lastActiveDate === today) {
    return { streak: Math.max(1, currentStreak || 1), lastDate: today };
  }

  const lastParts = lastActiveDate.split('-').map(Number);
  const todayParts = today.split('-').map(Number);
  const lastUtc = Date.UTC(lastParts[0], lastParts[1] - 1, lastParts[2]);
  const todayUtc = Date.UTC(todayParts[0], todayParts[1] - 1, todayParts[2]);
  const diffDays = Math.round((todayUtc - lastUtc) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { streak: Math.max(1, (currentStreak || 0) + 1), lastDate: today };
  } else if (diffDays > 1) {
    return { streak: 1, lastDate: today };
  }

  return { streak: Math.max(1, currentStreak || 1), lastDate: today };
}

export function loadProgress(userId: string = ''): UserProgress {
  if (typeof window === 'undefined') return { ...INITIAL_PROGRESS, userId };
  try {
    // Only load if a specific user ID is provided or check clean v2 storage key
    const storageKey = userId ? `kruthai_user_progress_${userId}` : STORAGE_KEY;
    const raw = localStorage.getItem(storageKey);
    let loaded: Partial<UserProgress> = {};

    if (raw) {
      loaded = JSON.parse(raw);
    }

    const streakResult = calculateUserStreak(loaded.lastActiveDate, loaded.streakDays || 1);
    const completedCount = Array.isArray(loaded.completedLessons) ? loaded.completedLessons.length : 0;
    let actualXp = typeof loaded.xp === 'number' ? loaded.xp : 0;
    
    if (completedCount === 0) {
      actualXp = 0;
    } else if (actualXp < completedCount * 25) {
      actualXp = completedCount * 25;
    }

    const finalProg: UserProgress = {
      ...INITIAL_PROGRESS,
      ...loaded,
      userId,
      streakDays: streakResult.streak,
      lastActiveDate: streakResult.lastDate,
      xp: actualXp,
    };

    return finalProg;
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return { ...INITIAL_PROGRESS, userId };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined' || !progress) return;
  try {
    const key = progress.userId ? `kruthai_user_progress_${progress.userId}` : STORAGE_KEY;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function resetAllProgress(userId: string = ''): UserProgress {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(`kruthai_user_progress_${userId}`);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }
  const clean: UserProgress = {
    ...INITIAL_PROGRESS,
    userId,
    xp: 0,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
  };
  saveProgress(clean);
  return clean;
}

export function unlockAllForTeacher(userId: string = 'teacher_user'): UserProgress {
  const allLessonIds = [
    'L0-1', 'L0-2', 'L0-3',
    'L1-1', 'L1-2', 'L1-3', 'L1-4', 'L1-5', 'L1-6', 'L1-7', 'L1-8',
    'L2-1', 'L2-2', 'L2-3', 'L2-4', 'L2-5',
    'L3-1', 'L3-2', 'L3-3', 'L3-4', 'L3-5',
    'L4-1', 'L5-1', 'L6-1', 'L7-1', 'L8-1', 'L9-1', 'L10-1', 'L11-1'
  ];

  const scores: Record<string, number> = {};
  allLessonIds.forEach(id => { scores[id] = 100; });

  const teacherProgress: UserProgress = {
    userId,
    currentLevel: 11,
    completedLessons: allLessonIds,
    lessonScores: scores,
    masteredSounds: ['S', 'A', 'T', 'P', 'I', 'N', 'C', 'M', 'D'],
    masteredWords: ['apple', 'dog', 'cat', 'rice', 'water', 'sun', 'banana', 'book', 'run', 'eat'],
    masteredSentences: ['I eat rice.', 'The dog runs.', 'She likes apples.'],
    thaiSupport: 'beginner',
    userMode: 'teacher',
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    clapsMastered: 12,
    xp: allLessonIds.length * 25,
  };

  saveProgress(teacherProgress);
  return teacherProgress;
}