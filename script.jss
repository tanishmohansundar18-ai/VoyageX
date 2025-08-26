// Countries and Cities
const cities = {
  "India": ["Chennai", "Delhi", "Mumbai", "Bangalore"],
  "USA": ["New York", "Los Angeles", "Chicago"],
  "UK": ["London", "Manchester", "Birmingham"],
  "Japan": ["Tokyo", "Osaka", "Kyoto"],
  "Australia": ["Sydney", "Melbourne", "Brisbane"]
};

function loadCities() {
  let country = document.getElementById("country").value;
  let cityDropdown = document.getElementById("city");
  cityDropdown.innerHTML = "<option value=''>-- Select City --</option>";

  if (country && cities[country]) {
    cities[country].forEach(city => {
      let option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      cityDropdown.appendChild(option);
    });
  }
}

function generateCustomerFields() {
  let num = document.getElementById("numCustomers").value;
  let container = document.getElementById("customers");
  container.innerHTML = "";

  for (let i = 1; i <= num; i++) {
    container.innerHTML += `
      <input type="text" id="custName${i}" placeholder="Customer ${i} Name" required><br>
      <input type="text" id="custPhone${i}" placeholder="Customer ${i} Phone" required><br>
    `;
  }
}

function bookTicket() {
  let mainName = document.getElementById("mainName").value;
  let numCustomers = document.getElementById("numCustomers").value;
  let country = document.getElementById("country").value;
  let city = document.getElementById("city").value;
  let tickets = parseInt(document.getElementById("tickets").value);

  if (!mainName || !numCustomers || !country || !city || tickets <= 0) {
    document.getElementById("output").innerHTML = "⚠️ Please fill all fields correctly.";
    return;
  }

  let customerDetails = "";
  for (let i = 1; i <= numCustomers; i++) {
    let cname = document.getElementById(`custName${i}`).value;
    let cphone = document.getElementById(`custPhone${i}`).value;
    customerDetails += `👤 ${cname} 📞 ${cphone}<br>`;
  }

  let price = 1000; // flat rate
  let total = tickets * price;

  let bookingDetails = `
    ✅ Booking Confirmed!<br>
    Booker: ${mainName}<br>
    Country: ${country}<br>
    City: ${city}<br>
    Tickets: ${tickets}<br>
    Total Price: ₹${total}<br><br>
    <b>Customer Details:</b><br>${customerDetails}
  `;

  document.getElementById("output").innerHTML = bookingDetails;

  // Send email using EmailJS
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_email: "tanishmohansundar18@gmai.com",
    from_name: mainName,
    country: country,
    city: city,
    tickets: tickets,
    total: total,
    customers: customerDetails
  })
  .then(() => {
    alert("📧 Booking details sent to your email!");
  }, (error) => {
    alert("❌ Failed to send email: " + JSON.stringify(error));
  });
}
