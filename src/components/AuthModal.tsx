import React, { useState, useEffect } from 'react';
import { UserAccount, AgeGroup } from '../types';
import { COUNTRY_CODES, loginOrRegisterUser, getStoredAccounts } from '../utils/auth';
import { playClickPop, playSuccessChime } from '../utils/audio';
import { 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown,
  X,
  LogIn
} from 'lucide-react';

interface AuthModalProps {
  currentUser: UserAccount | null;
  onLoginSuccess: (user: UserAccount) => void;
  onClose?: () => void;
  canClose?: boolean;
  initialTab?: 'profiles' | 'login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  onLoginSuccess,
  onClose,
  canClose = true,
  initialTab = 'profiles',
}) => {
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [countryCode, setCountryCode] = useState('TH');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult'); // default to 30-40 adult
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [showAccountList, setShowAccountList] = useState(initialTab === 'profiles');
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        playClickPop();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const existingAccounts = getStoredAccounts();
  const studentAccounts = existingAccounts.filter((a) => a.role !== 'teacher');
  const teacherAccounts = existingAccounts.filter((a) => a.role === 'teacher');
  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const handleClose = () => {
    playClickPop();
    if (onClose) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('กรุณากรอกชื่อของคุณ (Please enter your name)');
      return;
    }

    let identifier = '';
    if (authMethod === 'phone') {
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 6) {
        setErrorMsg('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (Please enter a valid phone number)');
        return;
      }
      identifier = `${selectedCountry.dialCode} ${cleanPhone}`;
    } else {
      if (!emailAddress.includes('@') || !emailAddress.includes('.')) {
        setErrorMsg('กรุณากรอกอีเมลที่ถูกต้อง (Please enter a valid email address)');
        return;
      }
      identifier = emailAddress.trim();
    }

    playClickPop();
    const user = loginOrRegisterUser({
      authType: authMethod,
      identifier,
      countryCode: selectedCountry.code,
      fullName: fullName.trim(),
      ageGroup,
      role,
    });

    playSuccessChime();
    onLoginSuccess(user);
    if (onClose) onClose();
  };

  const handleSelectExisting = (acc: UserAccount) => {
    playClickPop();
    playSuccessChime();
    onLoginSuccess(acc);
    if (onClose) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in cursor-pointer"
      onClick={handleClose}
      title="Tap anywhere outside to close / แตะที่ว่างเพื่อปิด"
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-slate-800 dark:text-slate-100 transition-colors cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Prominent Close (✕) button */}
        {onClose && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 flex items-center gap-1 text-xs font-bold"
            title="Close / ยกเลิก (Esc หรือ แตะที่ว่าง)"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-slate-500 hover:text-rose-500" />
            <span className="hidden sm:inline text-[11px] text-slate-400">Esc / ปิด</span>
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-inner">
            🇹🇭
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Sign In / Register · เข้าสู่ระบบ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            English Learning Account · เหมาะสำหรับผู้เรียนและครูทุกวัย (5-70 ปี)
          </p>
        </div>

        {/* Toggle Existing Accounts vs New Login */}
        {existingAccounts.length > 0 && (
          <div className="mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex text-xs font-bold">
            <button
              type="button"
              onClick={() => setShowAccountList(true)}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                showAccountList
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Select Profile / เลือกโปรไฟล์ ({existingAccounts.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAccountList(false)}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                !showAccountList
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Log In / สมัครสมาชิก</span>
            </button>
          </div>
        )}

        {showAccountList ? (
          /* List of existing accounts on this device grouped by Student and Teacher */
          <div className="space-y-4">
            
            {/* Student Profiles Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Student Profiles / โปรไฟล์ผู้เรียน (Ages 5-70):</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{studentAccounts.length} Students</span>
              </div>
              
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {studentAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectExisting(acc)}
                    className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                      currentUser?.id === acc.id
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl shrink-0">{acc.avatarIcon || '👤'}</span>
                      <div>
                        <div className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{acc.fullName}</span>
                          {currentUser?.id === acc.id && (
                            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Active / ใช้งานอยู่
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                          <span>{acc.identifier}</span>
                          <span>•</span>
                          <span className="capitalize font-semibold text-indigo-600 dark:text-indigo-400">
                            {acc.ageGroup === 'child' ? 'Child (5-12y)' : acc.ageGroup === 'teen' ? 'Teen (13-19y)' : acc.ageGroup === 'young_adult' ? 'Adult (20-29y)' : acc.ageGroup === 'senior' ? 'Senior (50-70+y)' : 'Adult (30-49y)'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 shrink-0">
                      <span>Select</span>
                      <LogIn className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Teacher Profiles Section */}
            {teacherAccounts.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Teacher Profiles / โปรไฟล์ครูผู้สอน:</span>
                </div>
                <div className="space-y-2">
                  {teacherAccounts.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => handleSelectExisting(acc)}
                      className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                        currentUser?.id === acc.id
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100'
                          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl shrink-0">{acc.avatarIcon || '👨‍🏫'}</span>
                        <div>
                          <div className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{acc.fullName}</span>
                            {currentUser?.id === acc.id && (
                              <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                            👨‍🏫 Teacher Mode Access · เข้าสู่ระบบครู
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 shrink-0">
                        <span>Select</span>
                        <LogIn className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAccountList(false)}
                className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl text-xs font-bold text-indigo-600 dark:text-indigo-400 transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>+ Log In New Account / บัญชีอื่น</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
                  title="Cancel and close dialog / ยกเลิกและปิด"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel / ปิด</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Form for phone / email registration or login */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Auth Method Selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMethod === 'phone'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Phone / เบอร์โทรศัพท์</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMethod === 'email'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email / อีเมล</span>
              </button>
            </div>

            {/* Identifier Input */}
            {authMethod === 'phone' ? (
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  Phone Number / เบอร์โทรศัพท์ (All Country Codes Supported):
                </label>
                <div className="flex gap-2">
                  {/* Country Selector */}
                  <div className="relative">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="h-12 pl-3 pr-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold appearance-none cursor-pointer focus:outline-none focus:border-indigo-500"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.dialCode} ({c.name})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Phone number digits */}
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 081 234 5678"
                    className="flex-1 h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                  Email Address / ที่อยู่อีเมล:
                </label>
                <input
                  type="email"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Full Name or Nickname / ชื่อของคุณ:
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Somchai, Nari, John, Teacher David"
                className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Age Group Selector (Critical for tailored learning 5 to 70 years old!) */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Age Group / ช่วงอายุของผู้เรียน (Ages 5 - 70+):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  { key: 'child', labelEn: 'Child (5-12)', labelTh: 'เด็กเล็ก', icon: '🧒' },
                  { key: 'teen', labelEn: 'Teen (13-19)', labelTh: 'วัยรุ่น', icon: '🧑‍🎓' },
                  { key: 'young_adult', labelEn: 'Young Adult (20-29)', labelTh: 'วัย 20-29', icon: '🧑‍💻' },
                  { key: 'adult', labelEn: 'Adult (30-49)', labelTh: 'วัยทำงาน', icon: '👨‍💼' },
                  { key: 'senior', labelEn: 'Senior (50-70+)', labelTh: 'ผู้สูงวัย', icon: '🧓' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setAgeGroup(item.key as AgeGroup)}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      ageGroup === item.key
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-200 dark:ring-indigo-800'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.labelEn} <span className="text-[10px] opacity-75">({item.labelTh})</span></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Student or Teacher Role */}
            <div className="flex items-center gap-4 pt-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Role / บทบาท:
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                    className="text-indigo-600"
                  />
                  <span>Student / ผู้เรียน</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'teacher'}
                    onChange={() => setRole('teacher')}
                    className="text-indigo-600"
                  />
                  <span>English Teacher / คุณครู</span>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-bold text-center">
                {errorMsg}
              </div>
            )}

            {/* Submit & Cancel Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Enter Classroom & Start / เข้าสู่ระบบ</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 px-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4 text-slate-400" />
                  <span>Cancel / Close without Login (ยกเลิก / ปิดหน้าต่างนี้)</span>
                </button>
              )}
            </div>

            <div className="text-[11px] text-center text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Local-first & offline safe · ข้อมูลเก็บในเครื่องปลอดภัย</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
