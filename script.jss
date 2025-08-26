let bookingType = "";

function chooseType(type) {
  bookingType = type;
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");

  const formTitle = document.getElementById("formTitle");
  const destinationSelect = document.getElementById("destinationSelect");
  destinationSelect.innerHTML = "";

  if (type === "international") {
    formTitle.innerText = "Beyond Borders, Beyond Ordinaries";
    const options = ["London","Paris","Switzerland","New York","Sydney","Egypt","Kenya","Singapore","Dubai","Maldives","Japan"];
    options.forEach(opt => {
      let o = document.createElement("option");
      o.text = opt;
      destinationSelect.add(o);
    });
    document.getElementById("priceField").value = "₹60000 per person/day";
    document.getElementById("discountField").value = "30%";
  } else {
    formTitle.innerText = "Your Next Adventure Starts Here";
    const options = ["Bangalore","Mumbai","Delhi","Chennai","Hyderabad","Thiruvananthapuram","Kolkata","Srinagar"];
    options.forEach(opt => {
      let o = document.createElement("option");
      o.text = opt;
      destinationSelect.add(o);
    });
    document.getElementById("priceField").value = "₹30000 per person/day";
    document.getElementById("discountField").value = "25%";
  }
}

// Handle booking form submit → go to Step 3 (confirmation)
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  document.getElementById("step2").classList.remove("active");
  document.getElementById("step3").classList.add("active");

  const passengers = parseInt(document.getElementById("passengers").value);
  const days = parseInt(document.getElementById("days").value);

  let pricePerDay = (bookingType === "international") ? 60000 : 30000;
  let discountRate = (bookingType === "international") ? 0.30 : 0.25;

  let totalPrice = passengers * days * pricePerDay;
  let discount = totalPrice * discountRate;
  let finalAmount = totalPrice - discount;

  // Show confirmation summary
  document.getElementById("confirmationDetails").innerHTML = `
    <p><strong>Name:</strong> ${document.getElementById("name").value}</p>
    <p><strong>Age:</strong> ${document.getElementById("age").value}</p>
    <p><strong>Passengers:</strong> ${passengers}</p>
    <p><strong>Contact:</strong> ${document.getElementById("contact").value}</p>
    <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
    <p><strong>Destination:</strong> ${document.getElementById("destinationSelect").value}</p>
    <p><strong>Airline:</strong> ${document.getElementById("airline").value}</p>
    <p><strong>Package Days:</strong> ${days}</p>
    <p><strong>Departure:</strong> ${document.getElementById("departure").value}</p>
    <p><strong>Arrival:</strong> ${document.getElementById("arrival").value}</p>
    <p><strong>Total Price:</strong> ₹${totalPrice}</p>
    <p><strong>Discount:</strong> ₹${discount}</p>
    <p><strong>Final Amount:</strong> ₹${finalAmount}</p>
  `;
});

function finalizeBooking() {
  document.getElementById("step3").classList.remove("active");
  document.getElementById("step4").classList.add("active");

  const passengers = parseInt(document.getElementById("passengers").value);
  const days = parseInt(document.getElementById("days").value);

  let pricePerDay = (bookingType === "international") ? 60000 : 30000;
  let discountRate = (bookingType === "international") ? 0.30 : 0.25;

  let totalPrice = passengers * days * pricePerDay;
  let discount = totalPrice * discountRate;
  let finalAmount = totalPrice - discount;

  // Update ticket details
  document.getElementById("outName").innerText = document.getElementById("name").value;
  document.getElementById("outAge").innerText = document.getElementById("age").value;
  document.getElementById("outPassengers").innerText = passengers;
  document.getElementById("outContact").innerText = document.getElementById("contact").value;
  document.getElementById("outEmail").innerText = document.getElementById("email").value;
  document.getElementById("outDestination").innerText = document.getElementById("destinationSelect").value;
  document.getElementById("outAirline").innerText = document.getElementById("airline").value;
  document.getElementById("outDays").innerText = days;
  document.getElementById("outDeparture").innerText = document.getElementById("departure").value;
  document.getElementById("outArrival").innerText = document.getElementById("arrival").value;
  document.getElementById("outPrice").innerText = `₹${totalPrice}`;
  document.getElementById("outDiscount").innerText = `₹${discount}`;
  document.getElementById("outFinal").innerText = `₹${finalAmount}`;

  // Caption per type
  document.getElementById("caption").innerText = 
    (bookingType === "international") ? "Beyond Borders, Beyond Ordinaries" : "Your Next Adventure Starts Here";

  // Generate QR Code
  const qrData = `Name: ${document.getElementById("name").value}, Destination: ${document.getElementById("destinationSelect").value}, Final: ₹${finalAmount}`;
  document.getElementById("qrCode").src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;
}
