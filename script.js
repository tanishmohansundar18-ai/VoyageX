const screens = document.querySelectorAll('.screen');
let bookingType = '';
let destination = '';

const internationalCities = ["New York", "Sydney", "Paris", "London", "Tokyo", "Kyoto", "Beijing", "Shanghai", "Switzerland", "Dubai", "Maldives", "Bali"];
const domesticCities = ["Bengaluru", "Chennai", "Mumbai", "Hyderabad", "Thiruvananthapuram", "Kolkata", "Jaipur", "Srinagar"];

const flights = {
  international: ["Emirates", "Singapore Airlines", "Vistara"],
  domestic: ["IndiGo", "Air India", "Akasa Air"]
};

// Show a screen
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Step 1: Choose Type
function chooseType(type) {
  bookingType = type;
  const cityOptions = document.getElementById('cityOptions');
  cityOptions.innerHTML = '';

  const cities = type === 'international' ? internationalCities : domesticCities;
  cities.forEach(city => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = city;
    btn.onclick = () => chooseCity(city);
    cityOptions.appendChild(btn);
  });

  showScreen('screen2');
}

// Step 2: Choose City
function chooseCity(city) {
  destination = city;
  document.getElementById('destination').value = city;

  const flightSelect = document.getElementById('flight');
  flightSelect.innerHTML = '';
  flights[bookingType].forEach(f => {
    const opt = document.createElement('option');
    opt.value = f;
    opt.textContent = f;
    flightSelect.appendChild(opt);
  });

  calculatePrice();
  showScreen('screen3');
}

// Step 3: Calculate Price
function calculatePrice() {
  const customers = parseInt(document.getElementById('customers').value) || 1;
  let basePrice = bookingType === 'international' ? 60000 : 30000;
  let discount = bookingType === 'international' ? 0.35 : 0.25;
  let total = customers * basePrice * (1 - discount);
  document.getElementById('priceDisplay').textContent = `Total Price: ₹${total.toLocaleString()}`;
}

document.getElementById('customers').addEventListener('input', calculatePrice);

// Step 4: Submit Form
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const customers = document.getElementById('customers').value;
  const flight = document.getElementById('flight').value;
  const departure = document.getElementById('departure').value;
  const ret = document.getElementById('return').value;
  const price = document.getElementById('priceDisplay').textContent;

  const caption = bookingType === 'international'
    ? "🌍 Beyond borders, beyond ordinary"
    : "🛫 Where every journey becomes a story";

  document.getElementById('caption').textContent = caption;

  const summary = `
    <strong>Name:</strong> ${name}<br>
    <strong>Destination:</strong> ${destination}<br>
    <strong>Customers:</strong> ${customers}<br>
    <strong>Age:</strong> ${age}<br>
    <strong>Phone:</strong> ${phone}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Flight:</strong> ${flight}<br>
    <strong>Departure:</strong> ${departure}<br>
    <strong>Return:</strong> ${ret}<br>
    <strong>${price}</strong>
  `;
  document.getElementById('summary').innerHTML = summary;

  // Generate QR code
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), {
    text: `${name} - ${destination} - ${departure} - ${ret}`,
    width: 128,
    height: 128
  });

  showScreen('screen4');

  // Auto move to final screen after 4s
  setTimeout(() => {
    showScreen('screen5');
  }, 4000);
});
