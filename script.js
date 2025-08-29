let bookingData = {};

// Go to screen
function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Travel choice
function chooseTravel(type) {
  bookingData.travelType = type;
  // Populate airlines
  let airlines = (type === "international")
    ? ["Emirates", "Singapore Airlines", "Vistara", "Qatar Airways"]
    : ["IndiGo", "Air India", "Akasa Air", "Vistara"];

  let select = document.getElementById("airline");
  select.innerHTML = airlines.map(a => `<option>${a}</option>`).join("");

  let returnSelect = document.getElementById("return-airline");
  returnSelect.innerHTML = airlines.map(a => `<option>${a}</option>`).join("");

  goToScreen("details-screen");
}

// Handle details form
document.getElementById("details-form").addEventListener("submit", e => {
  e.preventDefault();
  bookingData.name = document.getElementById("name").value;
  bookingData.age = document.getElementById("age").value;
  bookingData.destination = document.getElementById("destination").value;
  bookingData.phone = document.getElementById("phone").value;
  bookingData.email = document.getElementById("email").value;
  bookingData.departureDate = document.getElementById("departure-date").value;
  bookingData.returnDate = document.getElementById("return-date").value;

  goToScreen("flight-screen");
});

// Finish first flight selection
function finishFlightSelection() {
  bookingData.airline = document.getElementById("airline").value;
  bookingData.seatType = document.getElementById("seat-type").value;
  bookingData.flightTime = document.getElementById("flight-time").value;

  goToScreen("return-question-screen");
}

// Return choice
function handleReturnChoice(choice) {
  bookingData.hasReturn = choice;
  if (choice) {
    goToScreen("return-flight-screen");
  } else {
    showSummary();
  }
}

// Return flight selection
function finishReturnFlightSelection() {
  bookingData.returnAirline = document.getElementById("return-airline").value;
  bookingData.returnSeatType = document.getElementById("return-seat-type").value;
  bookingData.returnFlightTime = document.getElementById("return-flight-time").value;
  bookingData.returnFlightDate = document.getElementById("return-flight-date").value;
  showSummary();
}

// Summary
function showSummary() {
  let basePrice = bookingData.travelType === "international" ? 60000 : 30000;
  let discount = bookingData.travelType === "international" ? 0.35 : 0.25;

  let departureDate = new Date(bookingData.departureDate);
  let today = new Date();
  let price = basePrice;

  // Less than 1 month → +10k
  let oneMonthLater = new Date();
  oneMonthLater.setMonth(today.getMonth() + 1);
  if (departureDate < oneMonthLater) price += 10000;

  // Christmas
  if (departureDate.getMonth() === 11 && departureDate.getDate() >= 20) price += 15000;

  // Seat type adjustment
  if (bookingData.seatType === "premium") price *= 1.05;
  if (bookingData.seatType === "business") price *= 1.20;

  bookingData.price = price - (price * discount);

  let summary = `
    Name: ${bookingData.name}<br>
    Destination: ${bookingData.destination}<br>
    Airline: ${bookingData.airline}<br>
    Seat: ${bookingData.seatType}<br>
    Flight Time: ${bookingData.flightTime}<br>
    Departure: ${bookingData.departureDate}<br>
    Price: ₹${bookingData.price.toFixed(2)}<br>
  `;

  if (bookingData.hasReturn) {
    summary += `
      Return Airline: ${bookingData.returnAirline}<br>
      Seat: ${bookingData.returnSeatType}<br>
      Flight Time: ${bookingData.returnFlightTime}<br>
      Return Date: ${bookingData.returnFlightDate}<br>
    `;
  }

  document.getElementById("summary-details").innerHTML = summary;
  goToScreen("summary-screen");
}

// Confirmation
function goToConfirmation() {
  document.getElementById("confirmation-caption").innerText =
    bookingData.travelType === "international"
      ? "Beyond borders, beyond ordinary"
      : "Where every journey becomes a story";
  goToScreen("confirmation-screen");
}

// Boarding pass
function goToBoardingPass() {
  let details = `
    Passenger: ${bookingData.name}<br>
    Destination: ${bookingData.destination}<br>
    Airline: ${bookingData.airline}<br>
    Seat: ${bookingData.seatType}<br>
    Departure: ${bookingData.departureDate}<br>
  `;
  document.getElementById("boarding-pass-details").innerHTML = details;

  let qr = new QRCode(document.getElementById("qrcode"), {
    text: JSON.stringify(bookingData),
    width: 128,
    height: 128
  });

  goToScreen("boarding-pass-screen");
}
