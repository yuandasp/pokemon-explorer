// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5dCdhPzHx7t7l9l9epkBrzhcqDZ9cfds",
  authDomain: "pokemon-explorer-69eec.firebaseapp.com",
  projectId: "pokemon-explorer-69eec",
  storageBucket: "pokemon-explorer-69eec.appspot.com",
  messagingSenderId: "693674715658",
  appId: "1:693674715658:web:d9254a771bd242eb004df3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
