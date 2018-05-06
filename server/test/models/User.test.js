
/* eslint no-undef : "warn" */
import User from '../../models/User';
import { assert } from 'chai';


describe('caterer', () => {
  const email = 'email';
  const name = 'chi';
  const pass = 'password';
  const user = new User(name, email, pass);


  it('expects creted value to be an object', () => {
    assert.isObject(user);
  });

  it('expects creted value to be a subclass of caterer', () => {
    assert.isTrue(user instanceof User);
  });


  it('expects creted value to be a  to have an email attribute ', () => {
    assert.isDefined(user.email);
  });

  it('expects creted value to be a  to have an name attribute ', () => {
    assert.isDefined(user.name);
  });

  it('expects creted value to be a  to have an password attribute ', () => {
    assert.isDefined(user.password);
  });


  it(`expects creted value of email to be ${email}`, () => {
    assert.isTrue(user.email == email);
  });

  it(`expects creted value of email to be ${name}`, () => {
    assert.isTrue(user.name == name);
  });
  it(`expects creted value of email to be ${pass}`, () => {
    assert.isTrue(user.password == pass);
  });
});
