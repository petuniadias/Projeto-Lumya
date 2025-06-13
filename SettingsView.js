import * as User from '../models/UserModel.js';

document.addEventListener("DOMContentLoaded", () => {
  navbarView();
  initSettings();
});

function navbarView() {
  User.init();

  let result = '';

  if(User.isLogged()) {
    const user = User.getUserLogged();
    result += `
      <div class="left-side">
        <div>Planner</div>
        <div>FAQ</div>
      </div>

      <a class="logo" href="/index.html">
        <img src="/media/img/logo.png">
      </a>

      <div class="right-side">
        <div class="points">
          <img src="/media/icons/points.svg">
          <div class="numPoints">2000 Points</div>
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
        <div>Planner</div>
        <div>FAQ</div>
      </div>

      <a class="logo" href="/index.html">
        <img src="/media/img/logo.png">
      </a>

      <div class="right-side">
        <a class="login-nav-btn" href="/html/login.html">Login</a>
        <a class="register-nav-btn" href="/html/register.html">Register</a>
      </div>
    `;
  }

  const nav = document.querySelector("nav");
  if (nav) {
    nav.innerHTML = result;
  }

  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (event) => {
      event.preventDefault();
      User.logout();
      location.href = "/index.html";
    });
  }
}

const darkModeToggle = document.getElementById("darkMode");
if (darkModeToggle) {
  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
    console.log(`🌙 Dark mode ${darkModeToggle.checked ? "ativado" : "desativado"}`);
  });
}

  document.getElementById('add-card-btn').addEventListener('click', function () {
    document.getElementById('add-card-section').style.display = 'none';
    document.getElementById('card-form').style.display = 'block';
  });

  document.addEventListener('DOMContentLoaded', () => {
    const addCardBtn = document.getElementById('add-card-btn');
    const addCardSection = document.getElementById('add-card-section');
    const cardForm = document.getElementById('card-form');

    if (addCardBtn) {
      addCardBtn.addEventListener('click', () => {
        addCardSection.style.display = 'none';
        cardForm.style.display = 'block';
      });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
  const showCardFormBtn = document.getElementById("show-card-form");
  const cardForm = document.getElementById("add-card-form");
  const deleteBtn = document.getElementById("delete-account-btn");

  // Mostrar/esconder formulário
  showCardFormBtn.addEventListener("click", () => {
    cardForm.classList.toggle("hidden");
  });

  // Guardar cartão (localStorage para simulação)
  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const card = {
      name: document.getElementById("cardName").value,
      number: document.getElementById("cardNumber").value,
      validThru: document.getElementById("validThru").value,
      country: document.getElementById("country").value,
      locality: document.getElementById("locality").value,
      postcode: document.getElementById("postcode").value,
      address: document.getElementById("address").value,
    };

    localStorage.setItem("userCard", JSON.stringify(card));
    alert("Card added successfully!");
    cardForm.reset();
    cardForm.classList.add("hidden");
  });

  // Apagar conta
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete your account?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/index.html";
    }
  });
});

function initSettings() {
  // Aqui poderás adicionar futuras funcionalidades JS para a página de settings
  console.log("Settings page initialized.");
}