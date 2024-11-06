import { create } from 'zustand';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Set up auth state listener
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
    console.log('Auth state changed:', user ? user.email : 'No user');
  });

  return {
    user: null,
    loading: true,
    error: null,

    signIn: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Sign in successful:', userCredential.user.email);
      } catch (error: any) {
        console.error('Sign in error:', error);
        const errorMessage = error.code === 'auth/configuration-not-found' 
          ? 'Authentication not properly configured. Please check Firebase setup.'
          : error.message || 'Failed to sign in';
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ loading: false });
      }
    },

    signUp: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Sign up successful:', userCredential.user.email);
        
        // Create user profile in Firestore
        const userDoc = doc(db, 'users', userCredential.user.uid);
        const userData = {
          email: userCredential.user.email,
          createdAt: new Date().toISOString(),
          displayName: email.split('@')[0],
          followers: 0,
          following: 0,
          tracks: 0,
          photoURL: null,
          bio: ''
        };
        
        await setDoc(userDoc, userData);
        console.log('User profile created in Firestore');
        
      } catch (error: any) {
        console.error('Sign up error:', error);
        const errorMessage = error.code === 'auth/configuration-not-found'
          ? 'Authentication not properly configured. Please check Firebase setup.'
          : error.message || 'Failed to sign up';
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ loading: false });
      }
    },

    signOut: async () => {
      try {
        set({ loading: true, error: null });
        await firebaseSignOut(auth);
        set({ user: null });
        console.log('Sign out successful');
      } catch (error: any) {
        console.error('Sign out error:', error);
        const errorMessage = error.message || 'Failed to sign out';
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ loading: false });
      }
    },

    clearError: () => set({ error: null })
  };
});