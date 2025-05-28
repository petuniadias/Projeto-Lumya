initdata();

function initdata() {
  // USERS
  if (!localStorage.users) {
    const users = [
      {
        username: 'user1',
        password: 'pass1',
      },
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }
}