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
        "rgba(32, 176, 184, .5)",
        "rgba(145, 255, 156, .5)",
      ],
      borderColor: [
        "rgba(2, 142, 119, 1)",
        "rgba(32, 176, 184, 1)",
        "rgba(145, 255, 156, 1)",
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

// const myChart = new Chart(ctx, {
//   type: "pie",
//   options: {
//     plugins: {
//       datalabels: {
//         display: true,
//         color: "red",
//       },
//     },
//     legend: {
//       position: "top",
//     },
//   },
//   data: {
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         backgroundColor: [
//           "rgba(2, 142, 119, .5)",
//           "rgba(250, 124, 8, .5)",
//           "rgba(145, 255, 156, .5)",
//           "rgba(244, 246, 231, .5)",
//           "rgba(132, 126, 115, .5)",
//         ],
//         borderColor: [
//           "rgba(2, 142, 119, 1)",
//           "rgba(250, 124, 8, 1)",
//           "rgba(145, 255, 156, 1)",
//           "rgba(244, 246, 231, 1)",
//           "rgba(132, 126, 115, 1)",
//         ],
//         borderWidth: 3,
//       },
//     ],
//   },
// });

const currentValue = document.querySelector(".current-value");

const addCryptoToWallet = () => {
  const table = document.querySelector(".wallet");
  const row = table.insertRow();
  const tickerCell = row.insertCell();
  const amountCell = row.insertCell();
  const exchangeCell = row.insertCell();
  const priceCell = row.insertCell();
  const totalCell = row.insertCell();

  let cryptoTicker = document.querySelector(".ticker").value;
  for (i = 0; i < cryptoInfo[0].length; i++) {
    if (cryptoTicker === "avax") {
      let cryptoTicker = document.querySelector(".ticker").value.toUpperCase();
      tickerCell.innerHTML = cryptoTicker.toUpperCase();
      priceCell.innerHTML = cryptoInfo[0][i].current_price;
      amountCell.innerHTML = document.querySelector(".amount").value;
      exchangeCell.innerHTML = document.querySelector(".exchange").value;

      const values = Number(amountCell.innerHTML) * Number(priceCell.innerHTML);

      totalCell.innerHTML = formatter.format(values.toFixed(2));
    }
    if (cryptoInfo[0][i].symbol === cryptoTicker) {
      tickerCell.innerHTML = cryptoTicker.toUpperCase();
      priceCell.innerHTML = cryptoInfo[0][i].current_price;
      amountCell.innerHTML = document.querySelector(".amount").value;
      exchangeCell.innerHTML = document.querySelector(".exchange").value;

      const values = Number(amountCell.innerHTML) * Number(priceCell.innerHTML);

      totalValues.push(values);

      totalCell.innerHTML = formatter.format(values.toFixed(2));
      assetNames.push(document.querySelector(".ticker").value);
      assetAmounts.push(values);
      portfolioValues.push(
        totalValues.reduce(function (a, b) {
          return a + b;
        }, 0)
      );

      console.log(portfolioValues);
      // const percent = (Number(amountCell.innerHTML) * Number(priceCell.innerHTML)) / portfolioValue;
      // cell6.innerHTML = percent.toFixed(2);
      const portfolioValue = portfolioValues.pop();
      currentValue.innerHTML = ` // ${formatter.format(portfolioValue)}`;
    }
  }
};

let portfolioValues = [];
let totalValues = [];
let assetNames = [];
let assetAmounts = [];

console.log(portfolioValues);
function updateChart() {
  myChart.data.datasets[0].data = [];
  myChart.data.labels = [];
  assetNames.forEach((element) => {
    myChart.data.labels.push(element.toUpperCase());
  });
  assetAmounts.forEach((e) => {
    myChart.data.datasets[0].data.push(e);
  });

  myChart.update();
}

let cryptoInfo = [];

function addToPriceSlider() {
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

let ws = new WebSocket("wss://stream.binance.com:9443/ws/usdt@trade");
ws.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);
  let btcPrice = stockObject.p;

  let myValue = Number(btcPrice) * 2;

  const test = document.querySelector(".test");
  test.innerHTML = myValue;
};
