function openForm() {
    document.getElementById("formContainer").style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when form is open
  }
  
  function closeForm() {
    document.getElementById("formContainer").style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling when form is closed
  }
  