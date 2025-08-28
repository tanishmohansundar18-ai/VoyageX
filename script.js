let bookingData = {
  name: "",
  customers: "",
  age: "",
  phone: "",
  email: "",
  flight: "",
  departure: "",
  returnDate: "",
  destination: ""
};

function showScreen(screenId, destination = null) {
  // hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // save chosen destination if available
  if (destination) {
    bookingData.destination = destination;
  }

  const nextScreen = document.getElementById(screenId);

  if (nextScreen) {
    // if moving to summary, update it
    if (screenId === "summary") {
      updateSummary();
    }

    // if moving to boarding pass, update it
    if (screenId === "boardingPass") {
      updateBoardingPass();
    }

    nextScreen.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function saveDetails(event) {
  event.preventDefault();

  bookingData.name = document.querySelector("#details input[placeholder='Full Name']").value;
  bookingData.customers = document.querySelector("#details input[placeholder='Number of Customers']").value;
  bookingData.age = document.querySelector("#details input[placeholder='Age']").value;
  bookingData.phone = document.querySelector("#details input[placeholder='Phone Number']").value;
  bookingData.email = document.querySelector("#details input[placeholder='Email ID']").value;
  bookingData.flight = document.querySelector("#details select").value;
  bookingData.departure = document.querySelectorAll("#details input[type='date']")[0].value;
  bookingData.returnDate = document.querySelectorAll("#details input[type='date']")[1].value;

  showScreen("summary");
}

function updateSummary() {
  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <h2>Booking Summary</h2>
    <p><strong>Name:</strong> ${bookingData.name}</p>
    <p><strong>Destination:</strong> ${bookingData.destination}</p>
    <p><strong>Flight:</strong> ${bookingD
