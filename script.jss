// Packages per country
const countryPackages = {
  UK: [
    {name: "Economy", price: 1200},
    {name: "Premium", price: 2500},
    {name: "Luxury", price: 5000}
  ],
  USA: [
    {name: "Economy", price: 1500},
    {name: "Premium", price: 2800},
    {name: "Luxury", price: 5500}
  ],
  India: [
    {name: "Economy", price: 800},
    {name: "Premium", price: 1500},
    {name: "Luxury", price: 3000}
  ],
  Australia: [
    {name: "Economy", price: 1800},
    {name: "Premium", price: 3200},
    {name: "Luxury", price: 6000}
  ],
  Japan: [
    {name: "Economy", price: 2000},
    {name: "Premium", price: 3500},
    {name: "Luxury", price: 6500}
  ],
  Africa: [
    {name: "Economy", price: 1000},
    {name: "Premium", price: 2200},
    {name: "Luxury", price: 4500}
  ]
};

// Backgrounds per country
const countryBackgrounds = {
  UK: "url('images/uk.jpg')",
  USA: "url('images/usa.jpg')",
  India: "url('images/india.jpg')",
  Australia: "url('images/australia.jpg')",
  Japan: "url('images/japan.jpg')",
  Africa: "url('images/africa.jpg')"
};

let selectedCountry = "";
let selectedPackage = "";

// Landing → Packages
document.querySelectorAll(".country-cube").forEach(cube => {
  cube.addEventListener("click", () => {
    selectedCountry = cube.dataset.country;
    const packagesPage = document.getElementById("packagesPage");

    // Set dynamic background
    packagesPage.style.backgroundImage = countryBackgrounds[selectedCountry];
    packagesPage.style.backgroundSize = "cover";
    packagesPage.style.backgroundPosition = "center";
    packagesPage.style.backgroundRepeat = "no-repeat";

    document.getElementById("landingPage").style.display = "none";
    packagesPage.style.display = "block";
    document.getElementById("countryTitle").innerText = `Explore ${selectedCountry} Packages`;

    const container = document.getElementById("packagesContainer");
    container.innerHTML = "";
    countryPackages[selectedCountry].forEach(pkg => {
      const card = document.createElement("div");
      card.className = "package-card";
      card.innerHTML = `
        <h3>${pkg.name}</h3>
        <p>Price: ₹${pkg.price}</p>
        <button onclick="bookPackage('${pkg.name}', ${pkg.price})">Select Package</button>
      `;
      container.appendChild(card);
    });
  });
});

function goBack() {
  document.getElementById("packagesPage").style.display = "none";
  document.getElementById("landingPage").style.display = "block";
}

function
