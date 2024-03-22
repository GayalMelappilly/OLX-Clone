import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVS6lqF5mFGbO1P9ECvZImI8IyII-3gXs",
    authDomain: "fir-76e2a.firebaseapp.com",
    projectId: "fir-76e2a",
    storageBucket: "fir-76e2a.appspot.com",
    messagingSenderId: "113851560685",
    appId: "1:113851560685:web:7296eca609b080ee7d92e4",
    measurementId: "G-YRJQEWLZ57"
  };

 export default firebase.initializeApp(firebaseConfig)