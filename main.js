// Nav dropdown buttons

const navLinks = document.querySelector(".nav-links");
const doc = document;
document.addEventListener("click", (e) => {
  const dropdownButton = e.target.matches(".nav-button");
  if (!dropdownButton && e.target.closest(".dropdown") != null) return;

  let currentDropdown;
  if (dropdownButton) {
    currentDropdown = e.target.closest(".dropdown");
    currentDropdown.classList.toggle("active");
    e.target.closest(".nav-button").classList.toggle("active");
  }
  let currentButton = e.target.closest(".nav-button");
  document.querySelectorAll(".nav-button.active").forEach((button) => {
    if (button === currentButton) return;
    button.classList.remove("active");
  });

  document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

// slidedown buttons

const main = document.querySelector(".main");

main.addEventListener("click", (e) => {
  const slideDown = document.querySelector(".content-slide");
  const contentButton = document.querySelector(".content-button");
  // let checkmark = document.createTextNode("🆗");
  const five = document.querySelector(".five");
  if (e.target.matches(".content-button")) {
    e.target.classList.toggle("active");
  }
  if (e.target.matches(".five")) {
    currentValue.classList.toggle("active");
  }
});

// USD format

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// getting crypto info

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
)
  .then((response) => response.json())
  .then((data) => cryptoInfo.push(data));

// pie chart
const options = {
  legend: {
    position: "bottom",
  },
  title: {
    display: true,
    text: "Portfolio",
  },
};

const data = {
  labels: [],

  datasets: [
    {
      label: "My First Dataset",
      data: [],
      backgroundColor: [
        "rgba(2, 142, 119, .5)",
        "rgba(0, 202, 202, .5)",
        "rgba(145, 255, 156, .5)",
        "rgba(253, 117, 73, .5)",
        "rgba(7, 214, 175, .5)",
      ],
      borderColor: [
        "rgba(2, 142, 119, 1)",
        "rgba(0, 202, 202, 1)",
        "rgba(145, 255, 156, 1)",
        "rgba(253, 117, 73, 1)",
        "rgba(7, 214, 175, 1)",
      ],
      hoverOffset: 4,
    },
  ],
};
const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: options,
});

const currentValue = document.querySelector(".current-value");

let portfolioValues = [];
let totalValues = [];
let assetAmounts = [];

let cryptoInfo = [];

function addToPriceSlider() {
  const parentE = document.querySelector(".price-slider");
  const siblingE = document.querySelector(".asset-slideout");
  const newSpan = document.createElement("span");
  newSpan.classList.add("assets");
  const cryptoTicker = document.querySelector(".add-asset-button").value;
  const displayTicker = cryptoTicker.toUpperCase();
  newSpan.innerHTML = displayTicker;
  let ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${cryptoTicker}usdt@trade`
  );
  let lastPrice = null;
  ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.p).toFixed(2);

    newSpan.innerHTML = `${displayTicker} 🚀  ${price}`;
  };
  parentE.insertBefore(newSpan, siblingE);
}
let assetNames = [];
myChart.data.labels = assetNames;

function addCryptoToWallet() {
  const table = document.querySelector(".wallet");
  const row = table.insertRow();
  const tickerCell = row.insertCell();
  const amountCell = row.insertCell();
  const exchangeCell = row.insertCell();
  const priceCell = row.insertCell();
  const totalCell = row.insertCell();

  let values = [];

  let cryptoTicker = document.querySelector(".ticker").value;
  tickerCell.innerHTML = cryptoTicker.toUpperCase();
  amountCell.innerHTML = document.querySelector(".amount").value;
  exchangeCell.innerHTML = document.querySelector(".exchange").value;
  assetNames.push(cryptoTicker);

  let ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${cryptoTicker}usdt@trade`
  );

  ws.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    priceCell.innerHTML = parseFloat(stockObject.p).toFixed(2);
    let values = Number(amountCell.innerHTML) * Number(priceCell.innerHTML);

    totalValues.push(values);

    // totalCell.innerHTML = formatter.format(values.toFixed(2));
    totalCell.innerHTML = values.toFixed(2);
    assetAmounts.push(values);
    portfolioValues.push(
      totalValues.reduce(function (a, b) {
        return a + b;
      }, 0)
    );
    myChart.data.datasets[0].data = [];

    const trs = document.querySelectorAll("tr");
    let yolo = [];
    trs.forEach((element) => {
      const tds = element.lastChild;
      yolo = tds.innerHTML;
      if (yolo === undefined) {
        return;
      } else {
        myChart.data.datasets[0].data.push(yolo);
      }
    });
    if (assetNames.length === myChart.data.datasets[0].data.length)
      myChart.update();
    const portValue = myChart.data.datasets[0].data.reduce(function (a, b) {
      return Number(a) + Number(b);
    }, 0);
    currentValue.innerHTML = portValue.toFixed(2);
  };
}
