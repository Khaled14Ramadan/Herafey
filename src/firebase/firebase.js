import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import * as firebase from "./firebase";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDevwz4n94urVpTu1xJk3IIcDnwczv9iJw",
  authDomain: "herafey-app.firebaseapp.com",
  databaseURL: "https://herafey-app-default-rtdb.firebaseio.com",
  projectId: "herafey-app",
  storageBucket: "herafey-app.appspot.com",
  messagingSenderId: "694813397519",
  appId: "1:694813397519:web:f32b4c844e820846aa097a",
  measurementId: "G-297JZ0TJ0M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default firebase;
