import { UserAccount, AgeGroup, UserProgress } from '../types';
import { INITIAL_PROGRESS } from './storage';

export interface CountryInfo {
  code: string; // e.g. "TH"
  name: string; // e.g. "Thailand"
  nameThai: string; // e.g. "ไทย"
  dialCode: string; // e.g. "+66"
  flag: string; // e.g. "🇹🇭"
}

export const COUNTRY_CODES: CountryInfo[] = [
  { code: 'TH', name: 'Thailand', nameThai: 'ไทย', dialCode: '+66', flag: '🇹🇭' },
  { code: 'US', name: 'United States', nameThai: 'สหรัฐอเมริกา', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', nameThai: 'สหราชอาณาจักร', dialCode: '+44', flag: '🇬🇧' },
  { code: 'JP', name: 'Japan', nameThai: 'ญี่ปุ่น', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', nameThai: 'เกาหลีใต้', dialCode: '+82', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', nameThai: 'สิงคโปร์', dialCode: '+65', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', nameThai: 'มาเลเซีย', dialCode: '+60', flag: '🇲🇾' },
  { code: 'LA', name: 'Laos', nameThai: 'ลาว', dialCode: '+856', flag: '🇱🇦' },
  { code: 'MM', name: 'Myanmar', nameThai: 'เมียนมา', dialCode: '+95', flag: '🇲🇲' },
  { code: 'KH', name: 'Cambodia', nameThai: 'กัมพูชา', dialCode: '+855', flag: '🇰🇭' },
  { code: 'VN', name: 'Vietnam', nameThai: 'เวียดนาม', dialCode: '+84', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', nameThai: 'ฟิลิปปินส์', dialCode: '+63', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', nameThai: 'อินโดนีเซีย', dialCode: '+62', flag: '🇮🇩' },
  { code: 'CN', name: 'China', nameThai: 'จีน', dialCode: '+86', flag: '🇨🇳' },
  { code: 'TW', name: 'Taiwan', nameThai: 'ไต้หวัน', dialCode: '+886', flag: '🇹🇼' },
  { code: 'HK', name: 'Hong Kong', nameThai: 'ฮ่องกง', dialCode: '+852', flag: '🇭🇰' },
  { code: 'AU', name: 'Australia', nameThai: 'ออสเตรเลีย', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', nameThai: 'เยอรมนี', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', nameThai: 'ฝรั่งเศส', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IN', name: 'India', nameThai: 'อินเดีย', dialCode: '+91', flag: '🇮🇳' },
  { code: 'CA', name: 'Canada', nameThai: 'แคนาดา', dialCode: '+1', flag: '🇨🇦' },
  { code: 'NZ', name: 'New Zealand', nameThai: 'นิวซีแลนด์', dialCode: '+64', flag: '🇳🇿' },
];

const ACCOUNTS_STORAGE_KEY = 'kruthai_accounts_registry_v2';
const ACTIVE_USER_ID_KEY = 'kruthai_active_user_id_v2';
const PROGRESS_MAP_KEY = 'kruthai_user_progress_map_v2';

// Empty seed accounts array so no fake accounts are created
const SEED_ACCOUNTS: UserAccount[] = [];

export function getStoredAccounts(): UserAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveStoredAccounts(accounts: UserAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch (e) {}
}

// Defaults to null instead of user_somchai_35
export function getActiveUserId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(ACTIVE_USER_ID_KEY) || null;
  } catch (e) {
    return null;
  }
}

export function setActiveUserId(userId: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (userId) {
      localStorage.setItem(ACTIVE_USER_ID_KEY, userId);
    } else {
      localStorage.removeItem(ACTIVE_USER_ID_KEY);
    }
  } catch (e) {}
}

export function getActiveUser(): UserAccount | null {
  const activeId = getActiveUserId();
  if (!activeId) return null;
  const accounts = getStoredAccounts();
  return accounts.find((a) => a.id === activeId) || null;
}

export function loginOrRegisterUser(params: {
  authType: 'email' | 'phone';
  identifier: string;
  countryCode?: string;
  fullName: string;
  ageGroup: AgeGroup;
  role?: 'student' | 'teacher';
}): UserAccount {
  const accounts = getStoredAccounts();
  const cleanId = params.identifier.trim().toLowerCase();

  // Check if account already exists
  const existing = accounts.find(
    (a) => a.identifier.trim().toLowerCase() === cleanId
  );

  if (existing) {
    setActiveUserId(existing.id);
    return existing;
  }

  // Create new user account for real users
  const newAccount: UserAccount = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    authType: params.authType,
    identifier: params.identifier.trim(),
    countryCode: params.countryCode || 'TH',
    fullName: params.fullName.trim(),
    ageGroup: params.ageGroup,
    role: params.role || 'student',
    createdAt: new Date().toISOString(),
    avatarIcon: getAvatarForAge(params.ageGroup),
  };

  const updatedAccounts = [newAccount, ...accounts];
  saveStoredAccounts(updatedAccounts);
  setActiveUserId(newAccount.id);

  // Initialize fresh progress for new user
  const initialProg: UserProgress = {
    ...INITIAL_PROGRESS,
    userId: newAccount.id,
    userMode: newAccount.role,
  };
  saveUserProgress(newAccount.id, initialProg);

  return newAccount;
}

function getAvatarForAge(age: AgeGroup): string {
  switch (age) {
    case 'child': return '🧒';
    case 'teen': return '🧑‍🎓';
    case 'young_adult': return '🧑‍💻';
    case 'adult': return '👨‍💼';
    case 'senior': return '🧓';
    default: return '👤';
  }
}

// User-isolated progress storage map
export function getUserProgress(userId: string): UserProgress {
  if (typeof window === 'undefined') return { ...INITIAL_PROGRESS, userId };
  try {
    const rawMap = localStorage.getItem(PROGRESS_MAP_KEY);
    const map = rawMap ? JSON.parse(rawMap) : {};
    if (map[userId]) {
      return {
        ...INITIAL_PROGRESS,
        ...map[userId],
        userId,
      };
    }
  } catch (e) {}

  return { ...INITIAL_PROGRESS, userId };
}

export function saveUserProgress(userId: string, progress: UserProgress): void {
  if (typeof window === 'undefined' || !userId) return;
  try {
    const rawMap = localStorage.getItem(PROGRESS_MAP_KEY);
    const map = rawMap ? JSON.parse(rawMap) : {};
    map[userId] = progress;
    localStorage.setItem(PROGRESS_MAP_KEY, JSON.stringify(map));
  } catch (e) {}
}

export function updateTeacherNotesForStudent(studentId: string, notes: string): void {
  const accounts = getStoredAccounts();
  const updated = accounts.map((acc) => {
    if (acc.id === studentId) {
      return { ...acc, teacherNotes: notes };
    }
    return acc;
  });
  saveStoredAccounts(updated);
}