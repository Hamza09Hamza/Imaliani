import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBBpsta-xSmSoCnZaN1Qs-UiiAHtaAoQrQ",
  authDomain: "imaliani.firebaseapp.com",
  projectId: "imaliani",
  storageBucket: "imaliani.appspot.com",
  messagingSenderId: "298029919931",
  appId: "1:298029919931:web:e0b5992335f705bb72c39e",
  measurementId: "G-FGLLCVMQ0C"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const DB=getFirestore(app)