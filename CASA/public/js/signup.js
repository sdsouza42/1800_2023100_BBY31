// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQK3647aw-XLuvxojTJFOPFrzpNuZEuX0",
  authDomain: "comp1800-bby31.firebaseapp.com",
  projectId: "comp1800-bby31",
  storageBucket: "comp1800-bby31.appspot.com",
  messagingSenderId: "657744075183",
  appId: "1:657744075183:web:6ea5731184f333e509375a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

//Getting All the object of html

var name = document.getElementById("name")
var email = document.getElementById("email")
var phone = document.getElementById("phone");
var passwords = document.getElementById("password")
var userTypeRegular = document.getElementById("regularUser")
var userTypeTrader = document.getElementById("trader")
var select = document.getElementById("trader_select")

window.signup = function (e) {
  e.preventDefault();
  var userType = "";
  if (userTypeRegular.checked) {
    userType = "regular";
  } else if (userTypeTrader.checked) {
    userType = "trader";
  } else {
    alert("Please select a user type");
    return;
  }
  var obj = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    passwords: passwords.value,
    userType: userType,
    select: select.value,
    bookmarks: [] // Add empty bookmarks array
  }
  createUserWithEmailAndPassword(auth, obj.email, obj.passwords)
  .then(function (success) {
    // Save user data to Firestore
    const userRef = doc(db, "user", success.user.uid);
    setDoc(userRef, obj)
      .then(function (success) {
        alert("Sign up successfully!");
        window.location.href = "../../app/profile.html";
      })
      .catch(function (err) {
        alert("Error saving user data: " + err);
      });
  })
  .catch(function (err) {
    alert("Error creating user: " + err);
  });
};
