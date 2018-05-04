class User {
  constructor(name, email, password) {
    this.name = name;
    this.password = password;
    this.email = email;
  }

  get name() {
    return this.name;
  }

  get password() {
    return this.password;
  }

  get email() {
    return this.email;
  }
}

export default User;
