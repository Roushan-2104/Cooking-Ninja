import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCcFrUwKTOwZdN-7npWEBzql75hRjcH2-s",
    authDomain: "cooking-ninja-23142.firebaseapp.com",
    projectId: "cooking-ninja-23142",
    storageBucket: "cooking-ninja-23142.appspot.com",
    messagingSenderId: "562006815635",
    appId: "1:562006815635:web:083f0dbb0d68609bb56e66"
  };

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore =  firebase.firestore()

export { projectFirestore }