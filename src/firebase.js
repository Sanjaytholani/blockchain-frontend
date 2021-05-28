import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD8FvmThup2vGwLsAcyhtZE92wCru5F3nM",
  authDomain: "blockchain-app-a8579.firebaseapp.com",
  projectId: "blockchain-app-a8579",
  storageBucket: "blockchain-app-a8579.appspot.com",
  messagingSenderId: "51061411529",
  appId: "1:51061411529:web:412d00b5348c098eb1c718",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
