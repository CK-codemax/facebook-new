// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// import firebase from 'firebase/compat/app'
// import "firebase/firestore";
// import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ1M8XJTLHqM247cZX5tuCBzZR54dWAfo",
  authDomain: "facebook-clone-cfec9.firebaseapp.com",
  projectId: "facebook-clone-cfec9",
  storageBucket: "facebook-clone-cfec9.appspot.com",
  messagingSenderId: "198744941010",
  appId: "1:198744941010:web:0388101bdb02210e73e80b"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]



const db = getFirestore(app)
const storage = getStorage(app)

export {db, storage}