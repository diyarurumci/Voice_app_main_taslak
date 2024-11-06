import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCODlm6SgZjKR0zs5URJ-wWPBkThjU3V_k",
  authDomain: "voice-app-1d449.firebaseapp.com",
  projectId: "voice-app-1d449",
  storageBucket: "voice-app-1d449.firebasestorage.app",
  messagingSenderId: "1078366848557",
  appId: "1:1078366848557:web:a3657de5849fd07f421aa4",
  measurementId: "G-QMSWWHKSGK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized with config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  });
}