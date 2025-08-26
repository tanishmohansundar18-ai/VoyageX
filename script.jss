let bookingType = "";
let bookingData = {};

function chooseType(type) {
  bookingType = type;

  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");

  const destinationSelect = document.getElementById("destinationSelect");
  destinationSelect.innerHTML = "";

  if (type === "international") {
    document.getElementById("formTitle").innerText = "Beyond Borders, Beyond Ordinaries";
    ["London","Paris","Switzerland","New York","Sydney","Egypt","Kenya","Singapore","Dubai","Maldives","Japan"]
      .forEach(dest => {
        let opt = document.createElement("option");
        opt.text = dest;
        destinationSelect.add(opt);
      });
    document.getElementById("priceField").value = "60000 per person per day";
    document.getElementById("discountField").value = "30%";
  } else {
    document.getElementById("formTitle").innerText = "Your next adventure starts here";
    ["Bangalore","Mumbai","Delhi","Chennai","Hyderabad","Thiruvananthapuram","Kolkata","Srinagar"]
      .forEach(dest => {
        let opt = document.createElement("option");
        opt.text = dest;
        destinationSelect.add(opt);
      });
    document.getElementById("priceField").value = "30000 per person per day";
    document.getElementById("discountField").value = "25%";
  }
}

// Step 2 → Step 3
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  bookingData = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    passengers: document.getElementById("passengers").value,
    contact: document.getElementById("contact").value,
    email: document.getElementById("email").value,
    destination: document.getElementById("destinationSelect").value,
    airline: document.getElementById("airline").value,
    days: document.getElementById("days").value,
    departure: document.getElementById("departure").value,
    arrival: document.getElementById("arrival").value
  };

  let pricePerDay = bookingType === "international" ? 60000 : 30000;
  let discountRate = bookingType === "international" ? 0.30 : 0.25;
  let total = pricePerDay * bookingData.days * bookingData.passengers;
  let finalAmount = total - (total * discountRate);

  bookingData.price = total;
  bookingData.discount = (discountRate*100) + "%";
  bookingData.final = finalAmount;

  document.getElementById("step2").classList.remove("active");
  document.getElementById("step3").classList.add("active");

  document.getElementById("confirmationDetails").innerHTML = `
    <p><b>Name:</b> ${bookingData.name}</p>
    <p><b>Age:</b> ${bookingData.age}</p>
    <p><b>Passengers:</b> ${bookingData.passengers}</p>
    <p><b>Contact:</b> ${bookingData.contact}</p>
    <p><b>Email:</b> ${bookingData.email}</p>
    <p><b>Destination:</b> ${bookingData.destination}</p>
    <p><b>Airline:</b> ${bookingData.airline}</p>
    <p><b>Package Days:</b> ${bookingData.days}</p>
    <p><b>Departure:</b> ${bookingData.departure}</p>
    <p><b>Arrival:</b> ${bookingData.arrival}</p>
    <p><b>Total Price:</b> ${total}</p>
    <p><b>Discount:</b> ${bookingData.discount}</p>
    <p><b>Final Amount:</b> ${finalAmount}</p>
  `;
});

// Step 3 → Step 4
function finalizeBooking() {
  document.getElementById("step3").classList.remove("active");
  document.getElementById("step4").classList.add("active");

  document.getElementById("caption").innerText =
    bookingType === "international" ? "Beyond Borders, Beyond Ordinaries" : "Your next adventure starts here";

  document.getElementById("outName").innerText = bookingData.name;
  document.getElementById("outAge").innerText = bookingData.age;
  document.getElementById("outPassengers").innerText = bookingData.passengers;
  document.getElementById("outContact").innerText = bookingData.contact;
  document.getElementById("outEmail").innerText = bookingData.email;
  document.getElementById("outDestination").innerText = bookingData.destination;
  document.getElementById("outAirline").innerText = bookingData.airline;
  document.getElementById("outDays").innerText = bookingData.days;
  document.getElementById("outDeparture").innerText = bookingData.departure;
  document.getElementById("outArrival").innerText = bookingData.arrival;
  document.getElementById("outPrice").innerText = bookingData.price;
  document.getElementById("outDiscount").innerText = bookingData.discount;
  document.getElementById("outFinal").innerText = bookingData.final;

  // QR code
  let qrText = `Name:${bookingData.name}, Destination:${bookingData.destination}, Final:${bookingData.final}`;
  document.getElementById("qrCode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=" + encodeURIComponent(qrText);
}
