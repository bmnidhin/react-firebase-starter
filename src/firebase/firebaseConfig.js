// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDVVUUk03oVhS2w-Z-pHIMEDl2xgXJgR6k",
  authDomain: "hello-al-bab.firebaseapp.com",
  projectId: "hello-al-bab",
  storageBucket: "hello-al-bab.appspot.com",
  messagingSenderId: "347417592146",
  appId: "1:347417592146:web:bca3d3a8cf689883ad3a8b",
  measurementId: "G-NJFGR3ZD73",
};

// Initialize Firebase
export default firebaseConfig
initializeApp(firebaseConfig);

export const db = getFirestore();

