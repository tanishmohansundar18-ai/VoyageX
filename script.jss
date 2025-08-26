let bookingType = "";

function chooseType(type) {
  bookingType = type;
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");

  const title = document.getElementById("formTitle");
  const dest = document.getElementById("destinationSelect");
  dest.innerHTML = "";

  if (type === "international") {
    title.innerText = "Beyond Borders, Beyond Ordinaries";
    ["London","Paris","Switzerland","New York","Sydney","Egypt","Kenya","Singapore","Dubai","Maldives","Japan"].forEach(d => {
      let opt = document.createElement("option");
      opt.textContent = d;
      dest.appendChild(opt);
    });
    document.getElementById("priceField").value = "₹60,000 / person/day";
    document.getElementById("discountField").value = "30%";
  } else {
    title.innerText = "Your next adventure starts here";
    ["Bangalore","Mumbai","Delhi","Chennai","Hyderabad","Thiruvananthapuram","Kolkata","Srinagar"].forEach(d => {
      let opt = document.createElement("option");
      opt.textContent = d;
      dest.appendChild(opt);
    });
    document.getElementById("priceField").value = "₹30,000 / person/day";
    document.getElementById("discountField").value = "25%";
  }
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  document.getElementById("step2").classList.remove("active");
  document.getElementById("step3").classList.add("active");

  // Caption in confirmation
  if (bookingType === "international") {
    document.getElementById("caption").innerText = "Beyond Borders, Beyond Ordinaries";
  } else {
    document.getElementById("caption").innerText = "Your next adventure starts here";
  }

  // Fill summary
  document.getElementById("sumName").innerText = document.getElementById("name").value;
  document.getElementById("sumAge").innerText = document.getElementById("age").value;
  document.getElementById("sumPassengers").innerText = document.getElementById("passengers").value;
  document.getElementById("sumContact").innerText = document.getElementById("contact").value;
  document.getElementById("sumEmail").innerText = document.getElementById("email").value;
  document.getElementById("sumDestination").innerText = document.getElementById("destinationSelect").value;
  document.getElementById("sumAirline").innerText = document.getElementById("airline").value;
  document.getElementById("sumDays").innerText = document.getElementById("days").value + " days";
  document.getElementById("sumDeparture").innerText = document.getElementById("departure").value;
  document.getElementById("sumArrival").innerText = document.getElementById("arrival").value;
  document.getElementById("sumPrice").innerText = document.getElementById("priceField").value;
  document.getElementById("sumDiscount").innerText = document.getElementById("discountField").value;

  // QR Code
  let qrData = `
    Name: ${document.getElementById("name").value}
    Destination: ${document.getElementById("destinationSelect").value}
    Departure: ${document.getElementById("departure").value}
    Return: ${document.getElementById("arrival").value}
    Airline: ${document.getElementById("airline").value}
    Passengers: ${document.getElementById("passengers").value}
    Total: ${document.getElementById("priceField").value}
    Discounted: ${document.getElementById("discountField").value}
  `;
  document.getElementById("qrCode").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrData);
});
