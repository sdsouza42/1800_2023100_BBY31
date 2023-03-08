// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

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
  createUserWithEmailAndPassword(auth, obj.email, obj.passwords)
  .then(function(success){
    alert("Sign up Successfully")
    window.location.href = "weatherNotifications.html";
  })
  .catch(function(err){
    alert("error" + err.message)
  })
};
