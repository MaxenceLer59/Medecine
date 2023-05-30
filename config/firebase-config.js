import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7JF1Z4WtaoAff1I3S_9mLy02DnjUMheE",
  authDomain: "medecine-519bd.firebaseapp.com",
  databaseURL: "https://medecine-519bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "medecine-519bd",
  storageBucket: "medecine-519bd.appspot.com",
  messagingSenderId: "1057973192281",
  appId: "1:1057973192281:web:d4f157e5a31d5d88275348",
  measurementId: "G-S69H6Q5RX7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);
// Initialize Cloud Firestore and get a reference to the service
const db_firestore = getFirestore(app);

// export default db;
export { auth, db, db_firestore };

