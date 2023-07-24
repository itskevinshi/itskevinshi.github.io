// Get the button element and add a click event listener
document.getElementById("toggle-button").addEventListener("click", function() {
    // Toggle the alternative-palette class on the body element
    document.body.classList.toggle("alternative-palette");
    resetEye();
  });