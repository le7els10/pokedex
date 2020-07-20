import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBTTwnevgohNxt-EYQqVdfsT-BX3sTiQ-U",
    authDomain: "pokedex-bcac8.firebaseapp.com",
    databaseURL: "https://pokedex-bcac8.firebaseio.com",
    projectId: "pokedex-bcac8",
    storageBucket: "pokedex-bcac8.appspot.com",
    messagingSenderId: "386223620962",
    appId: "1:386223620962:web:0a799e9b279112a44ce23b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { auth, firebase, db, storage }