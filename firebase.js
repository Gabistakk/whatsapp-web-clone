import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBP8NlzIcPqxoFYr_IQFZ7vgoccukxwNnI",
    authDomain: "whatsapp-2-5c778.firebaseapp.com",
    projectId: "whatsapp-2-5c778",
    storageBucket: "whatsapp-2-5c778.appspot.com",
    messagingSenderId: "298403092836",
    appId: "1:298403092836:web:50a1c92afca9e3a7118271"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };