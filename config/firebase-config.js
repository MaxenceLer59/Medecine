import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7JF1Z4WtaoAff1I3S_9mLy02DnjUMheE",
  authDomain: "medecine-519bd.firebaseapp.com",
  projectId: "medecine-519bd",
  storageBucket: "medecine-519bd.appspot.com",
  messagingSenderId: "1057973192281",
  appId: "1:1057973192281:web:d4f157e5a31d5d88275348",
  measurementId: "G-S69H6Q5RX7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

