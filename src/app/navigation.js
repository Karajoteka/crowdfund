// open/close menu and switch icon
const menuComponent = document.querySelector('menu-component');
const menu = menuComponent.shadowRoot.querySelector('#menu');
const hamburgerIcon = document.getElementById('icon-hamburger');
const closeIcon = document.getElementById('icon-close');

hamburgerIcon.addEventListener('click', () => {
  menu.style.display = 'block';
  overlay.classList.remove('hidden');
  overlay.classList.add('block');
  hamburgerIcon.classList.add('hidden');
  closeIcon.classList.remove('hidden');
});

closeIcon.addEventListener('click', () => {
  menu.style.display = 'none';
  overlay.classList.remove('block');
  overlay.classList.add('hidden');
  closeIcon.classList.add('hidden');
  hamburgerIcon.classList.remove('hidden');
});

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
      overlay.classList.remove('block');
      overlay.classList.add('hidden');
      closeIcon.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
    }
  }
});