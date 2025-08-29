let bookingData = {};

function goToScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function chooseTravel(type) {
  bookingData.travelType = type;
  let airlines = (type === "international")
    ? ["Emirates", "Qatar Airways", "Singapore Airlines", "Vistara"]
    : ["IndiGo", "Air India", "Akasa Air", "Vistara"];

  document.getElementById("airline").innerHTML =
    airlines.map(a => `<option>${a}</option>`).join("");

  document.getElementById("return-airline").innerHTML =
    airlines.map(a => `<option>${a}</option>`).join("");

  goToScreen("details-screen");
}

document.getElementById("details-form").addEventListener("submit", e => {
  e.preventDefault();
  bookingData.name = document.getElementById("name").value;
  bookingData.age = document.getElementById("age").value;
  bookingData.destination = document.getElementById("destination").value;
  bookingData.phone = document.getElementById("phone").value;
  bookingData.email = document.getElementById("email").value;
  bookingData.departureDate = document.getElementById("departure-date").value;
  goToScreen("flight-screen");
});

function finishFlightSelection() {
  bookingData.airline = document.getElementById("airline").value;
  bookingData.seatType = document.getElementById("seat-type").value;
  bookingData.flightTime = document.getElementById("flight-time").value;
  goToScreen("return-question-screen");
}

function handleReturnChoice(choice) {
  bookingData.hasReturn = choice;
  if (choice) goToScreen("return-flight-screen");
  else showSummary();
}

function finishReturnFlightSelection() {
  bookingData.returnAirline = document.getElementById("return-airline").value;
  bookingData.returnSeatType = document.getElementById("return-seat-type").value;
  bookingData.returnFlightTime = document.getElementById("return-flight-time").value;
  bookingData.returnDate = document.getElementById("return-date").value;
  showSummary();
}

function showSummary() {
  let basePrice = bookingData.travelType === "international" ? 60000 : 30000;
  let discount = bookingData.travelType === "international" ? 0.35 : 0.25;
  let departureDate = new Date(bookingData.departureDate);
  let today = new Date();
  let price = basePrice;

  // Adjustments
  let oneMonthLater = new Date(); oneMonthLater.setMonth(today.getMonth() + 1);
  if (departureDate < oneMonthLater) price += 10000;
  if (departureDate.getMonth() === 11 && departureDate.getDate() >= 20) price += 15000;
  if (bookingData.seatType === "premium") price *= 1.05;
  if (bookingData.seatType === "business") price *= 1.20;

  bookingData.price = price - (price * discount);

  let summary = `
    Name: ${bookingData.name}<br>
    Destination: ${bookingData.destination}<br>
    Airline: ${bookingData.airline}<br>
    Seat: ${bookingData.seatType}<br>
    Time: ${bookingData.flightTime}<br>
    Departure: ${bookingData.departureDate}<br>
    Price: ₹${bookingData.price.toFixed(2)}<br>
  `;
  if (bookingData.hasReturn) {
    summary += `
      Return Airline: ${bookingData.returnAirline}<br>
      Seat: ${bookingData.returnSeatType}<br>
      Time: ${bookingData.returnFlightTime}<br>
      Return Date: ${bookingData.returnDate}<br>
    `;
  }
  document.getElementById("summary-details").innerHTML = summary;
  goToScreen("summary-screen");
}

function goToConfirmation() {
  document.getElementById("confirmation-caption").innerText =
    bookingData.travelType === "international"
      ? "Beyond borders, beyond ordinary"
      : "Where every journey becomes a story";
  goToScreen("confirmation-screen");
}

function goToBoardingPass() {
  let details = `
    Passenger: ${bookingData.name}<br>
    Destination: ${bookingData.destination}<br>
    Airline: ${bookingData.airline}<br>
    Seat: ${bookingData.seatType}<br>
    Departure: ${bookingData.departureDate}<br>
  `;
  document.getElementById("boarding-pass-details").innerHTML = details;
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: JSON.stringify(bookingData),
    width: 128, height: 128
  });
  goToScreen("boarding-pass-screen");
}

