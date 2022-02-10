// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBN0yRiLMXv3qDpQT3K_Je4f3YyX3PbwIU",
  authDomain: "react-third-50786.firebaseapp.com",
  projectId: "react-third-50786",
  storageBucket: "react-third-50786.appspot.com",
  messagingSenderId: "294143939170",
  appId: "1:294143939170:web:c7d86dd82c8073b2e9f73b",
  measurementId: "G-YVFCDZC5MB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp)

export { auth, apiKey, db, storage};
