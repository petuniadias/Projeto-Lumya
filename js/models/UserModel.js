let users;

/* esta função vai existir sempre no MODEL
  carrega os users com dados
*/

export function init() {}
/* Funções para gerir utilizador */
/* quando tratar de erros usar throw */

export function isLogged() {}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */

class User {
  username = "";
  password = "";

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}