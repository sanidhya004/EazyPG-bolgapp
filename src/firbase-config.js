// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GithubAuthProvider, GoogleAuthProvider} from "@firebase/auth";
import { Firestore, getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZyvI6BAzbqi7WdcFgnxhpg0syr_iIpoI",
  authDomain: "blogify-9d8d5.firebaseapp.com",
  projectId: "blogify-9d8d5",
  storageBucket: "blogify-9d8d5.appspot.com",
  messagingSenderId: "596387058415",
  appId: "1:596387058415:web:37bac8d78f8959ee7a011a",
  measurementId: "G-NFQEVQH2SY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
const analytics = getAnalytics(app);
export const auth= getAuth (app);
export const provider= new GoogleAuthProvider();