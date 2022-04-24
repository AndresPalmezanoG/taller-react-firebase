import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBye0WWw3RY_Oq-zf1gWDbmfLbwYCMIcaA",
  authDomain: "taller-react-firebase-84b47.firebaseapp.com",
  databaseURL: "https://taller-react-firebase-84b47-default-rtdb.firebaseio.com",
  projectId: "taller-react-firebase-84b47",
  storageBucket: "taller-react-firebase-84b47.appspot.com",
  messagingSenderId: "198558671182",
  appId: "1:198558671182:web:516aadfa5f0c4c3628fe1f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);