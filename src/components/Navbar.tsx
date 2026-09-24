import React, { useState, useEffect } from 'react';
import { UserMode, ThaiSupportLevel, ThemeMode, UserAccount } from '../types';
import { playClickPop } from '../utils/audio';
import { 
  BookOpen, 
  Volume2, 
  GraduationCap, 
  Flame, 
  Sparkles, 
  Compass, 
  Sun, 
  Moon, 
  Clock,
  Activity, 
  User, 
  Layers,
  ChevronDown,
  LogIn,
  Check,
  X,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  thaiSupport: ThaiSupportLevel;
  setThaiSupport: (level: ThaiSupportLevel) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  currentUser: UserAccount | null;
  onSelectUser?: (user: UserAccount) => void;
  onOpenAuthModal: (tab?: 'profiles' | 'login') => void;
  currentView: 'roadmap' | 'lesson' | 'phonics_sandbox' | 'sentence_workshop' | 'vocab_explorer' | 'tpr_game' | 'teacher_console';
  setCurrentView: (view: 'roadmap' | 'lesson' | 'phonics_sandbox' | 'sentence_workshop' | 'vocab_explorer' | 'tpr_game' | 'teacher_console') => void;
  streakDays: number;
  xp: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  userMode,
  setUserMode,
  thaiSupport,
  setThaiSupport,
  themeMode,
  setThemeMode,
  currentUser,
  onOpenAuthModal,
  currentView,
  setCurrentView,
  streakDays,
  xp,
}) => {
  const [showThaiMenu, setShowThaiMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const closeAllMenus = () => {
    setShowThaiMenu(false);
    setShowThemeMenu(false);
    setShowUserDropdown(false);
  };

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const anyDropdownOpen = showThaiMenu || showThemeMenu || showUserDropdown;
  const isDarkMode = themeMode === 'dark';

  const toggleDayNight = () => {
    playClickPop();
    const nextMode: ThemeMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(nextMode);
    closeAllMenus();
  };

  const navItems = [
    { id: 'roadmap', labelEn: 'Roadmap', labelTh: 'แผนผัง', icon: Compass },
    { id: 'phonics_sandbox', labelEn: 'Phonics', labelTh: 'โฟนิกส์', icon: Volume2 },
    { id: 'sentence_workshop', labelEn: 'Sentences', labelTh: 'ประโยค', icon: Layers },
    { id: 'vocab_explorer', labelEn: 'Vocabulary', labelTh: 'คำศัพท์', icon: BookOpen },
    { id: 'tpr_game', labelEn: 'Action Game', labelTh: 'เกมขยับกาย', icon: Activity },
  ];

  return (
    <>
      {/* Invisible Full-Screen Backdrop: Closes any menu when tapping anywhere on the screen */}
      {anyDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent cursor-default"
          onClick={closeAllMenus}
          onTouchStart={closeAllMenus}
          aria-hidden="true"
        />
      )}

      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors w-full">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between gap-2">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div 
              onClick={() => {
                playClickPop();
                closeAllMenus();
                setCurrentView('roadmap');
              }}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 transition-transform shrink-0">
                ครู
              </div>
              <div className="leading-tight">
                <div className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  <span>KruThai</span>
                  <span className="text-indigo-600 dark:text-indigo-400">English</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium hidden md:block">
                  Local-First Bilingual Learning
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClickPop();
                      closeAllMenus();
                      setCurrentView(item.id as any);
                    }}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-2xs font-extrabold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={`${item.labelEn} (${item.labelTh})`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.labelEn}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls: Mode Switcher, Prominent Thai Support, Day/Night, Streak/XP, User */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* 1. Student / Teacher Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
              <button
                onClick={() => {
                  playClickPop();
                  closeAllMenus();
                  setUserMode('student');
                  if (currentView === 'teacher_console') {
                    setCurrentView('roadmap');
                  }
                }}
                className={`px-2 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                  currentView !== 'teacher_console'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Student Learning Mode / โหมดผู้เรียน"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student</span>
              </button>

              <button
                onClick={() => {
                  playClickPop();
                  closeAllMenus();
                  setUserMode('teacher');
                  setCurrentView('teacher_console');
                }}
                className={`px-2 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                  currentView === 'teacher_console'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Teacher Console Mode / โหมดคุณครู"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Teacher</span>
              </button>
            </div>

            {/* 2. VERY IMPORTANT: PROMINENT THAI SUPPORT BUTTON (ALWAYS VISIBLE ON ALL SCREENS) */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  playClickPop();
                  setShowThaiMenu(!showThaiMenu);
                  setShowThemeMenu(false);
                  setShowUserDropdown(false);
                }}
                className="flex items-center gap-1 py-1.5 px-2 sm:px-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/70 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 rounded-xl text-xs font-black transition-all cursor-pointer shadow-2xs"
                title="Thai Guidance Level / ปุ่มเลือกระดับคำแปลไทย (แตะที่ว่างเพื่อปิด)"
              >
                <span className="text-sm leading-none">🇹🇭</span>
                <span className="font-black text-[11px] sm:text-xs">
                  {thaiSupport === 'beginner' 
                    ? 'ไทย: เต็มรูป' 
                    : thaiSupport === 'learning' 
                    ? 'ไทย: ปานกลาง' 
                    : thaiSupport === 'practice' 
                    ? 'ไทย: น้อยลง' 
                    : 'English Only'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
              </button>

              {/* Thai Support Dropdown */}
              {showThaiMenu && (
                <div 
                  className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-pop space-y-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase flex items-center gap-1">
                      <span>🇹🇭</span>
                      <span>Thai Support / คำอธิบายไทย:</span>
                    </span>
                    <button
                      onClick={() => setShowThaiMenu(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
                      title="Close / ปิด"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {[
                    { key: 'beginner', en: 'Full Thai (Beginner)', th: 'ไทยเต็มรูป (มือใหม่ทุกวัย 5-70 ปี)' },
                    { key: 'learning', en: 'Medium Thai (Learning)', th: 'ไทยปานกลาง (กำลังเรียน)' },
                    { key: 'practice', en: 'Low Thai (Practice)', th: 'ไทยน้อยลง (ฝึกฝน)' },
                    { key: 'challenge', en: 'English Only (Immersion)', th: 'อังกฤษล้วน (ท้าทายความสามารถ)' },
                  ].map((lvl) => (
                    <button
                      key={lvl.key}
                      onClick={() => {
                        playClickPop();
                        setThaiSupport(lvl.key as ThaiSupportLevel);
                        setShowThaiMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        thaiSupport === lvl.key
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-black border border-amber-300 dark:border-amber-800'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{lvl.en}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{lvl.th}</div>
                      </div>
                      {thaiSupport === lvl.key && (
                        <Check className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                      )}
                    </button>
                  ))}
                  <div className="pt-1 text-[10px] text-slate-400 text-center">
                    💡 แตะที่ว่างบนหน้าจอเพื่อปิด
                  </div>
                </div>
              )}
            </div>

            {/* 3. Day / Night Mode Control with Arrow Dropdown & Tap Anywhere to Close */}
            <div className="relative shrink-0">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <button
                  onClick={toggleDayNight}
                  className="p-1.5 px-2 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                  title={isDarkMode ? 'Current: Night Mode 🌙. Click to switch to Day Mode ☀️' : 'Current: Day Mode ☀️. Click to switch to Night Mode 🌙'}
                >
                  {isDarkMode ? (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="text-xs font-bold hidden md:inline text-indigo-300">Night</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-xs font-bold hidden md:inline text-amber-600 dark:text-amber-400">Day</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    playClickPop();
                    setShowThemeMenu(!showThemeMenu);
                    setShowThaiMenu(false);
                    setShowUserDropdown(false);
                  }}
                  className="p-1.5 px-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-l border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  title="Theme Options: Day / Night / Auto Schedule (แตะที่ว่างเพื่อปิด)"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Theme Menu Dropdown */}
              {showThemeMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-pop space-y-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                      Theme Mode / ธีมหน้าจอ
                    </span>
                    <button
                      onClick={() => setShowThemeMenu(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
                      title="Close / ปิด"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      playClickPop();
                      setThemeMode('light');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      themeMode === 'light'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-200'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className="font-bold text-xs">Day Mode (กลางวัน)</div>
                        <div className="text-[10px] text-slate-400">Light background · สว่างสบายตา</div>
                      </div>
                    </div>
                    {themeMode === 'light' && <Check className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    onClick={() => {
                      playClickPop();
                      setThemeMode('dark');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      themeMode === 'dark'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <div>
                        <div className="font-bold text-xs">Night Mode (กลางคืน)</div>
                        <div className="text-[10px] text-slate-400">Dark background · ถนอมสายตามืด</div>
                      </div>
                    </div>
                    {themeMode === 'dark' && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>

                  <button
                    onClick={() => {
                      playClickPop();
                      setThemeMode('auto');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      themeMode === 'auto'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <div>
                        <div className="font-bold text-xs">Auto Schedule (อัตโนมัติ)</div>
                        <div className="text-[10px] text-slate-400">Day: 06:00-18:00 / Night: 18:00-06:00</div>
                      </div>
                    </div>
                    {themeMode === 'auto' && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>

                  <div className="pt-1 text-[10px] text-slate-400 text-center">
                    💡 แตะที่ว่างบนหน้าจอเพื่อปิด
                  </div>
                </div>
              )}
            </div>

            {/* 4. Real Streak & Real Earned XP (Shown only in Student mode) */}
            {currentView !== 'teacher_console' && (
              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                <div 
                  className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 px-2 py-1 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300"
                  title={`Daily Login Streak: ${streakDays} day(s)`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{streakDays}d</span>
                </div>

                <div 
                  className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/50 px-2 py-1 rounded-xl text-xs font-bold text-indigo-800 dark:text-indigo-300"
                  title={`Total Earned XP: ${xp}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" />
                  <span>{xp} XP</span>
                </div>
              </div>
            )}

            {/* 5. User Account / Login Button */}
            {/* Age is automatically detected from account; no age selector in header; not shown in teacher mode */}
            <div className="relative shrink-0">
              {currentUser ? (
                <button
                  onClick={() => {
                    playClickPop();
                    setShowUserDropdown(!showUserDropdown);
                    setShowThaiMenu(false);
                    setShowThemeMenu(false);
                  }}
                  className="flex items-center gap-1.5 p-1 sm:px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                  title={`Logged in as ${currentUser.fullName} · แตะเพื่อเปลี่ยนบัญชีหรือจัดการ`}
                >
                  <span className="text-base leading-none">{currentUser.avatarIcon || '👤'}</span>
                  <span className="hidden md:inline max-w-[90px] truncate">
                    {currentUser.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    playClickPop();
                    closeAllMenus();
                    onOpenAuthModal('login');
                  }}
                  className="flex items-center gap-1 py-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                  title="Log In / Sign In (เข้าสู่ระบบ)"
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span>Log In</span>
                </button>
              )}

              {/* User Account Popover */}
              {showUserDropdown && currentUser && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-pop space-y-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentUser.avatarIcon}</span>
                      <div className="leading-tight">
                        <div className="font-black text-xs text-slate-900 dark:text-white">
                          {currentUser.fullName}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {currentUser.role === 'teacher' ? '👨‍🏫 Teacher' : '👨‍🎓 Student'} · {currentUser.identifier}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowUserDropdown(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        playClickPop();
                        setShowUserDropdown(false);
                        onOpenAuthModal('profiles');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Switch Profile / สลับโปรไฟล์ผู้เรียน</span>
                    </button>

                    <button
                      onClick={() => {
                        playClickPop();
                        setShowUserDropdown(false);
                        onOpenAuthModal('login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Log In New Account / เข้าสู่ระบบบัญชีใหม่</span>
                    </button>
                  </div>

                  <div className="pt-1 text-[10px] text-slate-400 text-center border-t dark:border-slate-800">
                    Age automatically detected: {currentUser.ageGroup}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile and Tablets */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1 px-1 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playClickPop();
                closeAllMenus();
                setCurrentView(item.id as any);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-black'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-bold mt-0.5 whitespace-nowrap">{item.labelEn}</span>
              <span className="text-[8px] text-slate-400 dark:text-slate-500">{item.labelTh}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
