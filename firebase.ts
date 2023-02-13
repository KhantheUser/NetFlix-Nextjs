import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABlzwo2VVvRNYJL016zwlDOkI_9muQyUc",
  authDomain: "netflix-clone-c25ef.firebaseapp.com",
  projectId: "netflix-clone-c25ef",
  storageBucket: "netflix-clone-c25ef.appspot.com",
  messagingSenderId: "23716776892",
  appId: "1:23716776892:web:a69cbb069f8152a31df9b9",
  measurementId: "G-GP8T8572XM",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
