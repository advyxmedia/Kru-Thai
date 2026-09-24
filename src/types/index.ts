export type UserMode = 'student' | 'teacher';

export type ThaiSupportLevel = 'beginner' | 'learning' | 'practice' | 'challenge';

export type ThemeMode = 'auto' | 'light' | 'dark';

export type AgeGroup = 'child' | 'teen' | 'young_adult' | 'adult' | 'senior';

export interface UserAccount {
  id: string;
  authType: 'email' | 'phone';
  identifier: string; // e.g. "somchai@gmail.com" or "+66 81 234 5678"
  countryCode?: string;
  fullName: string;
  ageGroup: AgeGroup;
  role: 'student' | 'teacher';
  createdAt: string;
  avatarIcon?: string;
  teacherNotes?: string;
}

export type WordCategory = 
  | 'People'
  | 'Body'
  | 'Food'
  | 'Animals'
  | 'Objects'
  | 'Places'
  | 'School'
  | 'Home'
  | 'Colors'
  | 'Numbers'
  | 'Actions'
  | 'Work'
  | 'Travel'
  | 'Health'
  | 'Shopping'
  | 'Family'
  | 'Phrases';

export type WordType = 'noun' | 'verb' | 'adjective' | 'pronoun' | 'preposition' | 'article' | 'phrase';

export interface VocabularyItem {
  id: string;
  word: string;
  thai: string;
  thaiPhoneticReading?: string; // คำอ่านออกเสียงไทย เช่น "คอฟ-ฟี่", "ซา-ลา-รี่" สำหรับผู้เริ่มต้นทุกวัย
  phonetic?: string;
  category: WordCategory;
  type: WordType;
  icon: string;
  exampleSentence: string;
  exampleThai: string;
  syllables?: number;
  isAdultRelevant?: boolean; // Useful for adults 20, 30-40, or senior learners
}

export interface SoundItem {
  letter: string;
  name: string;
  ipa: string;
  thaiSoundHint: string;
  thaiExplanation: string;
  sampleWord: string;
  sampleWordThai: string;
  sampleIcon: string;
  mouthTipThai?: string;
}

export interface CVCWord {
  word: string;
  letters: string[];
  sounds: string[]; // e.g. ["/k/", "/æ/", "/t/"]
  thai: string;
  icon: string;
}

export interface QuizOptionItem {
  text: string;
  thai?: string;
  icon?: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  question: string;
  questionThai?: string;
  audioPrompt?: string;
  options: (string | QuizOptionItem)[];
  correctIndex?: number;
  explanationThai: string;
}

export type LessonStepType =
  | 'sound_intro'
  | 'sound_discriminate'
  | 'cvc_builder'
  | 'syllable_clapper'
  | 'vocab_intro'
  | 'word_type_sort'
  | 'sentence_builder'
  | 'question_builder'
  | 'reading_ladder'
  | 'tpr_action'
  | 'paragraph_builder'
  | 'comprehension'
  | 'dialogue'
  | 'quiz_multiple_choice';

export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  titleThai?: string;
  instruction: string;
  instructionThai: string;
  
  // Generic step data container
  data?: any;

  // Specific data depending on step type
  soundData?: SoundItem;
  soundOptions?: {
    targetSound: string;
    soundPrompt: string;
    soundPromptThai: string;
    options: {
      word: string;
      thai: string;
      icon: string;
      isCorrect: boolean;
      soundExplanationThai: string;
    }[];
  };
  cvcData?: CVCWord;
  syllableData?: {
    word: string;
    thai: string;
    icon: string;
    count: number;
    syllableBreak: string;
  };
  vocabData?: VocabularyItem;
  wordTypeData?: {
    words: {
      word: string;
      thai: string;
      icon: string;
      type: WordType;
    }[];
  };
  sentenceData?: {
    targetSentence: string;
    targetThai: string;
    blocks: {
      id: string;
      text: string;
      role: 'who' | 'action' | 'thing' | 'extra';
      thaiHint?: string;
    }[];
    correctOrder: string[];
  };
  questionData?: {
    targetQuestion: string;
    targetThai: string;
    answer: string;
    answerThai: string;
    blocks: string[];
    correctOrder: string[];
  };
  readingLadderData?: {
    stages: {
      text: string;
      thai: string;
    }[];
  };
  tprData?: {
    command: string;
    thaiMeaning: string;
    icon: string;
    actionPromptThai: string;
  };
  paragraphData?: {
    topic: string;
    topicThai: string;
    sentences: {
      id: string;
      text: string;
      thai: string;
    }[];
    correctOrder: string[];
    explanationThai: string;
  };
  comprehensionData?: {
    storyTitle: string;
    storyTitleThai: string;
    passage: string;
    passageThai: string;
    questions: {
      question: string;
      questionThai: string;
      options: string[];
      correctIndex: number;
      explanationThai: string;
    }[];
  };
  dialogueData?: {
    topic: string;
    topicThai: string;
    lines: {
      speaker: 'A' | 'B';
      text: string;
      thai: string;
      role?: string;
    }[];
  };
  quizData?: {
    question: string;
    questionThai?: string;
    audioPrompt?: string;
    options: (string | QuizOptionItem)[];
    correctIndex?: number;
    explanationThai: string;
  };
}

export interface Lesson {
  id: string;
  levelId: number;
  lessonNumber: number;
  title: string;
  titleThai: string;
  description: string;
  descriptionThai?: string;
  summary?: string;
  thaiTitle?: string;
  icon: string;
  durationMinutes: number;
  objectives: string[];
  objectivesThai: string[];
  steps: LessonStep[];
}

export interface LevelInfo {
  id: number;
  title: string;
  titleThai: string;
  thaiTitle?: string;
  stage?: string;
  tagline: string;
  taglineThai: string;
  description?: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  requiredScoreToUnlock?: number;
}

export interface UserProgress {
  userId: string;
  currentLevel: number;
  completedLessons: string[];
  lessonScores: Record<string, number>; // lessonId -> percentage score (0-100)
  masteredSounds: string[];
  masteredWords: string[];
  masteredSentences: string[];
  thaiSupport: ThaiSupportLevel;
  userMode: UserMode;
  streakDays: number;
  lastActiveDate: string;
  clapsMastered: number;
  xp: number;
}
