
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  canBeRegistered() {
    return this.name && this.email && this.password;
  }
}

export default User;
