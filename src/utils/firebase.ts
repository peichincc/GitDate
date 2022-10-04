import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `AIzaSyCWUzuq_-Y83KTKEpicxofIFb7isMyq-sE`,
  authDomain: "gitdate-ec8a6.firebaseapp.com",
  projectId: "gitdate-ec8a6",
  storageBucket: "gitdate-ec8a6.appspot.com",
  messagingSenderId: "879193846506",
  appId: `1:879193846506:web:e433e0479a915cf9b11d93`,
  measurementId: "G-RH7X04NJ9S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
