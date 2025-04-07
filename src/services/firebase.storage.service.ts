import { initializeApp } from "firebase/app";
import { signInWithRedirect, getAuth, getRedirectResult, GoogleAuthProvider,signInWithPopup, signInWithCredential } from "firebase/auth";
import { serverTimestamp, collection, getFirestore, getDoc, doc, setDoc, addDoc, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import {create} from 'zustand';
import { TSharedLifeRange } from "./state.zus";

const firebaseConfig = {
  apiKey: "AIzaSyBJriy9nfz1tEK4br1DA6n0oCWM7vUQvdA",
  authDomain: "lifeinweeks-c7617.firebaseapp.com",
  projectId: "lifeinweeks-c7617",
  storageBucket: "lifeinweeks-c7617.firebasestorage.app",
  messagingSenderId: "806524814592",
  appId: "1:806524814592:web:c6044d407fb7cc7446dfe5"

};

export type TSharedLink = {
  linkId: string;
  ownerUid: string;
  startWeek: Date;
  endWeek: Date;
  createdAt: any;
  slug: string;
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
  saveLife: (life: any, slug: string) => Promise<void>;
  createSharingLink: (startWeek: Date, endWeek: Date, slug: string) => Promise<string>; // New
  getSharingLinkData: (linkId: string) => Promise<TSharedLink | null>; // New
  acceptSharingLink: (linkId: string, managerUid: string) => Promise<void>; // New
  revokeSharingLink: (linkId: string, managerUid: string, slug: string) => Promise<void>; // New
  getSharedLifeRanges: (uid: string) => Promise<TSharedLifeRange[]>; // New
  getLife: (slug: string) => Promise<any>; // New
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
      return docSnap.get('life');
    }
  },
  saveLife: async (life, slug) => {
    const {uid} = auth.currentUser;
    if (!slug || !uid) return;
    const docRef = doc(collection(db, "lives"), slug);
    await setDoc(docRef, { updatedAt: serverTimestamp(), life, slug, uid });
  },
  createSharingLink: async (startWeek, endWeek, slug) => {
    const { uid } = auth.currentUser;
    if (!uid) throw new Error("User not logged in");
    const linkId = Math.random().toString(36).substring(2, 15);
    const docRef = doc(collection(db, "sharedLinks"), linkId);
    await setDoc(docRef, {
      linkId,
      ownerUid: uid,
      startWeek,
      endWeek,
      createdAt: serverTimestamp(),
      slug,
    });
    return linkId;
  },
  getSharingLinkData: async (linkId) => {
    const docRef = doc(db, "sharedLinks", linkId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as TSharedLink;
    }
    return null;
  },
  acceptSharingLink: async (linkId, managerUid) => {
    const linkData = await get().getSharingLinkData(linkId);
    if (!linkData) throw new Error("Invalid link");
    const { ownerUid, startWeek, endWeek, slug } = linkData;
    const docRef = doc(db, "lives", slug);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Life not found");
    const lifeData = docSnap.data();
    const sharedWith = lifeData.sharedWith || [];
    sharedWith.push({ managerUid, startWeek, endWeek, accepted: true, linkId, ownerUid, slug });
    await updateDoc(docRef, { sharedWith });
    await deleteDoc(doc(db, "sharedLinks", linkId));
  },
  revokeSharingLink: async (linkId, managerUid, slug) => {
    const docRef = doc(db, "lives", slug);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Life not found");
    const lifeData = docSnap.data();
    const sharedWith = lifeData.sharedWith || [];
    const updatedSharedWith = sharedWith.filter((item: any) => item.linkId !== linkId);
    await updateDoc(docRef, { sharedWith: updatedSharedWith });
    await deleteDoc(doc(db, "sharedLinks", linkId));
  },
  getSharedLifeRanges: async (uid) => {
    const q = query(collection(db, "lives"), where("sharedWith", "array-contains", { managerUid: uid }));
    const querySnapshot = await getDocs(q);
    const sharedRanges: TSharedLifeRange[] = [];
    querySnapshot.forEach((doc) => {
      const lifeData = doc.data();
      const sharedWith = lifeData.sharedWith || [];
      sharedWith.forEach((item: any) => {
        if (item.managerUid === uid) {
          sharedRanges.push({
            managerUid: item.managerUid,
            startWeek: item.startWeek,
            endWeek: item.endWeek,
            accepted: item.accepted,
            linkId: item.linkId,
            ownerUid: item.ownerUid,
            slug: item.slug,
          });
        }
      });
    });
    return sharedRanges;
  },
  getLife: async (slug) => {
    const docRef = doc(db, "lives", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  },
}));
