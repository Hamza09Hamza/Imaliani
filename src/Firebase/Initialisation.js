import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBpsta-xSmSoCnZaN1Qs-UiiAHtaAoQrQ",
  authDomain: "imaliani.firebaseapp.com",
  projectId: "imaliani",
  storageBucket: "imaliani.appspot.com",
  messagingSenderId: "298029919931",
  appId: "1:298029919931:web:e0b5992335f705bb72c39e",
  measurementId: "G-FGLLCVMQ0C",
  databaseURL:"https://imaliani-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const DB=getFirestore(app)
export const Storage=getStorage(app);
export const RTDB=getDatabase(app)