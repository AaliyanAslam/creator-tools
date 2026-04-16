import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// ❌ analytics ko hata do (Next.js me issue deta hai)

// tumhara config (same)
const firebaseConfig = {
  apiKey: "AIzaSyAB9bobX9AnEa7h0hYYV6l6NW3BoEC0yT4",
  authDomain: "creator-tools-b72e8.firebaseapp.com",
  projectId: "creator-tools-b72e8",
  storageBucket: "creator-tools-b72e8.firebasestorage.app",
  messagingSenderId: "406944808193",
  appId: "1:406944808193:web:c6ab192ec048758d29af00",
  measurementId: "G-MCKPFE7T79"
};

// ✅ safe initialize (important in Next.js)
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// ✅ firestore export
export const db = getFirestore(app);