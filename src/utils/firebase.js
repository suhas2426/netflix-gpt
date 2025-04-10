// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZPJmlmK0L-8m32Lyd8AS62ueIK6VQWOY",
  authDomain: "netflixgpt-51156.firebaseapp.com",
  projectId: "netflixgpt-51156",
  storageBucket: "netflixgpt-51156.firebasestorage.app",
  messagingSenderId: "588202906201",
  appId: "1:588202906201:web:79ac2e127b8cd868f95748",
  measurementId: "G-VPZ63LQRVK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
