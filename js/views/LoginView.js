import * as User from '../models/UserModel.js';

User.init();

//LOGIN
const username = document.querySelector('.username');
const password = document.querySelector('.password');

 //LOGIN BTN
const loginBtn = document.querySelector('.login-btn');

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();

  try {
    User.login(
      username.value,
      password.value
    );
    alert('Login feito com sucesso!');
    window.location.href = "../index.html";
  } catch (err) {
    alert(err.message);
  }
});

console.log(username.value, password.value);