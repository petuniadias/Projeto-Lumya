import * as User from '../models/UserModel.js';

User.init();

//REGISTER & LOGIN
const name = document.querySelector('.name');
const username = document.querySelector('.username');
const mail = document.querySelector('.mail');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.confirm-password');


  //REGISTER BTN
const registerBtn = document.querySelector('.register-btn');

registerBtn.addEventListener('click', (event) => {
  event.preventDefault();

  try {
    User.add(name.value, username.value, mail.value, password.value, confirmPassword.value, 0, [], [], []);
    alert('Conta criada com sucesso!')
  } catch (err) {
    alert(err.message);
  }
});

console.log(name.value, username.value, mail.value, password.value);

