import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvArpdhjGllOufxyKjRmNVS3UaYKcOXWs",
  authDomain: "rajnish-sinh.firebaseapp.com",
  projectId: "rajnish-sinh",
  storageBucket: "rajnish-sinh.firebasestorage.app",
  messagingSenderId: "550451819789",
  appId: "1:550451819789:web:968962bbf6459a6e046c44",
  measurementId: "G-G69KY598D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
export { analytics };
