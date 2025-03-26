import { initializeApp } from "firebase/app";
import { signInWithRedirect, getAuth, getRedirectResult, GoogleAuthProvider,signInWithPopup, signInWithCredential } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import {create} from 'zustand';

const firebaseConfig = {
  apiKey: "AIzaSyBJriy9nfz1tEK4br1DA6n0oCWM7vUQvdA",
  authDomain: "lifeinweeks-c7617.firebaseapp.com",
  projectId: "lifeinweeks-c7617",
  storageBucket: "lifeinweeks-c7617.firebasestorage.app",
  messagingSenderId: "806524814592",
  appId: "1:806524814592:web:c6044d407fb7cc7446dfe5"

};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

type FirebaseStore = {
  app: any;
  user: any;
  authWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  tryToAuth: () => Promise<void>;
  getLiveData: (slug: string) => Promise<string | undefined>;
  setUser: (user: any) => void;
}
export const useFirebaseStore = create<FirebaseStore>((set, get) => ({
  app,
  user: null,
  setUser: (user) => set({ user }),
  authWithGoogle: async () => {
    const result = await signInWithPopup(auth, provider);
    if (!result) throw new Error('No user');
    const credential = GoogleAuthProvider.credentialFromResult(result);
    localStorage.setItem('gcred', JSON.stringify(credential));
    set({ user: result.user });
  },
  signOut: async () => {
    await auth.signOut();
    set({ user: null });
  },
  tryToAuth: async () => {
    try {
      const gcredString = localStorage.getItem('gcred');
      if (!gcredString) return;
      
      const gcred = JSON.parse(gcredString);
      if (!gcred) return;
      
      const credential = GoogleAuthProvider.credential(gcred.idToken, gcred.accessToken);
      const result = await signInWithCredential(auth, credential);
      if (result) {
        set({ user: result.user });
      }
    } catch (e) {
      localStorage.removeItem('gcred');
      console.error(e);
    }
  },
  getLiveData: async (slug) => {
    const docRef = doc(db, "lives", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const liveData = docSnap.get('live');
      return liveData;
    }
  }
}));