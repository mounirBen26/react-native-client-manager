// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjV37v93Xb2NuI5lsIMvanopWy9dbiaIA",
  authDomain: "clientmanager-c3d81.firebaseapp.com",
  projectId: "clientmanager-c3d81",
  storageBucket: "clientmanager-c3d81.appspot.com",
  messagingSenderId: "915544916052",
  appId: "1:915544916052:web:ff9f5c2adba008167c6dc1",
  measurementId: "G-GRQWMP5TPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }