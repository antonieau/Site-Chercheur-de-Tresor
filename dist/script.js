const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

if (header) {
  const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 20 || Boolean(document.querySelector('.inner-page')));
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    const label = menuButton.querySelector('.sr-only');
    if (label) label.textContent = 'Ouvrir le menu';
  };
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('open', !expanded);
    const label = menuButton.querySelector('.sr-only');
    if (label) label.textContent = expanded ? 'Ouvrir le menu' : 'Fermer le menu';
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const setDialogState = (isOpen) => document.body.classList.toggle('dialog-open', isOpen);
const closeDialog = (dialog) => {
  if (dialog?.open) dialog.close();
};

const artDialog = document.querySelector('[data-art-dialog]');
if (artDialog) {
  const dialogImage = artDialog.querySelector('img');
  const dialogTitle = artDialog.querySelector('p');
  document.querySelectorAll('[data-artwork]').forEach((button) => {
    button.addEventListener('click', () => {
      const sourceImage = button.querySelector('img');
      dialogImage.src = sourceImage.currentSrc || sourceImage.src;
      dialogImage.alt = sourceImage.alt;
      dialogTitle.textContent = button.dataset.artwork;
      artDialog.showModal();
      setDialogState(true);
    });
  });
  artDialog.querySelector('[data-close-art]')?.addEventListener('click', () => closeDialog(artDialog));
  artDialog.addEventListener('click', (event) => {
    if (event.target === artDialog) closeDialog(artDialog);
  });
  artDialog.addEventListener('close', () => setDialogState(false));
}

const contactDialog = document.querySelector('[data-contact-dialog]');
const contactButton = document.querySelector('[data-open-contact]');
if (contactDialog && contactButton) {
  contactButton.addEventListener('click', () => {
    contactDialog.showModal();
    setDialogState(true);
  });
  contactDialog.querySelector('[data-close-contact]')?.addEventListener('click', () => closeDialog(contactDialog));
  contactDialog.addEventListener('click', (event) => {
    if (event.target === contactDialog) closeDialog(contactDialog);
  });
  contactDialog.addEventListener('close', () => setDialogState(false));
  contactDialog.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('.form-status');
    status.hidden = false;
    status.textContent = 'Merci. Ceci est une démonstration : votre message n’a pas été envoyé.';
  });
}

const galleryDialog = document.querySelector('[data-gallery-dialog]');
const galleryItems = [...document.querySelectorAll('[data-gallery-item]')];
if (galleryDialog && galleryItems.length) {
  const dialogImage = galleryDialog.querySelector('img');
  const dialogTitle = galleryDialog.querySelector('.gallery-dialog-title');
  const dialogCount = galleryDialog.querySelector('[data-gallery-count]');
  let currentIndex = 0;
  let returnFocus = null;

  const showGalleryImage = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const sourceImage = item.querySelector('img');
    dialogImage.src = sourceImage.currentSrc || sourceImage.src;
    dialogImage.alt = sourceImage.alt;
    dialogTitle.textContent = item.dataset.caption;
    dialogCount.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      returnFocus = item;
      showGalleryImage(index);
      galleryDialog.showModal();
      setDialogState(true);
      galleryDialog.querySelector('[data-close-gallery]').focus();
    });
  });
  galleryDialog.querySelector('[data-gallery-previous]').addEventListener('click', () => showGalleryImage(currentIndex - 1));
  galleryDialog.querySelector('[data-gallery-next]').addEventListener('click', () => showGalleryImage(currentIndex + 1));
  galleryDialog.querySelector('[data-close-gallery]').addEventListener('click', () => closeDialog(galleryDialog));
  galleryDialog.addEventListener('click', (event) => {
    if (event.target === galleryDialog) closeDialog(galleryDialog);
  });
  galleryDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showGalleryImage(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showGalleryImage(currentIndex + 1);
    }
  });
  galleryDialog.addEventListener('close', () => {
    setDialogState(false);
    returnFocus?.focus();
  });
}
