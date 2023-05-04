// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjc4sNInRCLwXqGOio1VRwomUu5Ll-iwM",
  authDomain: "my-dream-gym.firebaseapp.com",
  projectId: "my-dream-gym",
  storageBucket: "my-dream-gym.appspot.com",
  messagingSenderId: "662301823236",
  appId: "1:662301823236:web:0414fb2ce04b6fc7940051"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);