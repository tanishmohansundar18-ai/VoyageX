let bookingData = {
  type: "",
  name: "",
  destination: "",
  customers: 1,
  age: 0,
  phone: "",
  email: "",
  departureDate: "",
  returnDate: "",
  flight: "",
  seat: "",
  time: "",
  price: 0,
  returnFlight: false,
  returnDetails: {}
};

function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Choose Domestic or International
function chooseType(type) {
  bookingData.type = type;
  const destSelect = document.getElementById("destination");
  destSelect.innerHTML = "";

  let options = [];
  if (type === "domestic") {
    options = ["Mumbai", "Bangalore", "Delhi", "Chennai", "Hyderabad"];
  } else {
    options = ["New York", "London", "Paris", "Dubai", "Singapore", "Tokyo", "Sydney"];
  }

  options.forEach(city => {
    let opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    destSelect.appendChild(opt);
  });

  goToScreen("detailsScreen");
}

// Flight Options
function generateFlights() {
  const flightContainer = document.getElementById("flightOptions");
  flightContainer.innerHTML = `
    <button onclick="selectFlight('VoyageX Air 101')">VoyageX Air 101</button>
    <button onclick="selectFlight('VoyageX Air 202')">VoyageX Air 202</button>
    <button onclick="selectFlight('VoyageX Air 303')">VoyageX Air 303</button>
  `;
}
generateFlights();

function selectFlight(flight) {
  bookingData.flight = flight;
}

function selectSeat(seat) {
  bookingData.seat = seat;
}

function selectTime(time) {
  bookingData.time = time;
}

// Return Flight Choice
function bookReturn(choice) {
  bookingData.returnFlight = choice;
  if (choice) {
    goToScreen("returnFlightScreen");
  } else {
    goToScreen("summaryScreen");
    showSummary();
  }
}

// Return Flight Selections
function selectReturnSeat(seat) {
  bookingData.returnDetails.seat = seat;
}

function selectReturnTime(time) {
  bookingData.returnDetails.time = time;
}

// Show Summary
function showSummary() {
  // collect form values
  bookingData.name = document.getElementById("name").value;
  bookingData.destination = document.getElementById("destination").value;
  bookingData.customers = parseInt(document.getElementById("customers").value);
  bookingData.age = parseInt(document.getElementById("age").value);
  bookingData.phone = document.getElementById("phone").value;
  bookingData.email = document.getElementById("email").value;
  bookingData.departureDate = document.getElementById("departureDate").value;
  bookingData.returnDate = document.getElementById("returnDate").value;

  let basePrice = 20000; // base ticket
  let depDate = new Date(bookingData.departureDate);
  let now = new Date();

  // price logic
  if ((depDate - now) / (1000 * 60 * 60 * 24) < 30) {
    basePrice += 10000;
  }
  if (depDate.getMonth() === 11) { // December
    basePrice += 15000;
  }

  // seat multiplier
  if (bookingData.seat === "Premium Economy") basePrice *= 1.05;
  if (bookingData.seat === "Business") basePrice *= 1.2;

  bookingData.price = basePrice * bookingData.customers;

  let summaryDiv = document.getElementById("summaryDetails");
  summaryDiv.innerHTML = `
    <p><strong>Name:</strong> ${bookingData.name}</p>
    <p><strong>Destination:</strong> ${bookingData.destination}</p>
    <p><strong>Flight:</strong> ${bookingData.flight}</p>
    <p><strong>Seat:</strong> ${bookingData.seat}</p>
    <p><strong>Time:</strong> ${bookingData.time}</p>
    <p><strong>Departure:</strong> ${bookingData.departureDate}</p>
    <p><strong>Total Price:</strong> ₹${bookingData.price}</p>
  `;
}

// Confirmation Screen
function showConfirmation() {
  document.getElementById("confirmationCaption").textContent =
    "Congratulations, " + bookingData.name + "! Your booking is confirmed.";
  document.getElementById("confirmationDetails").innerHTML = `
    <p><strong>Flight:</strong> ${bookingData.flight}</p>
    <p><strong>Destination:</strong> ${bookingData.destination}</p>
    <p><strong>Date:</strong> ${bookingData.departureDate}</p>
    <p><strong>Seat:</strong> ${bookingData.seat}</p>
    <p><strong>Time:</strong> ${bookingData.time}</p>
  `;
}
document.querySelector("#summaryScreen button").addEventListener("click", showConfirmation);

// Boarding Pass with QR
function generateBoardingPass() {
  const pass = `
    <h3>VoyageX Boarding Pass</h3>
    <p>Name: ${bookingData.name}</p>
    <p>Flight: ${bookingData.flight}</p>
    <p>Destination: ${bookingData.destination}</p>
    <p>Seat: ${bookingData.seat}</p>
    <p>Time: ${bookingData.time}</p>
    <p>Date: ${bookingData.departureDate}</p>
  `;
  document.getElementById("boardingPass").innerHTML = pass;

  // Simple QR (fake for now)
  const canvas = document.getElementById("qrcode");
  const ctx = canvas.getContext("2d");
  canvas.width = 120;
  canvas.height = 120;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 120, 120);
  ctx.fillStyle = "white";
  for (let i = 0; i < 120; i += 20) {
    for (let j = 0; j < 120; j += 20) {
      if (Math.random() > 0.5) ctx.fillRect(i, j, 20, 20);
    }
  }
}
document.querySelector("#confirmationScreen button").addEventListener("click", generateBoardingPass);
