const app = document.getElementById("app");
let booking = {
  tripType: "",
  destination: "",
  flight: "",
  seat: "",
  date: "",
  passengerName: "",
  passengerAge: 0,
  returnTrip: false,
  returnFlight: "",
  returnSeat: "",
  returnDate: "",
  price: 0
};

// render helper
function render(content) {
  app.innerHTML = content;
}

// Welcome screen
function showWelcome() {
  render(`
    <h1>VoyageX</h1>
    <h2>Turn miles into smiles ✈️</h2>
    <button onclick="chooseTravel()">Continue</button>
  `);
}

// Travel type
function chooseTravel() {
  render(`
    <h2>Where do you want to travel?</h2>
    <button onclick="chooseFlight('Domestic')">Domestic</button>
    <button onclick="chooseFlight('International')">International</button>
    <br>
    <button onclick="showWelcome()">⬅ Back</button>
  `);
}

// Destination
function chooseFlight(type) {
  booking.tripType = type;
  let destinations = type === "Domestic"
    ? ["Mumbai", "Bangalore", "Delhi", "Chennai", "Hyderabad", "Kolkata"]
    : ["London", "Paris", "New York", "Sydney", "Dubai", "Singapore", "Tokyo"];

  let destButtons = destinations.map(d => `<button onclick="selectDestination('${d}')">${d}</button>`).join("");

  render(`
    <h2>Select your destination (${type})</h2>
    ${destButtons}
    <br>
    <button onclick="chooseTravel()">⬅ Back</button>
  `);
}

// Flight time
function selectDestination(dest) {
  booking.destination = dest;
  render(`
    <h2>Choose your flight time</h2>
    <button onclick="chooseSeat('6:00 AM')">6:00 AM</button>
    <button onclick="chooseSeat('12:00 PM')">12:00 PM</button>
    <button onclick="chooseSeat('6:00 PM')">6:00 PM</button>
    <br>
    <button onclick="chooseFlight('${booking.tripType}')">⬅ Back</button>
  `);
}

// Seat type
function chooseSeat(time) {
  booking.flight = time;
  render(`
    <h2>Select your seat type</h2>
    <button onclick="enterDate('Economy')">Economy</button>
    <button onclick="enterDate('Premium Economy')">Premium Economy</button>
    <button onclick="enterDate('Business')">Business Class</button>
    <br>
    <button onclick="selectDestination('${booking.destination}')">⬅ Back</button>
  `);
}

// Date
function enterDate(seat) {
  booking.seat = seat;
  render(`
    <h2>Select Departure Date</h2>
    <input type="date" id="departDate"><br><br>
    <button onclick="enterDetails()">Next</button>
    <br>
    <button onclick="chooseSeat('${booking.flight}')">⬅ Back</button>
  `);
}

// Passenger details
function enterDetails() {
  booking.date = document.getElementById("departDate").value;
  render(`
    <h2>Enter Passenger Details</h2>
    <input type="text" id="pname" placeholder="Passenger Name"><br>
    <input type="number" id="page" placeholder="Passenger Age"><br><br>
    <button onclick="checkAge()">Continue</button>
    <br>
    <button onclick="enterDate('${booking.seat}')">⬅ Back</button>
  `);
}

// Age check
function checkAge() {
  booking.passengerName = document.getElementById("pname").value;
  booking.passengerAge = parseInt(document.getElementById("page").value);

  if (booking.passengerAge < 3) {
    render(`
      <h2>Passenger not allowed ❌</h2>
      <p>Passenger can’t even wipe their ass properly, so they aren’t allowed to fly 🚫</p>
      <br>
      <button onclick="enterDetails()">⬅ Back</button>
    `);
  } else {
    askReturn();
  }
}

// Return flight option
function askReturn() {
  render(`
    <h2>Do you want to book a return flight?</h2>
    <button onclick="chooseReturn(true)">Yes</button>
    <button onclick="chooseReturn(false)">No</button>
    <br>
    <button onclick="enterDetails()">⬅ Back</button>
  `);
}

function chooseReturn(choice) {
  booking.returnTrip = choice;
  if (choice) {
    render(`
      <h2>Select Return Flight Time</h2>
      <button onclick="chooseReturnSeat('6:00 AM')">6:00 AM</button>
      <button onclick="chooseReturnSeat('12:00 PM')">12:00 PM</button>
      <button onclick="chooseReturnSeat('6:00 PM')">6:00 PM</button>
      <br>
      <button onclick="askReturn()">⬅ Back</button>
    `);
  } else {
    showSummary();
  }
}

function chooseReturnSeat(time) {
  booking.returnFlight = time;
  render(`
    <h2>Select Return Seat</h2>
    <button onclick="chooseReturnDate('Economy')">Economy</button>
    <button onclick="chooseReturnDate('Premium Economy')">Premium Economy</button>
    <button onclick="chooseReturnDate('Business')">Business Class</button>
    <br>
    <button onclick="chooseReturn(true)">⬅ Back</button>
  `);
}

function chooseReturnDate(seat) {
  booking.returnSeat = seat;
  render(`
    <h2>Select Return Date</h2>
    <input type="date" id="returnDate"><br><br>
    <button onclick="finalizeReturn()">Continue</button>
    <br>
    <button onclick="chooseReturnSeat('${booking.returnFlight}')">⬅ Back</button>
  `);
}

function finalizeReturn() {
  booking.returnDate = document.getElementById("returnDate").value;
  showSummary();
}

// Summary screen
function showSummary() {
  render(`
    <h2>Booking Summary</h2>
    <p><b>Name:</b> ${booking.passengerName}</p>
    <p><b>Age:</b> ${booking.passengerAge}</p>
    <p><b>Destination:</b> ${booking.destination}</p>
    <p><b>Flight Time:</b> ${booking.flight}</p>
    <p><b>Seat:</b> ${booking.seat}</p>
    <p><b>Date:</b> ${booking.date}</p>
    ${booking.returnTrip ? `<p><b>Return Flight:</b> ${booking.returnFlight}, ${booking.returnSeat}, ${booking.returnDate}</p>` : ""}
    <button onclick="showConfirmation()">Confirm Booking</button>
    <br>
    <button onclick="askReturn()">⬅ Back</button>
  `);
}

// Confirmation
function showConfirmation() {
  render(`
    <h2>Congratulations 🎉</h2>
    <p>Your booking to <b>${booking.destination}</b> is confirmed!</p>
    <button onclick="showBoardingPass()">View Boarding Pass</button>
    <br>
    <button onclick="showSummary()">⬅ Back</button>
  `);
}

// Boarding pass
function showBoardingPass() {
  render(`
    <h2>Boarding Pass 🎫</h2>
    <p><b>Passenger:</b> ${booking.passengerName}</p>
    <p><b>Flight:</b> ${booking.flight}</p>
    <p><b>Seat:</b> ${booking.seat}</p>
    <p><b>Destination:</b> ${booking.destination}</p>
    <button onclick="thankYou()">Finish</button>
    <br>
    <button onclick="showConfirmation()">⬅ Back</button>
  `);
}

// Thank you screen
function thankYou() {
  render(`
    <h1>Thanks for using VoyageX! 🙏</h1>
    <button onclick="showWelcome()">Book Again</button>
  `);
}

// Start app
showWelcome();
