// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBncjcoG5358hQfKAV71IuiCnpp0vmRkLU",
    authDomain: "contact-book-3390a.firebaseapp.com",
    projectId: "contact-book-3390a",
    storageBucket: "contact-book-3390a.appspot.com",
    messagingSenderId: "396112103345",
    appId: "1:396112103345:web:0fa1577e4a663bd1899f90",
    measurementId: "G-06Y3YPSWXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;