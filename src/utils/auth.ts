import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserAccount, AgeGroup, UserProgress } from '../types';
import { INITIAL_PROGRESS } from './storage';

export interface CountryInfo {
  code: string;
  name: string;
  nameThai: string;
  dialCode: string;
  flag: string;
}

export const COUNTRY_CODES: CountryInfo[] = [
  { code: 'TH', name: 'Thailand', nameThai: 'ไทย', dialCode: '+66', flag: '🇹🇭' },
  { code: 'US', name: 'United States', nameThai: 'สหรัฐอเมริกา', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', nameThai: 'สหราชอาณาจักร', dialCode: '+44', flag: '🇬🇧' },
  { code: 'JP', name: 'Japan', nameThai: 'ญี่ปุ่น', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', nameThai: 'เกาหลีใต้', dialCode: '+82', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', nameThai: 'สิงคโปร์', dialCode: '+65', flag: '🇸🇬' },
];

// Completely empty mock array so no hardcoded profiles render
export const MOCK_USERS: UserAccount[] = [];

export async function registerFirebaseUser(params: {
  email: string;
  pass: string;
  fullName: string;
  ageGroup: AgeGroup;
  countryCode?: string;
  role?: 'student' | 'teacher';
}): Promise<UserAccount> {
  const userCred = await createUserWithEmailAndPassword(auth, params.email, params.pass);
  const uid = userCred.user.uid;

  const userAccount: UserAccount = {
    id: uid,
    authType: 'email',
    identifier: params.email.trim(),
    countryCode: params.countryCode || 'TH',
    fullName: params.fullName.trim(),
    ageGroup: params.ageGroup,
    role: params.role || 'student',
    createdAt: new Date().toISOString(),
    avatarIcon: getAvatarForAge(params.ageGroup),
  };

  await setDoc(doc(db, "users", uid), userAccount);
  
  const initialProg: UserProgress = {
    ...INITIAL_PROGRESS,
    userId: uid,
    userMode: userAccount.role,
  };
  await setDoc(doc(db, "progress", uid), initialProg);

  return userAccount;
}

export async function loginFirebaseUser(email: string, pass: string): Promise<UserAccount | null> {
  const userCred = await signInWithEmailAndPassword(auth, email, pass);
  const uid = userCred.user.uid;
  
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserAccount;
  }
  return null;
}

export function logoutFirebaseUser() {
  return signOut(auth);
}

// Helpers for backward compatibility
export function getActiveUser(): UserAccount | null {
  return null;
}

export function setActiveUserId(id: string): void {
  // Handled by Firebase Auth state listener
}

export function getUserProgress(userId: string): UserProgress | null {
  return null;
}

export function saveUserProgress(userId: string, progress: UserProgress): void {
  // Handled by Firestore setDoc
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