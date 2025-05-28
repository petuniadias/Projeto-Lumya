import * as User from '../models/UserModel';

User.init();

//REGISTER & LOGIN
const name = document.querySelector('.name');
const username = document.querySelector('.username');
const mail = document.querySelector('.mail');
const password = document.querySelector('.password');

  //REGISTER BTN
const registerBtn = document.querySelector('.register-btn');

 //LOGIN BTN
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
  try {
    User.add(name.value, username.value, mail.value, password.value)
  } catch (err) {

  }
});

loginBtn.addEventListener('click', () => {

})
