import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDxwIkM6BawHtBlfVcHC4xsYcbw4itGHRc",
  authDomain: "netflix-utube-16599.firebaseapp.com",
  projectId: "netflix-utube-16599",
  storageBucket: "netflix-utube-16599.appspot.com",
  messagingSenderId: "964022208460",
  appId: "1:964022208460:web:40515961a4765f72f8bf69",
  measurementId: "G-RHF0NDWW53",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
