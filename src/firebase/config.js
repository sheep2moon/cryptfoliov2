import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: 'AIzaSyC8hVdmarKN4Pa3_BfOm-1NFVDbynutGp8',
  authDomain: 'mesznoheaven.firebaseapp.com',
  projectId: 'mesznoheaven',
  storageBucket: 'mesznoheaven.appspot.com',
  messagingSenderId: '298710569170',
  appId: '1:298710569170:web:2336d198b1f282f5969d0b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); //Jeżeli juz zainicjalizowana
}

const fireStorage = firebase.storage();
const fireStore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { fireStorage, fireStore, timestamp, auth };
