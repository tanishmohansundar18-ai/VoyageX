function chooseType(type) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById('step2').classList.add('active');
  document.getElementById("formTitle").innerText = type + " Booking Form";
}
