let tripType = "";
const destinations = {
  international: ["New York", "Sydney", "Paris", "London", "Tokyo", "Kyoto", "Beijing", "Shanghai", "Switzerland", "Dubai", "Maldives", "Bali"],
  domestic: ["Bengaluru", "Chennai", "Mumbai", "Hyderabad", "Thiruvananthapuram", "Kolkata", "Jaipur", "Srinagar"]
};
const flights = {
  international: ["Emirates", "Singapore Airlines", "Vistara"],
  domestic: ["IndiGo", "Air India", "Akasa Air"]
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function chooseType(type) {
  tripType = type;
  const destSelect = document.getElementById("destination");
  const flightSelect = document.getElementById("flight");

  destSelect.innerHTML = "";
  destinations[type].forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    destSelect.appendChild(opt);
  });

  flightSelect.innerHTML = "";
  flights[type].forEach(f => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = f;
    flightSelect.appendChild(opt);
  });

  showScreen("screen2");
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const destination = document.getElementById("destination").value;
  const customers = document.getElementById("customers").value;
  const departure = document.getElementById("departure").value;
  const ret = document.getElementById("return").value;

  let pricePerDay = tripType === "international" ? 60000 : 30000;
  let discount = tripType === "international" ? 0.35 : 0.25;
  let total = pricePerDay * customers * (1 - discount);

  document.getElementById("price").innerText = 
    `Total Price: ₹${total.toLocaleString()} (after discount)`;

  document.getElementById("confirmationMessage").innerText = 
    `Booking Confirmed for ${name} to ${destination}!`;

  document.getElementById("tagline").innerText = 
    tripType === "international" 
      ? "Beyond borders, beyond ordinary" 
      : "Where every journey becomes a story";

  showScreen("screen3");

  // Save for boarding pass
  sessionStorage.setItem("bpType", tripType);
  sessionStorage.setItem("bpDestination", destination);
  sessionStorage.setItem("bpName", name);
  sessionStorage.setItem("bpDates", `${departure} to ${ret}`);
});

function goToBoardingPass() {
  document.getElementById("bpType").innerText = sessionStorage.getItem("bpType");
  document.getElementById("bpDestination").innerText = sessionStorage.getItem("bpDestination");
  document.getElementById("bpName").innerText = sessionStorage.getItem("bpName");
  document.getElementById("bpDates").innerText = sessionStorage.getItem("bpDates");

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: `VoyageX | ${sessionStorage.getItem("bpName")} | ${sessionStorage.getItem("bpDestination")} | ${sessionStorage.getItem("bpDates")}`,
    width: 128,
    height: 128
  });

  showScreen("screen4");
}
