import firebase from "firebase";
import store from "./store";

const firebaseConfig = {
    apiKey: "AIzaSyC8FLGJNqsEMOwO30ndAQ9qJOFSYfgqVzw",
    authDomain: "is4302-app.firebaseapp.com",
    projectId: "is4302-app",
    storageBucket: "is4302-app.appspot.com",
    messagingSenderId: "455622780080",
    appId: "1:455622780080:web:0bd1c184210a5c70634775",
    measurementId: "G-1F2J8YSJXJ"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

var database = firebase.firestore();

export default database;