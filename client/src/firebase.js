// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "homehive-8a2f6.firebaseapp.com",
  projectId: "homehive-8a2f6",
  storageBucket: "homehive-8a2f6.appspot.com",
  messagingSenderId: "264424157154",
  appId: "1:264424157154:web:cc6449a45bc25265db93bb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
