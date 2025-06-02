initdata();

function initdata() {
  // USERS
  if (!localStorage.users) {
    const users = [
      {
        username: 'admin',
        password: '1234',
      },
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }
}