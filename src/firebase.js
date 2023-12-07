import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "superchat-kaengee.firebaseapp.com",
  projectId: "superchat-kaengee",
  storageBucket: "superchat-kaengee.appspot.com",
  messagingSenderId: "1052365721770",
  appId: "1:1052365721770:web:582fb48e2945c0b87f80d3",
};

// 초기화
const app = initializeApp(firebaseConfig);

// firebase 인증
const auth = getAuth();
// 구글인증
const googleAuth = new GoogleAuthProvider();

// firestore db
const db = getFirestore();

export { googleAuth, db, auth };
