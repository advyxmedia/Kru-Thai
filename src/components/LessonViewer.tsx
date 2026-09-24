import React, { useState } from 'react';
import { Lesson, ThaiSupportLevel, UserProgress } from '../types';
import { playClickPop, playSuccessChime } from '../utils/audio';
import { 
  ArrowLeft, 
  Sparkles, 
  Award, 
  RotateCcw, 
  ArrowRight 
} from 'lucide-react';

import { SoundIntroStep } from './steps/SoundIntroStep';
import { SoundDiscriminateStep } from './steps/SoundDiscriminateStep';
import { CVCBuilderStep } from './steps/CVCBuilderStep';
import { SyllableClapperStep } from './steps/SyllableClapperStep';
import { VocabIntroStep } from './steps/VocabIntroStep';
import { WordTypeSortStep } from './steps/WordTypeSortStep';
import { SentenceBuilderStep } from './steps/SentenceBuilderStep';
import { ReadingLadderStep } from './steps/ReadingLadderStep';
import { QuestionBuilderStep } from './steps/QuestionBuilderStep';
import { ParagraphBuilderStep } from './steps/ParagraphBuilderStep';
import { ComprehensionStep } from './steps/ComprehensionStep';
import { DialogueRoleplayStep } from './steps/DialogueRoleplayStep';
import { TPRActionStep } from './steps/TPRActionStep';
import { QuizMultipleChoiceStep } from './steps/QuizMultipleChoiceStep';

interface LessonViewerProps {
  lesson: Lesson;
  thaiSupport: ThaiSupportLevel;
  onExit: () => void;
  onCompleteLesson: (lessonId: string, earnedXp: number) => void;
  onGoToNextLesson?: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  thaiSupport,
  onExit,
  onCompleteLesson,
  onGoToNextLesson,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);

  const steps = lesson.steps;
  const currentStep = steps[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  const handleStepComplete = () => {
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsLessonFinished(true);
      playSuccessChime();
      onCompleteLesson(lesson.id, 25);
    }
  };

  const handleRestart = () => {
    playClickPop();
    setCurrentStepIndex(0);
    setIsLessonFinished(false);
  };

  // Render the appropriate step component
  const renderStepContent = () => {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case 'sound_intro': {
        const data = currentStep.soundData || currentStep.data;
        return (
          <SoundIntroStep
            soundData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'sound_discriminate': {
        const data = currentStep.soundOptions || currentStep.data;
        return (
          <SoundDiscriminateStep
            soundPrompt={data.soundPrompt}
            soundPromptThai={data.soundPromptThai}
            targetSound={data.targetSound}
            options={data.options}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'cvc_builder': {
        const data = currentStep.cvcData || currentStep.data;
        return (
          <CVCBuilderStep
            cvcData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'syllable_clapper': {
        const data = currentStep.syllableData || currentStep.data;
        return (
          <SyllableClapperStep
            syllableData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'vocab_intro': {
        const data = currentStep.vocabData || currentStep.data;
        return (
          <VocabIntroStep
            vocabData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'word_type_sort': {
        const data = currentStep.wordTypeData || currentStep.data;
        return (
          <WordTypeSortStep
            words={data.words}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'sentence_builder': {
        const data = currentStep.sentenceData || currentStep.data;
        return (
          <SentenceBuilderStep
            sentenceData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'reading_ladder': {
        const data = currentStep.readingLadderData || currentStep.data;
        return (
          <ReadingLadderStep
            stages={data.stages}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'question_builder': {
        const data = currentStep.questionData || currentStep.data;
        return (
          <QuestionBuilderStep
            questionData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'paragraph_builder': {
        const data = currentStep.paragraphData || currentStep.data;
        return (
          <ParagraphBuilderStep
            paragraphData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'comprehension': {
        const data = currentStep.comprehensionData || currentStep.data;
        return (
          <ComprehensionStep
            storyTitle={data.storyTitle}
            storyTitleThai={data.storyTitleThai}
            passage={data.passage}
            passageThai={data.passageThai}
            questions={data.questions}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'dialogue': {
        const data = currentStep.dialogueData || currentStep.data;
        return (
          <DialogueRoleplayStep
            topic={data.topic}
            topicThai={data.topicThai}
            lines={data.lines}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'tpr_action': {
        const data = currentStep.tprData || currentStep.data;
        return (
          <TPRActionStep
            tprData={data}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      case 'quiz_multiple_choice': {
        const data = currentStep.quizData || currentStep.data;
        // Transform options to strings if needed
        const formattedQuiz = {
          ...data,
          options: data.options.map((opt: any) => (typeof opt === 'string' ? opt : opt.text || String(opt))),
        };
        return (
          <QuizMultipleChoiceStep
            quizData={formattedQuiz}
            thaiSupport={thaiSupport}
            onComplete={handleStepComplete}
          />
        );
      }

      default:
        return (
          <div className="text-center p-8 bg-white rounded-3xl border border-slate-200">
            <p>Step ready to explore.</p>
            <button
              onClick={handleStepComplete}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl"
            >
              Continue
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-slate-950 pb-16 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Lesson Header / Progress Bar */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30 shadow-2xs transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          <button
            onClick={() => {
              playClickPop();
              onExit();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Roadmap / แผนผัง</span>
          </button>

          {/* Progress Tracker */}
          <div className="flex-1 max-w-md mx-auto space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 dark:text-slate-500">
              <span className="truncate">{lesson.title}</span>
              <span className="tabular-nums">
                Step {currentStepIndex + 1} / {steps.length} (ขั้นตอน {currentStepIndex + 1})
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900">
            +25 XP
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        {!isLessonFinished ? (
          renderStepContent()
        ) : (
          /* Lesson Completion Celebratory Screen */
          <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 shadow-md p-6 sm:p-8 text-center space-y-6 animate-pop">
            
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Lesson Complete!
              </h2>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                Great job! You mastered this lesson · ยินดีด้วย คุณเรียนจบแล้ว
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {lesson.title} · {lesson.titleThai}
              </div>
            </div>

            {/* Score & Rewards Box */}
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-400">XP EARNED</div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>+25 XP</span>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-400">ACCURACY</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  100%
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              {onGoToNextLesson && (
                <button
                  onClick={() => {
                    playClickPop();
                    onGoToNextLesson();
                  }}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Go to Next Lesson / บทเรียนถัดไป</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => {
                  playClickPop();
                  onExit();
                }}
                className="w-full py-3.5 px-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Back to Roadmap / กลับหน้าแผนผัง
              </button>

              <button
                onClick={handleRestart}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Practice this lesson again / ฝึกซ้ำ</span>
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
