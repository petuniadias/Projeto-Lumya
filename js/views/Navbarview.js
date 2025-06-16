import * as User from '../models/UserModel.js';

console.log(User.isLogged());

function navbarView() {
  User.init();

  let result = '';

  //MUDAR A NAVBAR CONSOANTE A AUTENTICAÇÃO
  
  if(User.isLogged()) {
    const user = User.getUserLogged();
    result += `
      <div class="left-side">
      <div>
        Planner
      </div>
      <div>
        FAQ
      </div>
    </div>

    <a class="logo" href="/index.html">
      <img src="/media/img/logo.png">
    </a>

    <div class="right-side">
      <div class="points">
        <img src="/media/icons/points.svg">
        <div class="numPoints">${user.points} Points </div>
      </div>
      <div class="notifications">
        <img src="/media/icons/notifications.svg">
        <div class="notifications-title">Notifications</div>
      </div>
      <div class="dropdown">
        <div class="profile">
          <img src="/media/icons/profile.svg">
          <div class="profileName">${user.name}</div>
        </div>
        <div class="dropdown-content text-center">
          <a href="/html/profile.html">My profile</a>
          <a href="/html/settings.html">Settings</a>
          <a class="logout-btn" href="/index.html">Log Out</a>
        </div>
      </div>

      <img src="/media/icons/searchUsers.svg">
    </div>
    `;
  } else {
      result += `
      <div class="left-side">
        <div>
          Planner
        </div>
        <div>
          FAQ
        </div>
      </div>

      <a class="logo" href="/index.html">
        <img src="/media/img/logo.png">
      </a>

      <div class="right-side">
        <a class="login-nav-btn" href="../html/login.html">Login</a>
        <a class="register-nav-btn" href="../html/register.html">Register</a>
      </div>
    `;
  }

  // INJETAR CONTEÚDO NA NAVBAR
  document.querySelector("nav").innerHTML = result;

  // LOGOUT
  const logoutBtn = document.querySelector('.logout-btn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (event) => {
      event.preventDefault();
      User.logout();
      console.log(User.isLogged());
      navbarView();
    });
  }

}

navbarView();