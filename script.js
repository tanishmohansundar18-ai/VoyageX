let booking = {
  type: "",
  destination: "",
  name: "",
  email: "",
  phone: "",
  customers: 0,
  age: 0,
  departure: "",
  return: "",
  flight: "",
  price: 0
};

const domesticCities = ["Mumbai", "Bangalore", "Chennai", "Delhi", "Hyderabad"];
const internationalCities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Maldives", "Sydney"];
const domesticFlights = ["IndiGo", "Air India", "Akasa Air"];
const internationalFlights = ["Emirates", "Singapore Airlines", "Vistara"];

function goToScreen(n) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(`screen${n}`).classList.add("active");
}

function chooseType(type) {
  booking.type = type;
  const destDiv = document.getElementById("destinations");
  destDiv.innerHTML = "";
  let cities = type === "domestic" ? domesticCities : internationalCities;
  cities.forEach(city => {
    let btn = document.createElement("button");
    btn.textContent = city;
    btn.onclick = () => chooseDestination(city);
    destDiv.appendChild(btn);
  });
  goToScreen(3);
}

function chooseDestination(city) {
  booking.destination = city;
  let flightSelect = document.getElementById("flight");
  flightSelect.innerHTML = "";
  let flights = booking.type === "domestic" ? domesticFlights : internationalFlights;
  flights.forEach(f => {
    let option = document.createElement("option");
    option.value = f;
    option.textContent = f;
    flightSelect.appendChild(option);
  });
  goToScreen(4);
}

document.getElementById("detailsForm").addEventListener("submit", e => {
  e.preventDefault();
  booking.name = document.getElementById("name").value;
  booking.email = document.getElementById("email").value;
  booking.phone = document.getElementById("phone").value;
  booking.customers = document.getElementById("customers").value;
  booking.age = document.getElementById("age").value;
  booking.departure = document.getElementById("departure").value;
  booking.return = document.getElementById("return").value;
  booking.flight = document.getElementById("flight").value;
  
  // Pricing
  let basePrice = booking.type === "domestic" ? 30000 : 60000;
  let discount = booking.type === "domestic" ? 0.25 : 0.35;
  booking.price = booking.customers * basePrice * (1 - discount);

  // Show summary
  document.getElementById("summary").innerHTML = `
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Destination:</strong> ${booking.destination}</p>
    <p><strong>Flight:</strong> ${booking.flight}</p>
    <p><strong>Departure:</strong> ${booking.departure}</p>
    <p><strong>Return:</strong> ${booking.return}</p>
    <p><strong>Passengers:</strong> ${booking.customers}</p>
    <p><strong>Total Price:</strong> ₹${booking.price}</p>
  `;
  goToScreen(5);
});

function confirmBooking() {
  // Boarding pass details
  document.getElementById("bpName").textContent = booking.name;
  document.getElementById("bpDestination").textContent = booking.destination;
  document.getElementById("bpFlight").textContent = booking.flight;
  document.getElementById("bpDeparture").textContent = booking.departure;
  document.getElementById("bpReturn").textContent = booking.return;
  document.getElementById("bpSeat").textContent = Math.floor(Math.random() * 30) + 1 + ["A","B","C","D"][Math.floor(Math.random()*4)];

  // QR Code
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: `VoyageX Booking\nName: ${booking.name}\nDestination: ${booking.destination}\nFlight: ${booking.flight}\nDeparture: ${booking.departure}`,
    width: 100,
    height: 100
  });

  goToScreen(6);
}
