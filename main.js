const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['ETH', 'DOT', 'SOL', 'ADA', 'AVAX'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
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
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const navButtons = document.querySelector('.nav-buttons');


navButtons.addEventListener('click', e => {
  const profileDropdown = document.querySelector('.profile-dropdown');
  const contactDropdown = document.querySelector('.contact-dropdown');
  const supportDropdown = document.querySelector('.support-dropdown')
  const settingsDropdown = document.querySelector('.settings-dropdown')
  if(e.target.textContent === "Profile") {
    profileDropdown.classList.toggle('active')
    console.log('hi')
  }
  if(e.target.textContent === "Contact") {
    contactDropdown.classList.toggle('active')
    console.log('hi')
  }
  if(e.target.textContent === "Buy Me Chipotle") {
    supportDropdown.classList.toggle('active')
    console.log('hi')
  }
  if(e.target.textContent === "Settings") {
    settingsDropdown.classList.toggle('active')
    console.log('hi')
  }
})
console.log(navButtons)