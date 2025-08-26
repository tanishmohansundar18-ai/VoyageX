const destinations = {
  international: [
    'New York','Sydney','Paris','London','Tokyo','Kyoto','Beijing','Shanghai','Switzerland','Dubai','Maldives','Bali'
  ],
  domestic: [
    'Bengaluru','Chennai','Mumbai','Hyderabad','Thiruvananthapuram','Kolkata','Jaipur','Srinagar'
  ]
};
const flights = {
  international: ['Emirates','Singapore Airlines','Vistara'],
  domestic: ['IndiGo','Air India','Akasa Air']
};

let tripType = '';
let pricePerDay = 0;
let discount = 0;
let bookingData = {};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function setupBooking(type) {
  tripType = type;
  const destSelect = document.getElementById('destination');
  const flightSelect = document.getElementById('flight');
  destSelect.innerHTML = '';
  flightSelect.innerHTML = '';

  destinations[type].forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    destSelect.appendChild(opt);
  });

  flights[type].forEach(f => {
    const opt = document.createElement('option');
    opt.value = f;
    opt.textContent = f;
    flightSelect.appendChild(opt);
  });

  document.getElementById('tripType').textContent =
    `Trip Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  if (type === 'international') {
    pricePerDay = 60000;
    discount = 0.35;
  } else {
    pricePerDay = 30000;
    discount = 0.25;
  }

  showScreen('booking');
}

document.getElementById('btnInternational').addEventListener('click', () => setupBooking('international'));
document.getElementById('btnDomestic').addEventListener('click', () => setupBooking('domestic'));

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  bookingData.name = document.getElementById('name').value;
  bookingData.destination = document.getElementById('destination').value;
  bookingData.customers = parseInt(document.getElementById('customers').value);
  bookingData.age = document.getElementById('age').value;
  bookingData.phone = document.getElementById('phone').value;
  bookingData.email = document.getElementById('email').value;
  bookingData.flight = document.getElementById('flight').value;
  bookingData.departure = new Date(document.getElementById('departure').value);
  bookingData.return = new Date(document.getElementById('return').value);

  const days = Math.max(1, (bookingData.return - bookingData.departure) / (1000*60*60*24));
  const gross = bookingData.customers * pricePerDay * days;
  bookingData.total = gross - gross * discount;

  const caption = tripType === 'international'
    ? 'Beyond borders, beyond ordinary'
    : 'Where every journey becomes a story';

  document.getElementById('confirmationCaption').textContent = caption;
  document.getElementById('confirmationDetails').innerHTML = `
    <p><strong>Name:</strong> ${bookingData.name}</p>
    <p><strong>Destination:</strong> ${bookingData.destination}</p>
    <p><strong>Customers:</strong> ${bookingData.customers}</p>
    <p><strong>Flight:</strong> ${bookingData.flight}</p>
    <p><strong>Departure:</strong> ${bookingData.departure.toDateString()}</p>
    <p><strong>Return:</strong> ${bookingData.return.toDateString()}</p>
    <p><strong>Total Price:</strong> ₹${bookingData.total.toLocaleString()}</p>
  `;

  showScreen('confirmation');
});

document.getElementById('btnConfirm').addEventListener('click', () => {
  // boarding pass content
  const pass = document.getElementById('boardingPass');
  const qrData = `Name:${bookingData.name}, Destination:${bookingData.destination}, Flight:${bookingData.flight}, Date:${bookingData.departure.toDateString()}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
  pass.innerHTML = `
    <h2>VoyageX Boarding Pass</h2>
    <p><strong>Name:</strong> ${bookingData.name}</p>
    <p><strong>Destination:</strong> ${bookingData.destination}</p>
    <p><strong>Flight:</strong> ${bookingData.flight}</p>
    <p><strong>Departure:</strong> ${bookingData.departure.toDateString()}</p>
    <p><strong>Return:</strong> ${bookingData.return.toDateString()}</p>
    <p><strong>Total:</strong> ₹${bookingData.total.toLocaleString()}</p>
    <div class="qr"><img src="${qrUrl}" alt="QR Code"></div>
  `;
  showScreen('success');
});
