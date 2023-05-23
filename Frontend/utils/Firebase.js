// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7JF1Z4WtaoAff1I3S_9mLy02DnjUMheE",
  authDomain: "medecine-519bd.firebaseapp.com",
  projectId: "medecine-519bd",
  storageBucket: "medecine-519bd.appspot.com",
  messagingSenderId: "1057973192281",
  appId: "1:1057973192281:web:d4f157e5a31d5d88275348",
  measurementId: "G-S69H6Q5RX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);