// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_jojIu4TiMABIENaC4gWn3MvaP-K5o4k",
  authDomain: "socrates-dashboard.firebaseapp.com",
  projectId: "socrates-dashboard",
  storageBucket: "socrates-dashboard.firebasestorage.app",
  messagingSenderId: "676382914344",
  appId: "1:676382914344:web:b5cd185f6df09dc9b4421d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
