import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSWkqKG_dVL3BzKVYw_hwfMIGrZLMylrs",
  authDomain: "whatsapp-ana-rita.firebaseapp.com",
  projectId: "whatsapp-ana-rita",
  storageBucket: "whatsapp-ana-rita.appspot.com",
  messagingSenderId: "650704718239",
  appId: "1:650704718239:web:9e75bccb6b76b3b8b115aa"
};


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };