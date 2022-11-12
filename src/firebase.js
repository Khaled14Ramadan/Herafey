
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDevwz4n94urVpTu1xJk3IIcDnwczv9iJw",
  authDomain: "herafey-app.firebaseapp.com",
  databaseURL: "https://herafey-app-default-rtdb.firebaseio.com",
  projectId: "herafey-app",
  storageBucket: "herafey-app.appspot.com",
  messagingSenderId: "694813397519",
  appId: "1:694813397519:web:f32b4c844e820846aa097a",
  measurementId: "G-297JZ0TJ0M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();

export const colPost = collection(db, 'Posts');
export const coluser = collection(db, 'users');
