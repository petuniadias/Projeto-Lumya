let users;

/* esta função vai existir sempre no MODEL
  carrega os users com dados
*/


// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  users = localStorage.users ? JSON.parse(localStorage.users)
}
/* Funções para gerir utilizador */
/* quando tratar de erros usar throw */

//ADICIONAR UTILIZADOR
export function add(name, username, mail, password) {
  if(username.some(user => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else {
    users.push(new User(name, username, mail, password));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// LOGIN DO UTILIZADOR
export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    return true;
  } else {
    throw Error('Invalid login!');
  }
}

export function isLogged() {

}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */

class User {
  name = '';
  username = '';
  mail = '';
  password = '';

  constructor(name, username, mail, password) {
    this.name = name;
    this.username = username;
    this.mail = mail;
    this.password = password;
  }
}