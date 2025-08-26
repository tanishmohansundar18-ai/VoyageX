let travelType = "";

function chooseType(type) {
  travelType = type;
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");

  const formTitle = document.getElementById("formTitle");
  const destinationSelect = document.getElementById("destinationSelect");
  destinationSelect.innerHTML = "";

  if (type === "international") {
    formTitle.textContent = "Beyond Borders, Beyond Ordinaries";
    ["London", "Paris", "Switzerland", "New York", "Sydney", "Egypt", "Kenya", "Singapore", "Dubai", "Maldives", "Japan"]
      .forEach(dest => {
        const option = document.createElement("option");
        option.textContent = dest;
        destinationSelect.appendChild(option);
      });
  } else {
    formTitle.textContent = "Your next adventure starts here";
    ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Thiruvananthapuram", "Kolkata", "Srinagar"]
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
  const passengers = document.getElementById("passengers").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const destination = document.getElementById("destinationSelect").value;
  const airline = document.getElementById("airline").value;
  const days = document.getElementById("days").value;
  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;

  // Pricing logic
  let pricePerDay = travelType === "international" ? 60000 : 30000;
  let discountRate = travelType === "international" ? 0.3 : 0.25;

  let totalPrice = pricePerDay * passengers * days;
  let discount = totalPrice * discountRate;
  let finalPrice = totalPrice - discount;

  document.getElementById("priceField").value = "₹ " + totalPrice;
  document.getElementById("discountField").value = "₹ " + discount;

  // Save to confirmation step
  document.getElementById("confirmationDetails").innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Passengers:</strong> ${passengers}</p>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Airline:</strong> ${airline}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Departure:</strong> ${departure}</p>
    <p><strong>Arrival:</strong> ${arrival}</p>
    <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    <p><strong>Discount:</strong> ₹${discount}</p>
    <p><strong>Final Amount:</strong> ₹${finalPrice}</p>
  `;

  document.getElementById("step2").classList.remove("active");
  document.getElementById("step3").classList.add("active");

  // Save values globally for Step 4
  window.bookingData = { name, age, passengers, contact, email, destination, airline, days, departure, arrival, totalPrice, discount, finalPrice };
});

function finalizeBooking() {
  const data = window.bookingData;

  document.getElementById("step3").classList.remove("active");
  document.getElementById("step4").classList.add("active");

  document.getElementById("caption").textContent =
    travelType === "international" ? "Beyond Borders, Beyond Ordinaries" : "Your next adventure starts here";

  document.getElementById("outName").textContent = data.name;
  document.getElementById("outAge").textContent = data.age;
  document.getElementById("outPassengers").textContent = data.passengers;
  document.getElementById("outContact").textContent = data.contact;
  document.getElementById("outEmail").textContent = data.email;
  document.getElementById("outDestination").textContent = data.destination;
  document.getElementById("outAirline").textContent = data.airline;
  document.getElementById("outDays").textContent = data.days;
  document.getElementById("outDeparture").textContent = data.departure;
  document.getElementById("outArrival").textContent = data.arrival;
  document.getElementById("outPrice").textContent = "₹ " + data.totalPrice;
  document.getElementById("outDiscount").textContent = "₹ " + data.discount;
  document.getElementById("outFinal").textContent = "₹ " + data.finalPrice;

  // Generate QR + link
  document.getElementById("qrCode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VoyageX%20Booking%20Confirmed";
  document.getElementById("confirmationLink").href =
    "https://voyagex-booking.com/confirmation"; // Replace with your real link
}
