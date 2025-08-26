let travelType = "";

// Button bindings
document.getElementById("btnInternational").addEventListener("click", () => chooseType("international"));
document.getElementById("btnDomestic").addEventListener("click", () => chooseType("domestic"));
document.getElementById("btnConfirm").addEventListener("click", finalizeBooking);

function chooseType(type) {
  travelType = type;
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");

  const formTitle = document.getElementById("formTitle");
  const destinationSelect = document.getElementById("destinationSelect");
  destinationSelect.innerHTML = "";

  if (type === "international") {
    formTitle.textContent = "Beyond Borders, Beyond Ordinaries";
    ["London","Paris","Switzerland","New York","Sydney","Egypt","Kenya","Singapore","Dubai","Maldives","Japan"]
      .forEach(dest => {
        const option = document.createElement("option");
        option.textContent = dest;
        destinationSelect.appendChild(option);
      });
  } else {
    formTitle.textContent = "Your next adventure starts here";
    ["Bangalore","Mumbai","Delhi","Chennai","Hyderabad","Thiruvananthapuram","Kolkata","Srinagar"]
      .forEach(dest => {
        const option = document.createElement("option");
        option.textContent = dest;
        destinationSelect.appendChild(option);
      });
  }
}

document.getElementById("bookingForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const passengers = document.getElementById("passengers
