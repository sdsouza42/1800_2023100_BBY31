function setNavProfilePicFromLocalStorage() {
    const navProfilePic = document.getElementById("navProfilePic");
    const storedUrl = localStorage.getItem("navProfilePic");
  
    if (storedUrl) {
      navProfilePic.src = storedUrl;
    }
  }
  
  