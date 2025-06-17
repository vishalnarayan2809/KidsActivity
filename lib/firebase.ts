// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyB5lxyL1KPDyUVuLyhQHkwsQ5WyXqdhe1c",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "activeplay-50972.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "activeplay-50972",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "activeplay-50972.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1011723192459",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:1011723192459:web:85b76879a59793c8412c8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;