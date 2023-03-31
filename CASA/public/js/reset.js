// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCQK3647aw-XLuvxojTJFOPFrzpNuZEuX0",
    authDomain: "comp1800-bby31.firebaseapp.com",
    projectId: "comp1800-bby31",
    storageBucket: "comp1800-bby31.appspot.com",
    messagingSenderId: "657744075183",
    appId: "1:657744075183:web:6ea5731184f333e509375a"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  const resetButton = document.querySelector('#reset-button');
  
  resetButton.addEventListener('click', () => {
    const email = document.querySelector('#typeEmail').value;
  
    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent, Please Check Your Email.');
        window.location.href = '/html/login.html';
      })
      .catch((error) => {
        alert(error.message);
      });
  });
  