document.addEventListener('DOMContentLoaded', () => {
  // open/close menu and switch icon
  const menuComponent = document.querySelector('menu-component');
  const menu = menuComponent.shadowRoot.querySelector('#menu');
  const hamburgerIcon = document.getElementById('icon-hamburger');
  const closeMenuIcon = document.getElementById('icon-close');
  const overlay = document.getElementById('overlay');
  const projectDescriptionComponent = document.querySelector('project-description');
  const backButton = projectDescriptionComponent.shadowRoot.querySelector('.back-button');
  const backProjectComponent = document.querySelector('back-project');
  const backProjectModal = backProjectComponent.shadowRoot.querySelector('#back-project-modal');
  const closeModalIcon = backProjectComponent.shadowRoot.querySelector('#close-modal-icon');

  hamburgerIcon.addEventListener('click', () => {
    menu.style.display = 'block';
    overlay.classList.remove('hidden');
    overlay.classList.add('block');
    hamburgerIcon.classList.add('hidden');
    closeMenuIcon.classList.remove('hidden');
  });

  closeMenuIcon.addEventListener('click', () => {
    menu.style.display = 'none';
    overlay.classList.remove('block');
    overlay.classList.add('hidden');
    closeMenuIcon.classList.add('hidden');
    hamburgerIcon.classList.remove('hidden');
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
        overlay.classList.remove('block');
        overlay.classList.add('hidden');
        closeMenuIcon.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
      }
    }
  });

  function showModal() {
    backProjectModal.style.display = 'block';
    overlay.classList.remove('hidden');
    overlay.classList.add('block');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    backProjectModal.style.display = 'none';
    overlay.classList.remove('block');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';

    const rewardComponentsInModal = backProjectModal.querySelectorAll('reward-component-in-modal');
    rewardComponentsInModal.forEach(rewardComponent => {
      const checkbox = rewardComponent.shadowRoot.querySelector('.custom-checkbox');
      const section = checkbox.closest('section');
      const dropdown = section.querySelector('.dropdown');
      const hr = section.querySelector('hr');

      if (checkbox.classList.contains('active')) {
        checkbox.classList.remove('active');
        checkbox.checked = false;
        section.classList.remove('active-border');
        if (dropdown) {
          dropdown.style.visibility = 'hidden';
          dropdown.style.height = '0';
        }
        if (hr) {
          hr.style.visibility = 'hidden';
        }
      }
    });
  }

  backButton.addEventListener('click', showModal);
  closeModalIcon.addEventListener('click', hideModal);

  backProjectModal.addEventListener('click', (event) => {
    if (event.target === backProjectModal) {
      hideModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideModal();
    }
  });
});


// active/switch checkboxes
let activeCheckboxes = [];
let activeSections = [];
let activeDropdowns = [];
let activeHrs = [];

document.addEventListener('checkbox-clicked', (event) => {

  const clickedCheckbox = event.detail.checkbox;
  const clickedSection = clickedCheckbox.closest('section');
  const clickedDropdown = clickedSection.querySelector('.dropdown');
  const clickedHr = clickedSection.querySelector('hr');

  // Desactivar todos los checkboxes activos
  activeCheckboxes.forEach((checkbox, index) => {
    if (checkbox !== clickedCheckbox && checkbox.classList.contains('active')) {
      checkbox.classList.remove('active');
      activeSections[index].classList.remove('active-border');
      if (activeDropdowns[index]) {
        activeDropdowns[index].style.visibility = 'hidden';
        activeDropdowns[index].style.height = '0';
      }
      if (activeHrs[index]) {
        activeHrs[index].style.visibility = 'hidden';
      }
    }
  });

  // Agregar el checkbox clicado a la lista de checkboxes activos
  activeCheckboxes = [clickedCheckbox];
  activeSections = [clickedSection];
  activeDropdowns = [clickedDropdown];
  activeHrs = [clickedHr];

  clickedCheckbox.classList.add('active');
  clickedSection.classList.add('active-border');
  if (clickedDropdown) {
    clickedDropdown.style.visibility = 'visible';
    clickedDropdown.style.height = 'auto';
  }
  if (clickedHr) {
    clickedHr.style.visibility = 'visible';
  }
});