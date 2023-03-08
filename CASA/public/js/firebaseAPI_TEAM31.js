//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCQK3647aw-XLuvxojTJFOPFrzpNuZEuX0",
    authDomain: "comp1800-bby31.firebaseapp.com",
    databaseURL: "https://comp1800-bby31-default-rtdb.firebaseio.com",
    projectId: "comp1800-bby31",
    storageBucket: "comp1800-bby31.appspot.com",
    messagingSenderId: "657744075183",
    appId: "1:657744075183:web:6ea5731184f333e509375a"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
