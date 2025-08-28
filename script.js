function goToScreen(screenId) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  // Show the target screen
  document.getElementById(screenId).classList.add("active");

  // Confirmation screen
  if (screenId === "screen3") {
    let name = document.getElementById("name").value;
    let dest = document.getElementById("destination").value;
    document.getElementById("confirmText").innerText =
      `Thanks ${name}, your trip to ${dest} is booked!`;
  }

  // Boarding pass screen
  if (screenId === "screen4") {
    let name = document.getElementById("name").value;
    let dest = document.getElementById("destination").value;

    document.getElementById("bpName").innerText = "Passenger: " + name;
    document.getElementById("bpDestination").innerText = "Destination: " + dest;

    // Generate QR Code
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
      text: `${name} - ${dest}`,
      width: 128,
      height: 128
    });
  }
}
