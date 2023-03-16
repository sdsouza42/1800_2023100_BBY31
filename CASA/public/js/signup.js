// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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

var name =document.getElementById("name")
var email =document.getElementById("email")
var phone = document.getElementById("phone");
var passwords =document.getElementById("password")
var radio1 = document.getElementById("radio1")
var radio2 = document.getElementById("radio2")
var select = document.getElementById("trader_select")

window.signup = function(e){
  e.preventDefault();
  var obj = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    passwords: passwords.value,
    radio1: radio1.value,
    radio2: radio2.value,
    select: select.value
  }
  createUserWithEmailAndPassword(auth, obj.email, obj.phone, obj.passwords, obj.radio1, obj.radio2, obj.select)
   .then(function(success){
    // Save user data to Firestore
    addDoc(collection(db, "user"), obj)
    .then(function(success) {
      alert("Sign up successfully!");
      window.location.href = "weatherNotifications.html";
    })
    .catch(function(err) {
      alert("Error saving user data: " + err);
    });
  })
  .catch(function(err){
    alert("Error creating user: " + err);
  })
};
