let bookingType = ""; // international or domestic
let bookingData = {};

function showStep(stepId) {
  document.querySelectorAll(".step").forEach(step => step.classList.remove("active"));
  document.getElementById(stepId).classList.add("active");
}

// Step 1 buttons
document.getElementById("btnInternational").addEventListener("click", () => {
  chooseType("international");
});

document.getElementById("btnDomestic").addEventListener("click", () => {
  chooseType("domestic");
});

// Choose typ
