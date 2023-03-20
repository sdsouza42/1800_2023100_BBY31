// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth();

// Getting All the objects of HTML
var email = document.getElementById("email");
var password = document.getElementById("password");

window.login = function(e){
    e.preventDefault();
    var obj = {
        email: email.value,
        password: password.value
    };

    signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function(userCredential){
        // Access user info using userCredential
        console.log(userCredential.user.uid);
        alert("Logged in successfully");
        window.location.href = "alerts.html";
    
    })
    .catch(function(err){
        alert("Login error: " + err.message);
    });
};