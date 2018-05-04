const catererservice = require('../../services/caterer-service');
const assert = require('chai').assert;

const Caterer = require('../../models/Caterer');

describe('caterer-servics', () => {
  describe('Valid registerCaterer call ', () => {
    const email = 'email';
    const name = 'chi';
    const pass = 'password';
    const caterer = new Caterer(name, email, pass);
    const createdObj = catererservice.registercaterer(caterer);
    const ObjreturnedbyCatererNameandPass = catererservice.getCaterer(name, pass);
    const ObjreturnedbyCatererName = catererservice.getcatererByName(name);

    it('expects creted value to be an object', () => {
      assert.isObject(catererservice);

    });


    it('expects item to be registered', () => {
      assert.isDefined(createdObj);

    });


    it('expects item to return caterer when name call is used', () => {
      assert.isDefined(ObjreturnedbyCatererNameandPass);

    });

    it('expects to be a caterer when aName and Pass is used', () => {
      assert.isDefined(ObjreturnedbyCatererName);

    });


    it(`expects returned value to have an email of ${email}`, () => {
      assert.isTrue(ObjreturnedbyCatererName.email == email);
    });

    it(`expects returned value to have a name of${name}`, () => {
      assert.isTrue(ObjreturnedbyCatererName.name == name);
    });
    it(`expects returned value to have a password of ${pass}`, () => {
      assert.isTrue(ObjreturnedbyCatererName.password == pass);
    });


    it(`expects returned value to have an email of ${email}`, () => {
      assert.isTrue(ObjreturnedbyCatererNameandPass.email == email);
    });

    it(`expects returned value to have a name of${name}`, () => {
      assert.isTrue(ObjreturnedbyCatererNameandPass.name == name);
    });
    it(`expects returned value to have a password of ${pass}`, () => {
      assert.isTrue(ObjreturnedbyCatererNameandPass.password == pass);
    });



  });

  describe('Invalid call ', () => {
    const invalidObj = catererservice.registercaterer();

    it('expects created value to be an object', () => {
      assert.isObject(invalidObj);

    });

    it('expects item to be registered', () => {
      assert.isDefined(invalidObj.name);

    });
  });
});
