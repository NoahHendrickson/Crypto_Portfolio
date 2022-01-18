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
            borderWidth: 10
        }]
    },
    options: {
      lugins: {
        legend: {
            display: true,
            labels: {
                color: 'rgb(255, 99, 132)'
            }
        }
    }
    }
});

const navButtons = document.querySelector('.nav-buttons');


navButtons.addEventListener('click', e => {
  const profile = document.querySelector('.profile-dropdown').classList;
  const contact = document.querySelector('.contact-dropdown').classList;
  const support = document.querySelector('.support-dropdown').classList;
  const settings = document.querySelector('.settings-dropdown').classList;
  const dropdown = document.querySelectorAll('.dropdown');

  const profileButton = document.querySelector('.nav-button').classList;
  const contactButton = document.querySelector('.contact-button').classList;
  const supportButton = document.querySelector('.support-button').classList;
  const settingsButton = document.querySelector('.settings-button').classList;

  if(e.target.textContent === "Profile") {
    profile.toggle('active')
    profileButton.toggle('active')
    if(contact.contains('active') || 
      support.contains('active') || 
      settings.contains('active')) {
        contact.remove('active')
        support.remove('active')
        settings.remove('active')
        contactButton.remove('active')
        supportButton.remove('active')
        settingsButton.remove('active')
    }
  }
  if(e.target.textContent === "Contact") {
    contact.toggle('active')
    contactButton.toggle('active')
    if(profile.contains('active') || 
      support.contains('active') || 
      settings.contains('active')) {
        profile.remove('active')
        support.remove('active')
        settings.remove('active')
        profileButton.remove('active')
        supportButton.remove('active')
        settingsButton.remove('active')
    }
  }
  if(e.target.textContent === "Buy Me Chipotle") {
    support.toggle('active')
    supportButton.toggle('active')
    if(profile.contains('active') || 
      contact.contains('active') || 
      settings.contains('active')) {
        profile.remove('active')
        contact.remove('active')
        settings.remove('active')
        profileButton.remove('active')
        contactButton.remove('active')
        settingsButton.remove('active')
    }
  }
  if(e.target.textContent === "Settings") {
    settings.toggle('active')
    settingsButton.toggle('active')
    if(profile.contains('active') || 
      contact.contains('active') || 
      support.contains('active')) {
        profile.remove('active')
        contact.remove('active')
        support.remove('active')
        profileButton.remove('active')
        supportButton.remove('active')
        contactButton.remove('active')
    }
  }
})