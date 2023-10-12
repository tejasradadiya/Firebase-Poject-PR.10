// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf2UzlElN9hTIMYc7FT-ZaP8q1iDLZxOI",
  authDomain: "fir-project-d72a7.firebaseapp.com",
  projectId: "fir-project-d72a7",
  storageBucket: "fir-project-d72a7.appspot.com",
  messagingSenderId: "1017206844962",
  appId: "1:1017206844962:web:bb676dd20757b70f45e47b",
  measurementId: "G-C9N150JLG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 