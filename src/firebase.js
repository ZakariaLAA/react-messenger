import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //firebase api key
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

const db = firebaseApp.firestore();

export default db;
