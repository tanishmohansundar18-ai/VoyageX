let travelType = ""; 
let chosenDestination = "";

function goToScreen(type) {
  travelType = type;
  document.getElementById("screen1").classList.remove("active");
  document.getElementById("screen2").classList.add("active");

  const optionsDiv = document.getElementById("destinationOptions");
  optionsDiv.innerHTML = "";

  const internationalCities = ["New York", "Sydney", "Paris", "London", "Tokyo", "Dubai", "Maldives", "Bali"];
  const domesticCities = ["Bengaluru", "Chennai", "Mumbai", "Hyderabad", "Thiruvananthapuram", "Kolkata", "Jaipur", "Srinagar"];

  const list = type === "international" ? internationalCities : domesticCities;

  list.forEach(city => {
    const btn = document.createElement("button");
    btn.innerText = city;
    btn.onclick = () => { chosenDestination = city; };
    optionsDiv.appendChild(btn);
  });
}

function goToForm() {
  if (!chosenDestination) {
    alert("Please choose a destination first!");
    return;
  }
  document.getElementById("screen2").classList.remove("active");
  document.getElementById("screen3").classList.add("active");
}

function handleBooking(event) {
  event.preventDefault();

  // Collect values
  const name = document.getElementById("name").value;
  const departure = document.getElementById("departure").value;
  const returnDate = document.getElementById("return").value;

  // Switch screen
  document.getElementById("screen3").classList.remove("active");
  document.getElementById("screen4").classList.add("active");

  // Fill boarding pass
  document.getElementById("bpName").innerText = name;
  document.getElementById("bpType").innerText = travelType.toUpperCase();
  document.getElementById("bpDestination").innerText = chosenDestination;
  document.getElementById("bpDeparture").innerText = departure;
  document.getElementById("bpReturn").innerText = returnDate;

  // Tagline
  document.getElementById("tagline").innerText =
    travelType === "international"
      ? "Beyond borders, beyond ordinary"
      : "Where every journey becomes a story";

  // Generate QR Code with booking details
  const qrData = `VoyageX Booking\nName: ${name}\nType: ${travelType}\nDestination: ${chosenDestination}\nDeparture: ${departure}\nReturn: ${returnDate}`;
  document.getElementById("qrcode").innerHTML = ""; // clear old
  new QRCode(document.getElementById("qrcode"), {
    text: qrData,
    width: 128,
    height: 128
  });
}
