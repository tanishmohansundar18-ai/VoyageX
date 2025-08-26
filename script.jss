const screens = document.querySelectorAll('.screen');
let tripType = '';
let pricePerDay = 0;
let discount = 0;

const destinations = {
  international: [
    'New York','Sydney','Paris','London',
    'Tokyo','Kyoto','Beijing','Shanghai',
    'Switzerland','Dubai','Maldives','Bali'
  ],
  domestic: [
    'Bengaluru','Chennai','Mumbai','Hyderabad',
    'Thiruvananthapuram','Kolkata','Jaipur','Srinagar'
  ]
};

const flights = {
  international: ['Emirates','Singapore Airlines','Vistara'],
  domestic: ['IndiGo','Air India','Akasa Air']
};

function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showDestinations(type) {
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

  // pricing
  if (type === 'international') {
    pricePerDay = 60000;
    discount = 0.35;
  } else {
    pricePerDay = 30000;
    discount = 0.25;
  }

  showScreen('booking');
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const destination = document.getElementById('destination').value;
  const customers = parseInt(document.getElementById('customers').value);
  const age = document.getElementById('age').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const flight = document.getElementById('flight').value;
  const departure = new Date(document.getElementById('departure').value);
  const ret = new Date(document.getElementById('return').value);

  const days = Math.max(1, (ret - departure) / (1000 * 60 * 60 * 24));
  const gross = customers * pricePerDay * days;
  const total = gross - gross * discount;

  const caption = tripType === 'international'
    ? 'Beyond borders, beyond ordinary'
    : 'Where every journey becomes a story';

  document.getElementById('confirmationCaption').textContent = caption;

  document.getElementById('confirmationDetails').innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Customers:</strong> ${customers}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Flight:</strong> ${flight}</p>
    <p><strong>Departure:</strong> ${departure.toDateString()}</p>
    <p><strong>Return:</strong> ${ret.toDateString()}</p>
    <p><strong>Total Price:</strong> ₹${total.toLocaleString()}</p>
  `;

  showScreen('confirmation');
});
