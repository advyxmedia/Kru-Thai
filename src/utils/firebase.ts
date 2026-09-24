import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt53YO2WEoKzRbGXZkqCcXKOEdNCaX4_k",
  authDomain: "kru-thai-english.firebaseapp.com",
  projectId: "kru-thai-english",
  storageBucket: "kru-thai-english.firebasestorage.app",
  messagingSenderId: "373308386070",
  appId: "1:373308386070:web:634288a91a774782127e37",
  measurementId: "G-2F5X3MXXH3"
};

// Initialize Firebase (prevents duplicate initialization errors)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;