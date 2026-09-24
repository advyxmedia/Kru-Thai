import React, { useState, useEffect } from 'react';
import { UserAccount, UserProgress } from '../types';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface TeacherConsoleProps {
  progress: UserProgress;
  setProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onSelectLesson: (lesson: any) => void;
  onSelectStudentProfile: (user: UserAccount) => void;
}

export function TeacherConsole({
  progress,
  setProgress,
  onSelectLesson,
  onSelectStudentProfile,
}: TeacherConsoleProps) {
  const [students, setStudents] = useState<UserAccount[]>([]);
  const [studentProgresses, setStudentProgresses] = useState<Record<string, UserProgress>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real registered users and progress from Firestore
  useEffect(() => {
    async function fetchRealStudents() {
      setIsLoading(true);
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const realUsers: UserAccount[] = [];
        usersSnap.forEach((doc) => {
          realUsers.push(doc.data() as UserAccount);
        });

        const progressSnap = await getDocs(collection(db, 'progress'));
        const progMap: Record<string, UserProgress> = {};
        progressSnap.forEach((doc) => {
          progMap[doc.id] = doc.data() as UserProgress;
        });

        setStudents(realUsers);
        setStudentProgresses(progMap);
      } catch (err) {
        console.error('Error fetching students from Firestore:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRealStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.identifier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = selectedAgeFilter === 'all' || student.ageGroup === selectedAgeFilter;
    return matchesSearch && matchesAge;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">
            Student Roster & Progress Tracking / รายชื่อและผลการเรียน
          </h2>
          <p className="text-sm text-slate-400">
            Monitor real registered students, completed lessons, and current progress.
          </p>
        </div>

        {/* Age Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Age Filter / ช่วงอายุ</label>
          <select
            value={selectedAgeFilter}
            onChange={(e) => setSelectedAgeFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Ages / ทุกช่วงอายุ</option>
            <option value="child">Child (5-12 yrs)</option>
            <option value="teen">Teen (13-19 yrs)</option>
            <option value="young_adult">Young Adult (20-29 yrs)</option>
            <option value="adult">Working Adult (30-49 yrs)</option>
            <option value="senior">Senior (50+ yrs)</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search student by name, phone, or email... / ค้นหานักเรียน"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-slate-100 text-sm focus:outline-none focus:border-teal-500"
        />
        <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
      </div>

      {/* Student List Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Loading real student accounts from Firebase...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/50">
          <p className="text-slate-300 font-semibold text-lg">No registered students found</p>
          <p className="text-slate-400 text-sm mt-1">
            When users register on your site, they will automatically appear here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.map((student) => {
            const prog = studentProgresses[student.id];
            const completedCount = prog?.completedLessons?.length || 0;
            const xp = prog?.xp || 0;

            return (
              <div
                key={student.id}
                className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-teal-500/50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl bg-slate-700/50 p-2 rounded-xl">
                      {student.avatarIcon || '👤'}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-lg">{student.fullName}</h3>
                      <p className="text-xs text-slate-400">{student.identifier}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] bg-slate-700 text-teal-300 rounded-full font-medium">
                        {student.ageGroup}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectStudentProfile(student)}
                    className="px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-lg border border-teal-500/30 transition"
                  >
                    Select / เลือกผู้เรียน
                  </button>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-3 gap-2 bg-slate-900/60 rounded-xl p-3 text-center border border-slate-700/40">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Level / ระดับ</span>
                    <span className="text-sm font-bold text-slate-200">Level {prog?.currentLevel || 0}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Completed / บทที่จบ</span>
                    <span className="text-sm font-bold text-teal-400">{completedCount} / 29</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">XP Points / คะแนน</span>
                    <span className="text-sm font-bold text-amber-400">✨ {xp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}