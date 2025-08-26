// Destination lists
const internationalCities = ["New York", "Sydney", "Paris", "London", "Tokyo", "Kyoto", "Beijing", "Shanghai", "Switzerland", "Dubai", "Maldives", "Bali"];
const domesticCities = ["Bengaluru", "Chennai", "Mumbai", "Hyderabad", "Thiruvananthapuram", "Kolkata", "Jaipur", "Srinagar"];

const internationalFlights = ["Emirates", "Singapore Airlines", "Vistara"];
const domesticFlights = ["Indigo", "Air India", "Akasa Air"];

let currentTrip = "";

// Screen navigation
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Landing screen buttons
document.getElementById("btnInternational").onclick = () => {
  currentTrip = "International";
  loadOptions(internationalCities, internationalFlights);
  document.getElementById("tripType").innerText = "International Booking";
  showScreen("booking");
};

document.getElementById("btnDomestic").onclick = () => {
  currentTrip = "Domestic";
  loadOptions(domesticCities, domesticFlights);
  document.getElementById("tripType").innerText = "Domestic Booking";
  showScreen("booking");
};

// Load destinations + flights
function loadOptions(cities, flights) {
  let destSelect = document.getElementById("destination");
  let flightSelect = document.getElementById("flight");
  destSelect.innerHTML = "";
  flightSelect.innerHTML = "";

  cities.forEach(c => {
    let opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    destSelect.appendChild(opt);
  });

  flights.forEach(f => {
    let opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;
    flightSelect.appendChild(opt);
  });
}

// Handle booking form
document.getElementById("bookingForm").onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const customers = parseInt(document.getElementById("customers").value);
  const age = document.getElementById("age").value;
  const destination = document.getElementById("destination").value;
  const flight = document.getElementById("flight").value;
  const departure = document.getElementById("departure").value;
  const ret = document.getElementById("return").value;

  let pricePerDay = currentTrip === "International" ? 60000 : 30000;
  let discount = currentTrip === "International" ? 0.35 : 0.25;
  let total = pricePerDay * customers * (1 - discount);

  document.getElementById("confirmationCaption").innerText = 
    currentTrip === "International" 
    ? "Beyond borders, beyond ordinary" 
    : "Where every journey becomes a story";

  document.getElementById("confirmationDetails").innerHTML = `
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Destination:</b> ${destination} (${currentTrip})</p>
    <p><b>Flight:</b> ${flight}</p>
    <p><b>Departure:</b> ${departure}</p>
    <p><b>Return:</b> ${ret}</p>
    <p><b>Passengers:</b> ${customers}</p>
    <p><b>Total Price:</b> ₹${total.toLocaleString()}</p>
  `;

  // Store for boarding pass
  window.bookingData = { name, email, phone, destination, flight, departure, ret, customers, total, currentTrip };

  showScreen("confirmation");
};

// Confirm booking → Success
document.getElementById("btnConfirm").onclick = () => {
  const data = window.bookingData;
  document.getElementById("boardingDetails").innerHTML = `
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Destination:</b> ${data.destination} (${data.currentTrip})</p>
    <p><b>Flight:</b> ${data.flight}</p>
    <p><b>Departure:</b> ${data.departure}</p>
    <p><b>Return:</b> ${data.ret}</p>
    <p><b>Passengers:</b> ${data.customers}</p>
    <p><b>Total Price:</b> ₹${data.total.toLocaleString()}</p>
  `;

  // QR Code
  QRCode.toCanvas(document.getElementById("qrcode"), JSON.stringify(data), function (error) {
    if (error) console.error(error);
  });

  showScreen("success");
};
