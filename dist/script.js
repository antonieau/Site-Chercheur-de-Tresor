const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const artDialog = document.querySelector('[data-art-dialog]');
const artDialogImage = artDialog.querySelector('img');
const artDialogTitle = artDialog.querySelector('p');

document.querySelectorAll('[data-artwork]').forEach((button) => {
  button.addEventListener('click', () => {
    const sourceImage = button.querySelector('img');
    artDialogImage.src = sourceImage.src;
    artDialogImage.alt = sourceImage.alt;
    artDialogTitle.textContent = `${button.dataset.artwork} · Attribution à confirmer`;
    artDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

const closeDialog = (dialog) => {
  dialog.close();
  document.body.classList.remove('dialog-open');
};

document.querySelector('[data-close-art]').addEventListener('click', () => closeDialog(artDialog));

const contactDialog = document.querySelector('[data-contact-dialog]');
document.querySelector('[data-open-contact]').addEventListener('click', () => {
  contactDialog.showModal();
  document.body.classList.add('dialog-open');
});
document.querySelector('[data-close-contact]').addEventListener('click', () => closeDialog(contactDialog));

[artDialog, contactDialog].forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
});

document.querySelector('[data-contact-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const status = event.currentTarget.querySelector('.form-status');
  status.hidden = false;
  status.textContent = 'Merci. Dans la version finale, votre demande sera transmise à la galerie.';
});
