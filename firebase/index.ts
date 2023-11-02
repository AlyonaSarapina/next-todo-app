import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBxnpLliRPBSUvx7eedYLtppjWgPBs4mk",
  authDomain: "task-app-dcf97.firebaseapp.com",
  projectId: "task-app-dcf97",
  storageBucket: "task-app-dcf97.appspot.com",
  messagingSenderId: "671603136749",
  appId: "1:671603136749:web:e66adb941726fd131014e4",
  measurementId: "G-1TBX2SD9NZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };