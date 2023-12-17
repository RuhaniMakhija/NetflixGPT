// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCibJ3ubKjyfxPKm8_blWRtxLK9AUE4iaU",
  authDomain: "netflixgpt-ca3bd.firebaseapp.com",
  projectId: "netflixgpt-ca3bd",
  storageBucket: "netflixgpt-ca3bd.appspot.com",
  messagingSenderId: "998079561050",
  appId: "1:998079561050:web:f87954f8e0a80faa8d4763",
  measurementId: "G-20GKN8HLW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();