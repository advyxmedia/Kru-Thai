import React, { useState } from 'react';
import { CURRICULUM_LEVELS } from '../data/curriculum';
import { UserProgress, Lesson, UserAccount, AgeGroup } from '../types';
import { speakEnglish, playClickPop, playSuccessChime } from '../utils/audio';
import { unlockAllForTeacher, resetAllProgress } from '../utils/storage';
import { getStoredAccounts, getUserProgress, updateTeacherNotesForStudent } from '../utils/auth';
import { 
  GraduationCap, 
  Presentation, 
  AlertTriangle, 
  BookOpen, 
  Unlock, 
  RotateCcw, 
  Volume2, 
  FileText,
  Users,
  Search,
  CheckCircle2,
  Award,
  Sparkles,
  ExternalLink,
  Flame,
  Printer,
  Edit3,
  Save,
  LogIn
} from 'lucide-react';

interface TeacherConsoleProps {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onSelectStudentProfile?: (student: UserAccount) => void;
}

export const TeacherConsole: React.FC<TeacherConsoleProps> = ({
  progress,
  setProgress,
  onSelectLesson,
  onSelectStudentProfile,
}) => {
  const [selectedLevelId, setSelectedLevelId] = useState(0);
  const [activeTab, setActiveTab] = useState<'students' | 'lessons' | 'thai_errors' | 'lesson_plan' | 'worksheet'>('students');
  const [searchStudent, setSearchStudent] = useState('');
  const [filterAge, setFilterAge] = useState<string>('all');
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<UserAccount | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const accounts = getStoredAccounts();
  const currentLevel = CURRICULUM_LEVELS.find((l) => l.id === selectedLevelId) || CURRICULUM_LEVELS[0];

  const handleUnlockAll = () => {
    playClickPop();
    const updated = unlockAllForTeacher(progress.userId);
    setProgress(updated);
    playSuccessChime();
  };

  const handleResetData = () => {
    playClickPop();
    if (window.confirm('ต้องการรีเซ็ตความคืบหน้านักเรียนทั้งหมดกลับสู่เริ่มต้นใช่หรือไม่?')) {
      const reset = resetAllProgress(progress.userId);
      setProgress(reset);
    }
  };

  const handleSaveNotes = (studentId: string) => {
    playClickPop();
    updateTeacherNotesForStudent(studentId, noteDraft);
    setEditingNotesId(null);
    playSuccessChime();
  };

  // Filter students
  const filteredStudents = accounts.filter((acc) => {
    const matchesSearch =
      acc.fullName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      acc.identifier.toLowerCase().includes(searchStudent.toLowerCase());
    const matchesAge = filterAge === 'all' || acc.ageGroup === filterAge;
    return matchesSearch && matchesAge;
  });

  // Close report card modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedStudentForReport) {
        setSelectedStudentForReport(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStudentForReport]);

  const getAgeLabelThai = (age: AgeGroup) => {
    switch (age) {
      case 'child': return 'Child (5-12 yrs) · เด็กเล็ก';
      case 'teen': return 'Teen (13-19 yrs) · วัยรุ่น';
      case 'young_adult': return 'Young Adult (20-29 yrs) · วัย 20-29 ปี';
      case 'adult': return 'Working Adult (30-49 yrs) · วัยทำงาน';
      case 'senior': return 'Senior (50-70+ yrs) · ผู้สูงวัย';
      default: return 'Learner · ผู้เรียน';
    }
  };

  // Common Thai student pronunciation and grammar pitfalls
  const THAI_LEARNER_PITFALLS = [
    {
      title: '1. Final Consonants Deletion (การตัดเสียงท้าย)',
      problem: 'Thai learners often drop final consonant sounds: pronouncing "cat" as "ca-", "book" without the final /k/, or "bus" without /s/. Thai syllable codas unrelease air.',
      solution: 'Teach gentle final air release: /k/ - /æ/ - /t/. Show tongue touch behind upper teeth then release.',
      thaiHint: 'ภาษาไทยแม่กด แม่กก มักหยุดลม แต่ภาษาอังกฤษต้องปล่อยลมเสียงท้ายเสมอ เช่น /s/, /t/, /d/, /k/',
      drill: 'cat, bus, book, hat, dog'
    },
    {
      title: '2. S / SH / CH Confusion (ความสับสนเสียง ซ และ ช)',
      problem: 'The Thai alphabet lacks the /ʃ/ phoneme. Students often substitute /s/ for /ʃ/, making "ship" sound like "sip", or "shoe" like "sue".',
      solution: 'Use the "Shhh quiet" gesture with rounded lips and thick airflow for SH. Contrast with flat smile and teeth-hiss for S.',
      thaiHint: 'เสียง SH = ห่อปากกลมพ่นลมหนา / เสียง S = ยิ้มเห็นฟันเป่าลมเบาๆ',
      drill: 'sip vs ship, sea vs she, sin vs shin'
    },
    {
      title: '3. Tone Transfer vs English Word Stress (วรรณยุกต์กับเสียงเน้นหนักเบา)',
      problem: 'Thai is a tonal language. Students apply tones (low, mid, high, falling, rising) instead of English rhythm and lexical stress, making sentences sound flat or unnatural.',
      solution: 'Clap hands or tap tables on the stressed syllable (BAN-a-na, com-PU-ter) instead of changing voice pitch like musical tones.',
      thaiHint: 'ภาษาอังกฤษเน้นจังหวะหนัก-เบา (Stress) เช่น BAN-a-na, com-PU-ter ไม่ใช่วรรณยุกต์เสียงสูงต่ำแบบไทย',
      drill: 'BAN-a-na, AP-ple, com-PU-ter'
    },
    {
      title: '4. Subject-Verb Agreement (-s on Singular Verbs) (กริยาเติม s)',
      problem: 'Thai verbs do not conjugate for number or person ("เขาไป", "ฉันไป"). Students regularly say "He go", "She like coffee".',
      solution: 'Use the memorable anchor: "Single Subject feels lonely, so the Verb brings friend S" (He runs, She likes, The boss drinks).',
      thaiHint: 'He / She / It / ประธาน 1 คน กริยาปัจจุบันต้องเติม -s หรือ -es เสมอ เช่น He runs, She eats',
      drill: 'He runs. She eats. The dog barks.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      
      {/* Teacher Console Banner */}
      <div className="bg-indigo-900 dark:bg-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md border border-indigo-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-800/80 rounded-full text-xs font-bold text-indigo-200">
            <GraduationCap className="w-4 h-4" />
            <span>KruThai Teacher Portal · แดชบอร์ดครูผู้สอน</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Teacher Management & Student Progress Console
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 font-medium max-w-2xl">
            Track student learning progress across ages 5-70, jump into all 12 curriculum levels, review common Thai learner errors, and generate lesson plans.
          </p>
        </div>

        {/* Quick Teacher Tools */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <button
            onClick={handleUnlockAll}
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            title="Unlock all 12 levels for demonstration / ปลดล็อกทุกบทเรียน"
          >
            <Unlock className="w-4 h-4" />
            <span>Unlock All 12 Levels / ปลดล็อกทั้งหมด</span>
          </button>

          <button
            onClick={handleResetData}
            className="py-2.5 px-4 bg-indigo-800 hover:bg-indigo-700 text-indigo-200 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-indigo-700"
            title="Reset progress to start / รีเซ็ตผลการเรียน"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Data / รีเซ็ต</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs - Bilingual English First */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { key: 'students', labelEn: 'Student Roster & Progress', labelTh: 'ติดตามผลนักเรียน', icon: Users },
          { key: 'lessons', labelEn: 'All 12 Levels & Lessons', labelTh: 'บทเรียนทั้งหมด', icon: BookOpen },
          { key: 'thai_errors', labelEn: 'Common Thai Learner Pitfalls', labelTh: 'จุดผิดบ่อย', icon: AlertTriangle },
          { key: 'lesson_plan', labelEn: '5-Step Lesson Script', labelTh: 'สคริปต์การสอน', icon: Presentation },
          { key: 'worksheet', labelEn: 'Printable Worksheets', labelTh: 'ใบงานฝึกหัด', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => {
                playClickPop();
                setActiveTab(tab.key as any);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.labelEn}</span>
              <span className={`text-[10px] font-normal ${activeTab === tab.key ? 'text-indigo-200' : 'text-slate-400'}`}>
                ({tab.labelTh})
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 0: Student Progress Tracker */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Student Roster & Progress Tracking / รายชื่อและผลการเรียน
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Monitor completed lessons, current levels, XP points, and record personalized teacher notes.
              </p>
            </div>

            {/* Age Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Age Filter / ช่วงวัย:</span>
              <select
                value={filterAge}
                onChange={(e) => setFilterAge(e.target.value)}
                className="py-1.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-none"
              >
                <option value="all">All Ages / ทุกช่วงอายุ</option>
                <option value="adult">Working Adults (30-49 yrs) / วัยทำงาน</option>
                <option value="young_adult">Young Adults (20-29 yrs) / วัย 20-29 ปี</option>
                <option value="senior">Seniors (50-70+ yrs) / ผู้สูงวัย</option>
                <option value="child">Children (5-12 yrs) / เด็กเล็ก</option>
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              placeholder="Search student by name, phone, or email... / ค้นหานักเรียน"
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:border-indigo-500 dark:text-white"
            />
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStudents.map((student) => {
              const studentProg = getUserProgress(student.id);
              const isEditing = editingNotesId === student.id;

              return (
                <div
                  key={student.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
                >
                  {/* Top info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                        {student.avatarIcon || '👤'}
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                          {student.fullName}
                        </h3>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {student.identifier}
                        </div>
                        <div className="mt-1 inline-block px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold rounded-md">
                          {getAgeLabelThai(student.ageGroup)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          playClickPop();
                          if (onSelectStudentProfile) {
                            onSelectStudentProfile(student);
                          }
                        }}
                        className="p-2 sm:px-3 sm:py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-indigo-200 dark:border-indigo-800"
                        title="Switch to Student Mode as this learner / สลับเป็นผู้เรียนคนนี้"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Select / เลือกผู้เรียน</span>
                      </button>

                      <button
                        onClick={() => {
                          playClickPop();
                          setSelectedStudentForReport(student);
                        }}
                        className="p-2 sm:px-3 sm:py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="View Student Report Card / ดูบัตรรายงานผล"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Report Card / รายงาน</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Stats Strip */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400">LEVEL / ระดับ</div>
                      <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        Level {studentProg.currentLevel}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400">COMPLETED / บทที่จบ</div>
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {studentProg.completedLessons.length} / 29
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400">XP POINTS / คะแนน</div>
                      <div className="text-lg font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-0.5">
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>{studentProg.xp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Teacher Notes Section */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      <span>Teacher Notes & Feedback / บันทึกข้อเสนอแนะครู:</span>
                      {!isEditing ? (
                        <button
                          onClick={() => {
                            setEditingNotesId(student.id);
                            setNoteDraft(student.teacherNotes || '');
                          }}
                          className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit / แก้ไข</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveNotes(student.id)}
                            className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save / บันทึก</span>
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="text-slate-400 hover:underline text-[11px]"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Type personalized homework, pronunciation tips, or progress notes..."
                        rows={2}
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 dark:text-white"
                      />
                    ) : (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50/60 dark:bg-slate-800/40 p-2 rounded-xl">
                        "{student.teacherNotes || 'No notes added yet for this student.'}"
                      </p>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Student Report Modal / Card */}
          {selectedStudentForReport && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in cursor-pointer"
              onClick={() => {
                playClickPop();
                setSelectedStudentForReport(null);
              }}
              title="Tap anywhere outside to close / แตะที่ว่างเพื่อปิด"
            >
              <div 
                className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                
                <div className="flex items-start justify-between border-b pb-4 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Student Learning Report Card / บัตรรายงานผลการเรียน
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {selectedStudentForReport.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedStudentForReport.identifier} · {getAgeLabelThai(selectedStudentForReport.ageGroup)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      playClickPop();
                      setSelectedStudentForReport(null);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Close / ปิด (Esc)"
                  >
                    ✕
                  </button>
                </div>

                {/* Report Content */}
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900 space-y-2">
                    <div className="font-extrabold text-indigo-950 dark:text-indigo-200">
                      English Proficiency Milestone / ระดับความสามารถ:
                    </div>
                    <div className="text-slate-700 dark:text-slate-300">
                      Completed {getUserProgress(selectedStudentForReport.id).completedLessons.length} out of 29 interactive lessons (Current Level: Level {getUserProgress(selectedStudentForReport.id).currentLevel})
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                        เรียนจบแล้ว {getUserProgress(selectedStudentForReport.id).completedLessons.length} บทเรียน จากทั้งหมด 29 บทเรียน
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-700 dark:text-slate-300">
                      Assessed Sounds & Vocabulary (Mastered) / เสียงและคำศัพท์ที่ผ่านเกณฑ์:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {getUserProgress(selectedStudentForReport.id).masteredSounds.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-lg font-bold text-xs">
                          /{s.toLowerCase()}/ Sound
                        </span>
                      ))}
                      {getUserProgress(selectedStudentForReport.id).masteredWords.map((w) => (
                        <span key={w} className="px-2.5 py-1 bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 rounded-lg font-bold text-xs">
                          Word: {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300">
                    <strong>Teacher Feedback & Recommendations:</strong> {selectedStudentForReport.teacherNotes || 'Student meets or exceeds all current stage phonics and sentence-building milestones.'}
                  </div>
                </div>

                {/* Footer action */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Report Card / พิมพ์</span>
                  </button>
                  <button
                    onClick={() => setSelectedStudentForReport(null)}
                    className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close / ปิด
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: All Levels & Quick Jump */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                All 12 Curriculum Levels & Lessons / บทเรียนทั้งหมด 12 ระดับ
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Select any level to preview objectives, examine interactive steps, or launch directly in class.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl">
              12 Foundational Levels (Sound → Story)
            </span>
          </div>

          {/* Level Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {CURRICULUM_LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => {
                  playClickPop();
                  setSelectedLevelId(level.id);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedLevelId === level.id
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-black text-indigo-700 dark:text-indigo-400">Level {level.id}</div>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                  {level.title}
                </div>
                <div className="text-[11px] text-slate-400 font-medium truncate">
                  {level.titleThai || level.thaiTitle}
                </div>
              </button>
            ))}
          </div>

          {/* Active Level Detail & Lessons List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
                  LEVEL {currentLevel.id}: {(currentLevel.stage || currentLevel.title).toUpperCase()}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {currentLevel.title} · {currentLevel.titleThai || currentLevel.thaiTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {currentLevel.tagline || currentLevel.description}
                </p>
              </div>

              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                {currentLevel.lessons.length} Interactive Lessons
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLevel.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/40 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                        Lesson ID: {lesson.id}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {lesson.steps.length} Steps / ขั้นตอน
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {lesson.title}
                    </h4>

                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {lesson.titleThai || lesson.thaiTitle}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 pt-1">
                      {lesson.description || lesson.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playClickPop();
                      onSelectLesson(lesson);
                    }}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Lesson in Classroom / เปิดสอนบทนี้</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Common Thai Learner Pitfalls */}
      {activeTab === 'thai_errors' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Common Thai Learner Pitfalls & Solutions / จุดที่ผู้เรียนไทยมักผิดบ่อย
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Phonological and grammatical contrast analysis between Thai and English with classroom drill techniques for ages 5-70.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {THAI_LEARNER_PITFALLS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xs"
              >
                <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base sm:text-lg">
                  <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{item.title}</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-950 dark:text-rose-200 font-medium">
                    ⚠️ <strong>Problem / ปัญหา:</strong> {item.problem}
                  </div>

                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-emerald-950 dark:text-emerald-200 font-medium">
                    💡 <strong>Teaching Technique / วิธีสอนแก้ปัญหา:</strong> {item.solution}
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300">
                    🇹🇭 <strong>Teacher Note for Thai Learners:</strong> {item.thaiHint}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">
                    Drill: {item.drill}
                  </div>
                  <button
                    onClick={() => {
                      playClickPop();
                      speakEnglish(item.drill);
                    }}
                    className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl cursor-pointer"
                    title="Audio Practice Drill / ฟังเสียงตัวอย่าง"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Classroom Lesson Script */}
      {activeTab === 'lesson_plan' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
              Classroom Script & Pedagogical Plan
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              5-Step Communicative Teaching Script for English Teachers / สคริปต์การสอน 5 ขั้นตอน
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Systematic phonics, TPR, and sentence expansion sequence. Avoid literal translation; establish intuition through visual anchors and immediate pronunciation feedback.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '1. Sound Isolation (แยกเสียงเดี่ยว)',
                desc: 'Do not teach letter names first; begin with the pure phonetic sound. E.g. "Today we practice /s/ - smile and blow air ssssss like a friendly snake."',
                teacherSay: 'Listen to my mouth: /s/ ... /s/ ... Now everyone try together!'
              },
              {
                step: '2. Sound to Letter Mapping (จับคู่เสียงกับตัวอักษร)',
                desc: 'Display the written letter S on screen: "When your eyes see letter S, your mouth says /s/."',
                teacherSay: 'Look at letter S. What sound does it make? /s/!'
              },
              {
                step: '3. Phonics Blending (ผสมเสียง 3 ตัวอักษร CVC)',
                desc: 'Place C, A, T on screen. Point slowly: /k/ ... /æ/ ... /t/, then sweep finger smoothly: CAT!',
                teacherSay: 'Let us blend together: /k/ ... /æ/ ... /t/ ... CAT! What is a cat? แมว!'
              },
              {
                step: '4. TPR Body Action (เชื่อมโยงกับท่าทาง)',
                desc: 'Speak the physical command with immediate demonstration: "STAND UP!", "SIT DOWN!". Have students physically move.',
                teacherSay: 'Everybody stand up! Now walk! Now sit down! Excellent job!'
              },
              {
                step: '5. Sentence Expansion (ต่อยอดเป็นประโยค)',
                desc: 'Use the 3-block formula: WHO (ประธาน) + ACTION (กริยา) + THING (กรรม).',
                teacherSay: 'Who eats rice? I eat rice! Repeat after me: I eat rice.'
              }
            ].map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-black text-base text-slate-900 dark:text-white">{s.step}</div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">{s.desc}</p>
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                  🎙️ <strong>Classroom Teacher Cue / ตัวอย่างคำพูดครู:</strong> "{s.teacherSay}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Worksheet Template */}
      {activeTab === 'worksheet' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Printable Phonics & Vocab Worksheets / ใบงานฝึกหัด
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ready-to-print classroom worksheets for handwriting trace drills and word-to-meaning matching.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet / พิมพ์แบบฝึกหัด</span>
            </button>
          </div>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 space-y-6 bg-white text-slate-900">
            <div className="flex justify-between border-b pb-4 text-xs font-bold text-slate-600">
              <span>Student Name / ชื่อ: ___________________________</span>
              <span>Class / ชั้น: ______ Date / วันที่: ________</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-slate-900">
                Part 1: Trace & Say Phonics Sounds (คัดและออกเสียง)
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center font-mono text-2xl font-bold">
                <div className="p-4 border rounded-xl bg-slate-50">S s</div>
                <div className="p-4 border rounded-xl bg-slate-50">A a</div>
                <div className="p-4 border rounded-xl bg-slate-50">T t</div>
                <div className="p-4 border rounded-xl bg-slate-50">P p</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-black text-sm text-slate-900">
                Part 2: Match Word with Meaning (โยงเส้นจับคู่ความหมาย)
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
                <div className="space-y-2">
                  <div className="p-2 border rounded-lg">1. apple</div>
                  <div className="p-2 border rounded-lg">2. cat</div>
                  <div className="p-2 border rounded-lg">3. dog</div>
                  <div className="p-2 border rounded-lg">4. office</div>
                </div>
                <div className="space-y-2">
                  <div className="p-2 border rounded-lg">A. สำนักงาน/ออฟฟิศ (office)</div>
                  <div className="p-2 border rounded-lg">B. แอปเปิล (apple)</div>
                  <div className="p-2 border rounded-lg">C. สุนัข (dog)</div>
                  <div className="p-2 border rounded-lg">D. แมว (cat)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
