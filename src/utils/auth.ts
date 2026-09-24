import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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

// Firebase Configuration from your console
const firebaseConfig = {
  apiKey: "AIzaSyBt53YO2WEoKzRbGXZkqCcXKOEdNCaX4_k",
  authDomain: "kru-thai-english.firebaseapp.com",
  projectId: "kru-thai-english",
  storageBucket: "kru-thai-english.firebasestorage.app",
  messagingSenderId: "373308386070",
  appId: "1:373308386070:web:634288a91a774782127e37",
  measurementId: "G-2F5X3MXXH3"
};

// Initialize Firebase SDK Services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Register New User
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

// Login User
export async function loginFirebaseUser(email: string, pass: string): Promise<UserAccount | null> {
  const userCred = await signInWithEmailAndPassword(auth, email, pass);
  const uid = userCred.user.uid;
  
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserAccount;
  }
  return null;
}

// Logout User
export function logoutFirebaseUser() {
  return signOut(auth);
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