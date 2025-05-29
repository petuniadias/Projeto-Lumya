// BUTTONS
const achievementsSection = document.querySelector('.achievement-cards-section');
const rightButton = document.querySelector('.scroll-btn-right');
const leftButton = document.querySelector('.scroll-btn-left');


  // SCROLL ANIMATION

function buttons() {
  rightButton.addEventListener('click', () => {
    achievementsSection.scrollBy ({
      left: 320,
      behavior: 'smooth'
    });
  });

  leftButton.addEventListener('click', () => {
    achievementsSection.scrollBy ({
      left: -320,
      behavior: 'smooth'
    });
  });
}

buttons();