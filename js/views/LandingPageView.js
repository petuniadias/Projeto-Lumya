import * as User from '../models/UserModel.js';

function renderLandingPage() {
  User.init();

  let result = '';
  if(User.isLogged()) {
    result += `
      <h1>Welcome back traveler!</h1>
      <p>Travel. Connect. Live unforgettable moments — with Lumya, it’s easier than ever.</p>
      <a href="html/planner.html" class="btn plan-trip-btn">Plan trip
        <img src="media/icons/plus.svg" alt="">
      </a>
    `;
  } else {
    result += `
      <h1>Turn ideas into trips — with Lumya</h1>
      <p>Travel. Connect. Live unforgettable moments — with Lumya, it’s easier than ever.</p>
      <a href="html/login.html" class="btn plan-trip-btn">Plan trip
        <img src="media/icons/plus.svg" alt="">
      </a>
    `;
  }

  // INJETAR CONTEÚDO NA NAVBAR
  document.querySelector(".planner-section").innerHTML = result;
}

renderLandingPage();