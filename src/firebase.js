import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyAym5uelz3-nKtJHR9ZmAkcpvYInb5l7vU",
    authDomain: "likemypost-a96b1.firebaseapp.com",
    projectId: "likemypost-a96b1",
    storageBucket: "likemypost-a96b1.appspot.com",
    messagingSenderId: "279340291729",
    appId: "1:279340291729:web:97fb4777537928cbe5d130"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

