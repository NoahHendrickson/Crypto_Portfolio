const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [],
            backgroundColor: [
                'rgb(2, 142, 119)',
                'rgb(145, 255, 156)',
                'rgba(244, 246, 231, 1)',
                'rgb(250, 124, 8)',
                'rgba(132, 126, 115, 1)',
            ],
            borderColor: [
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
              'rgb(21, 22, 26)',
            ],
            borderWidth: 0
        }]
    },
    options: {
      lugins: {
        legend: {
            display: false,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        }
    }
    }
});



const navLinks = document.querySelector('.nav-links')
const doc = document
document.addEventListener('click', e => {
  const dropdownButton = e.target.matches('.nav-button')
  if (!dropdownButton && e.target.closest(".dropdown") != null) return

  let currentDropdown
  if(dropdownButton) {
    currentDropdown = e.target.closest('.dropdown')
    currentDropdown.classList.toggle('active')
    e.target.closest('.nav-button').classList.toggle('active')
  } 
  let currentButton = e.target.closest('.nav-button')
  document.querySelectorAll(".nav-button.active").forEach(button => {
    if (button === currentButton) return
    button.classList.remove("active")
  })
  
  document.querySelectorAll(".dropdown.active").forEach(dropdown => {
    if (dropdown === currentDropdown) return
    dropdown.classList.remove("active")
  })
})



const addCrypto = () => {
  const table = document.querySelector('.wallet')
  const row = table.insertRow();
  const cell1 = row.insertCell()
  const cell2 = row.insertCell()
  const cell3 = row.insertCell()

  cell1.innerHTML = document.querySelector('.ticker').value;
  cell2.innerHTML =  document.querySelector('.amount').value;
  cell3.innerHTML =  document.querySelector('.exchange').value;
}

let assetNames = []
let assetAmounts = []
function cryptoName() {
  assetNames.push(document.querySelector('.ticker').value)
  assetAmounts.push(document.querySelector('.amount').value)
}



function updateChart() {
  myChart.data.datasets[0].data = []
  myChart.data.labels = []
  assetNames.forEach(element => {
    myChart.data.labels.push(element)
  });
  assetAmounts.forEach(e => {
    myChart.data.datasets[0].data.push(e)
  });

  console.log(myChart.data.labels)
  console.log(myChart.data.datasets[0].data)
  myChart.update();
}


  
