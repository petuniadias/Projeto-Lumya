const game = document.querySelector('.game');
const airplane = document.querySelector('.airplane');
const cloud = document.querySelector('.obstacle');

document.addEventListener('animationend', () => {
  airplane.classList.remove('up-animation');
  airplane.classList.remove('down-animation');
});

document.addEventListener('keyup', (event) => {
  if (event.key == 'ArrowUp') {
    airplane.classList.add('up-animation');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key == 'ArrowDown') {
    airplane.classList.add('down-animation');
  }
});

document.addEventListener('keydown', (event) => {
  console.log(event.key);
})
