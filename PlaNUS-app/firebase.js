import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNZo3DbaxRkhzf8CrXJgROv5BihM_tlgw",
  authDomain: "planus-97ed0.firebaseapp.com",
  projectId: "planus-97ed0",
  storageBucket: "planus-97ed0.appspot.com",
  messagingSenderId: "817926806262",
  appId: "1:817926806262:web:93cb953758d0c05a862ad7"
};

// Initialize Firebase
let app; 
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    // if app has already been initialized 
    app = getApp(); 
}

const auth = getAuth(app); 

export { auth };