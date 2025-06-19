import * as User from '../models/UserModel.js';

User.init();

//REGISTER & LOGIN
const name = document.querySelector('.name');
const username = document.querySelector('.username');
const mail = document.querySelector('.mail');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.confirm-password');
const errorMessageElement = document.getElementById('registrationErrorMessage'); // Elemento para mensagens de erro



  //REGISTER BTN
const registerBtn = document.querySelector('.register-btn');

registerBtn.addEventListener('click', (event) => {
  event.preventDefault();

  if (errorMessageElement) {
    errorMessageElement.textContent = '';
    errorMessageElement.style.display = 'none';
  }

  try {
    User.add(name.value, username.value, mail.value, password.value, confirmPassword.value, 0, [], [], []);
    // Mostrar mensagem de sucesso (opcional, pode ser um redirecionamento ou outra UI)
    if (errorMessageElement) {
      errorMessageElement.textContent = 'Conta criada com sucesso!';
      errorMessageElement.style.color = 'green'; // Mudar a cor para sucesso
      errorMessageElement.style.display = 'block';
    } else {
      alert('Conta criada com sucesso!'); // Fallback
    }
    window.location.href = "/html/login.html";
  } catch (err) {
    if (errorMessageElement) {
      errorMessageElement.textContent = err.message;
      errorMessageElement.style.color = 'red';
      errorMessageElement.style.display = 'block';
    } else {
      alert(err.message);
    }
  }
});

console.log(name.value, username.value, mail.value, password.value);

