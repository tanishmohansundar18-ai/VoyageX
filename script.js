// --------- STATE ---------
const state = {
  type: "",               // "domestic" | "international"
  destination: "",
  flight: "",             // flight code/name
  time: "",               // chosen time slot
  seatClass: "Economy",
  name: "",
  phone: "",
  email: "",
  customers: 1,
  age: 1,
  departure: "",
  returnDate: "",
  totalPrice: 0
};

// Destinations
const DOMESTIC = [
  "Mumbai","Bengaluru","Chennai","Delhi","Hyderabad","Thiruvananthapuram","Kolkata","Jaipur","Srinagar"
];
const INTERNATIONAL = [
  "New York","Sydney","Paris","London","Tokyo","Singapore","Dubai","Maldives","Bali","Zurich"
];

// Flights per type
const FLIGHTS = {
  domestic: [
    { name: "IndiGo 6E-202", times: ["06:30","12:15","22:10"] },
    { name: "Air India AI-301", times: ["08:00","14:45","20:30"] },
    { name: "Akasa Air QP-110", times: ["07:20","13:35","21:05"] }
  ],
  international: [
    { name: "Emirates EK-500", times: ["07:20","15:10","23:40"] },
    { name: "Singapore Airlines SQ-423", times: ["02:50","11:35","19:25"] },
    { name: "Qatar Airways QR-572", times: ["01:15","09:45","18:10"] },
    { name: "Vistara UK-105", times: ["06:10","13:55","22:05"] }
  ]
};

// --------- NAV ---------
function show(screenId){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}
function backTo(screenId){ show(screenId); }

function goToType(){ show("screen2"); }

function setType(type){
  state.type = type;
  populateDestinations();
  show("screen3");
}

function populateDestinations(){
  const wrap = document.getElementById("destinations");
  wrap.innerHTML = "";
  const list = state.type === "domestic" ? DOMESTIC : INTERNATIONAL;
  list.forEach(city => {
    const b = document.createElement("button");
    b.className = "primary";
    b.textContent = city;
    b.onclick = () => selectDestination(city);
    wrap.appendChild(b);
  });
}

function selectDestination(city){
  state.destination = city;
  populateFlights();
  show("screen4");
}

function populateFlights(){
  const list = FLIGHTS[state.type] || [];
  const container = document.getElementById("flightList");
  const timeSlots = document.getElementById("timeSlots");
  const continueBtn = document.getElementById("flightContinue");

  container.innerHTML = "";
  timeSlots.innerHTML = "";
  state.flight = "";
  state.time = "";
  continueBtn.disabled = true;

  list.forEach(f => {
    const btn = document.createElement("button");
    btn.className = "ghost";
    btn.textContent = f.name;
    btn.onclick = () => {
      state.flight = f.name;
      // Render time slot buttons for the chosen flight
      timeSlots.innerHTML = "";
      f.times.forEach(t => {
        const tb = document.createElement("button");
        tb.className = "primary";
        tb.textContent = `${t}`;
        tb.onclick = () => {
          state.time = t;
          continueBtn.disabled = false;
          // visual selection cue
          [...timeSlots.querySelectorAll("button")].forEach(x=>x.classList.remove("selected"));
          tb.classList.add("selected");
        };
        timeSlots.appendChild(tb);
      });
      // Visual selection cue for flight
      [...container.querySelectorAll("button")].forEach(x=>x.classList.remove("selected"));
      btn.classList.add("selected");
    };
    container.appendChild(btn);
  });

  // seat class radios
  document.querySelectorAll("input[name='seatClass']").forEach(r=>{
    r.onchange = (e)=>{ state.seatClass = e.target.value; };
  });
}

function goToDetails(){
  // ensure seat class is captured (default already set)
  const checked = document.querySelector("input[name='seatClass']:checked");
  if (checked) state.seatClass = checked.value;
  show("screen5");
}

// --------- DETAILS / SUMMARY / PRICE ---------
document.getElementById("detailsForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  state.name = document.getElementById("name").value.trim();
  state.phone = document.getElementById("phone").value.trim();
  state.email = document.getElementById("email").value.trim();
  state.customers = Math.max(1, parseInt(document.getElementById("customers").value || "1", 10));
  state.age = Math.max(1, parseInt(document.getElementById("age").value || "1", 10));
  state.departure = document.getElementById("departure").value;
  state.returnDate = document.getElementById("returnDate").value;

  // compute price and show summary
  state.totalPrice = computeTotalPrice();
  renderSummary();
  show("screen6");
});

function computeTotalPrice(){
  // Base per person per day & discount
  const basePerDay = state.type === "international" ? 60000 : 30000;
  const discount = state.type === "international" ? 0.35 : 0.25;

  // day count
  const dep = new Date(state.departure);
  const ret = new Date(state.returnDate);
  let days = Math.ceil((ret - dep) / (1000*60*60*24));
  if (!isFinite(days) || days < 1) days = 1; // minimum 1 day

  // price before surcharges/discount
  let perPerson = basePerDay * days;

  // surcharge: departure within 1 month of today
  const today = new Date();
  const monthDiff = (dep.getFullYear() - today.getFullYear())*12 + (dep.getMonth() - today.getMonth());
  if (monthDiff < 1) perPerson += 10000;

  // surcharge: Christmas window Dec 20–31
  if (dep.getMonth() === 11 && dep.getDate() >= 20 && dep.getDate() <= 31) {
    perPerson += 15000;
  }

  // apply discount
  perPerson = perPerson * (1 - discount);

  // seat class modifier (optional small multiplier)
  const seatMods = { "Economy": 1, "Premium Economy": 1.25, "Business": 1.6 };
  perPerson = perPerson * (seatMods[state.seatClass] || 1);

  return Math.round(perPerson * state.customers);
}

function renderSummary(){
  const box = document.getElementById("summaryBox");
  const currency = `₹${state.totalPrice.toLocaleString('en-IN')}`;
  box.innerHTML = `
    <div class="row"><span>Passenger</span><strong>${state.name}</strong></div>
    <div class="row"><span>Type</span><strong>${capitalize(state.type)}</strong></div>
    <div class="row"><span>Destination</span><strong>${state.destination}</strong></div>
    <div class="row"><span>Flight</span><strong>${state.flight}</strong></div>
    <div class="row"><span>Seat Class</span><strong>${state.seatClass}</strong></div>
    <div class="row"><span>Time</span><strong>${state.time}</strong></div>
    <div class="row"><span>Departure</span><strong>${state.departure || "-"}</strong></div>
    <div class="row"><span>Return</span><strong>${state.returnDate || "-"}</strong></div>
    <div class="row"><span>Passengers</span><strong>${state.customers}</strong></div>
    <div class="row total"><span>Total Price</span><strong>${currency}</strong></div>
  `;
  // style
  box.querySelectorAll(".row").forEach(r=>{
    r.style.display="flex";
    r.style.justifyContent="space-between";
    r.style.padding="8px 0";
    r.style.borderBottom="1px dashed #eee";
  });
  const last = box.querySelector(".row.total");
  if (last){ last.style.borderBottom="0"; last.querySelector("strong").style.fontSize="18px"; }
}

function confirmAndShowPass(){
  // Fill boarding pass
  document.getElementById("bpName").textContent = state.name;
  document.getElementById("bpType").textContent = capitalize(state.type);
  document.getElementById("bpDestination").textContent = state.destination;
  document.getElementById("bpFlight").textContent = state.flight;
  document.getElementById("bpSeatClass").textContent = state.seatClass;
  document.getElementById("bpTime").textContent = state.time;
  document.getElementById("bpDepart").textContent = state.departure || "-";
  document.getElementById("bpReturn").textContent = state.returnDate || "-";
  document.getElementById("bpCust").textContent = String(state.customers);
  document.getElementById("bpTotal").textContent = `₹${state.totalPrice.toLocaleString('en-IN')}`;

  // random seat like 12A
  const letters = ["A","B","C","D","E","F"];
  const seat = `${Math.floor(Math.random()*30)+1}${letters[Math.floor(Math.random()*letters.length)]}`;
  document.getElementById("bpSeat").textContent = seat;

  // booking code
  const code = makeCode(6);
  document.getElementById("bpCode").textContent = `PNR: ${code}`;

  // QR
  const qrWrap = document.getElementById("qrcode");
  qrWrap.innerHTML = "";
  new QRCode(qrWrap, {
    text: `VoyageX | ${code}
Name: ${state.name}
Type: ${state.type}
To: ${state.destination}
Flight: ${state.flight} (${state.seatClass})
Depart: ${state.departure} ${state.time}
Passengers: ${state.customers}
Total: ₹${state.totalPrice.toLocaleString('en-IN')}`,
    width: 140,
    height: 140
  });

  show("screen7");
}

// --------- HELPERS ---------
function capitalize(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : s; }
function makeCode(len){
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i=0;i<len;i++) out += chars[Math.floor(Math.random()*chars.length)];
  return out;
}
