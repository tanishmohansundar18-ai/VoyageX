function goToScreen(n) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById('screen' + n);

  if (current) {
    current.classList.remove('active');
    current.classList.add('exit-left');
    setTimeout(() => current.classList.remove('exit-left'), 800);
  }

  next.classList.add('active');
}

const cities = {
  "India": ["Mumbai", "Chennai", "Bengaluru", "Delhi", "Kolkata"],
  "USA": ["New York", "Los Angeles", "Chicago", "San Francisco"],
  "UK": ["London", "Manchester", "Birmingham"],
  "Japan": ["Tokyo", "Osaka", "Kyoto"],
  "China": ["Beijing", "Shanghai", "Guangzhou"],
  "Africa": ["Cairo", "Nairobi", "Cape Town"]
};

function selectCountry(country) {
  goToScreen(3);
  document.getElementById("cityTitle").innerText = "Select City in " + country;
  const cityContainer = document.getElementById("cityOptions");
  cityContainer.innerHTML = "";
  cities[country].forEach(city => {
    const btn = document.createElement("button");
    btn.innerText = city;
    btn.onclick = () => goToScreen(4);
    cityContainer.appendChild(btn);
  });
}
