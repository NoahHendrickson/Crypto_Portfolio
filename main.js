fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
)
  .then((response) => response.json())
  .then((data) => cryptoInfo.push(data));

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgb(2, 142, 119)",
          "rgb(145, 255, 156)",
          "rgba(244, 246, 231, 1)",
          "rgb(250, 124, 8)",
          "rgba(132, 126, 115, 1)",
        ],
        borderColor: [
          "rgb(21, 22, 26)",
          "rgb(21, 22, 26)",
          "rgb(21, 22, 26)",
          "rgb(21, 22, 26)",
          "rgb(21, 22, 26)",
        ],
        borderWidth: 2,
      },
    ],
  },
  options: {
    lugins: {
      legend: {
        display: false,
        labels: {
          color: "rgb(255, 99, 132)",
        },
      },
    },
  },
});

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

const main = document.querySelector(".main");

main.addEventListener("click", (e) => {
  const slideDown = document.querySelector(".content-slide");
  const contentButton = document.querySelector(".content-button");
  // let checkmark = document.createTextNode("🆗");
  const one = document.querySelector(".one");
  const five = document.querySelector(".five");
  if (e.target.matches(".content-button")) {
    e.target.classList.toggle("active");
  }
  if (e.target.matches(".four")) {
    peakValue.classList.toggle("active");
  }
  if (e.target.matches(".five")) {
    currentValue.classList.toggle("active");
  }
});

const currentValue = document.querySelector(".current");
const peakValue = document.querySelector(".peak");

const addCrypto = () => {
  refreshPrices();
  const table = document.querySelector(".wallet");
  const row = table.insertRow();
  const cell1 = row.insertCell();
  const cell2 = row.insertCell();
  const cell3 = row.insertCell();
  const cell4 = row.insertCell();
  const cell5 = row.insertCell();

  let cryptoTicker = document.querySelector(".ticker").value;
  cell1.innerHTML = cryptoTicker;
  for (i = 0; i < cryptoInfo[0].length; i++) {
    if (cryptoInfo[0][i].symbol === cryptoTicker) {
      cell4.innerHTML = cryptoInfo[0][i].current_price;
    }
  }
  cell2.innerHTML = document.querySelector(".amount").value;
  cell3.innerHTML = document.querySelector(".exchange").value;
  const values = Number(cell2.innerHTML) * Number(cell4.innerHTML);
  totalValues.push(values);

  cell5.innerHTML = values;
  assetNames.push(document.querySelector(".ticker").value);
  assetAmounts.push(values);
  const portfolioValue = totalValues.reduce(function (a, b) {
    return a + b;
  }, 0);

  currentValue.innerHTML = portfolioValue;
};

let totalValues = [];
let assetNames = [];
let assetAmounts = [];

function updateChart() {
  myChart.data.datasets[0].data = [];
  myChart.data.labels = [];
  assetNames.forEach((element) => {
    myChart.data.labels.push(element);
  });
  assetAmounts.forEach((e) => {
    myChart.data.datasets[0].data.push(e);
  });

  myChart.update();
}

let cryptoInfo = [];

function refreshPrices() {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  )
    .then((response) => response.json())
    .then((data) => cryptoInfo.push(data));
}

function addToPriceSlider() {
  refreshPrices();
  const parentE = document.querySelector(".price-slider");
  const siblingE = document.querySelector(".asset-slideout");
  const newSpan = document.createElement("span");
  newSpan.classList.add("assets");
  const newText = document.querySelector(".add-asset-button").value;
  for (i = 0; i < cryptoInfo[0].length; i++) {
    if (cryptoInfo[0][i].symbol === newText) {
      const assetSymbol = cryptoInfo[0][i].symbol;
      const assetPrice = cryptoInfo[0][i].current_price;

      newSpan.innerHTML = `${assetSymbol.toUpperCase()}  ${assetPrice}`;
      parentE.insertBefore(newSpan, siblingE);
    }
  }
}

// function getPrice() {
//   let cryptoTicker = document.querySelector(".ticker").value;
//   for (i = 0; i < cryptoInfo.length; i++) {
//     if (cryptoInfo[i].symbol === cryptoTicker) {
//       cell4.innerHTML = i.current_price
//     }
//   }
// }
