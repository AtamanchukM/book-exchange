// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl7KYqO-s0l1VlWVZTZ-YK1zbokYRElgw",
  authDomain: "book-exchange-59942.firebaseapp.com",
  projectId: "book-exchange-59942",
  storageBucket: "book-exchange-59942.firebasestorage.app",
  messagingSenderId: "660800488130",
  appId: "1:660800488130:web:631df150f554f6df6bf15b",
  measurementId: "G-6JWCFXJZMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const usersCollection = collection(db, "users");
export const booksCollection = collection(db, "books");