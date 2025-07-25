import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCCKrs7F7znTEmkYsOIB17nzUmC_steJhU",
  authDomain: "testexpofirebase-2940f.firebaseapp.com",
  projectId: "testexpofirebase-2940f",
  storageBucket: "testexpofirebase-2940f.appspot.com",
  messagingSenderId: "246699197301",
  appId: "1:246699197301:web:3cdeea35bf6107883a093c",
  measurementId: "G-GHX00N1YQ9"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export { db }