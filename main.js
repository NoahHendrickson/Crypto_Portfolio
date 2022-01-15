const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown-menu')

navLinks.addEventListener('click', e => {
  if(e.target.matches('.dropdown-button')) {
    dropdown.classList.toggle('active');
  }
  console.log('hello')
})

