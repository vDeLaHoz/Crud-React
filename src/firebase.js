// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgYH2oMUERyi97iQ3fVs86JE7fF4mjPXM",
  authDomain: "crud-raect.firebaseapp.com",
  projectId: "crud-raect",
  storageBucket: "crud-raect.appspot.com",
  messagingSenderId: "307455154369",
  appId: "1:307455154369:web:0d135b688af1eb8ec99c40"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}

