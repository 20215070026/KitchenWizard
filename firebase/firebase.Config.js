// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-olJbLByzBk0yRz_sFRYiG09iLzm3uvQ",
  authDomain: "akilli-alisveris-listesi.firebaseapp.com",
  projectId: "akilli-alisveris-listesi",
  storageBucket: "akilli-alisveris-listesi.appspot.com",
  messagingSenderId: "998275604720",
  appId: "1:998275604720:web:38b59b8e933fd7436ba235"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Servisleri export et
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;