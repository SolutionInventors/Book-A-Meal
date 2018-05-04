'use strict';

var catererservice = require('../../services/caterer-service');
var assert = require('chai').assert;

var Caterer = require('../../models/Caterer');

describe('caterer-servics', function () {
  describe('Valid registerCaterer call ', function () {
    var email = 'email';
    var name = 'chi';
    var pass = 'password';
    var caterer = new Caterer(name, email, pass);
    var createdObj = catererservice.registercaterer(caterer);
    var ObjreturnedbyCatererNameandPass = catererservice.getCaterer(name, pass);
    var ObjreturnedbyCatererName = catererservice.getcatererByName(name);

    it('expects creted value to be an object', function () {
      assert.isObject(catererservice);
    });

    it('expects item to be registered', function () {
      assert.isDefined(createdObj);
    });

    it('expects item to return caterer when name call is used', function () {
      assert.isDefined(ObjreturnedbyCatererNameandPass);
    });

    it('expects to be a caterer when aName and Pass is used', function () {
      assert.isDefined(ObjreturnedbyCatererName);
    });

    it('expects returned value to have an email of ' + email, function () {
      assert.isTrue(ObjreturnedbyCatererName.email == email);
    });

    it('expects returned value to have a name of' + name, function () {
      assert.isTrue(ObjreturnedbyCatererName.name == name);
    });
    it('expects returned value to have a password of ' + pass, function () {
      assert.isTrue(ObjreturnedbyCatererName.password == pass);
    });

    it('expects returned value to have an email of ' + email, function () {
      assert.isTrue(ObjreturnedbyCatererNameandPass.email == email);
    });

    it('expects returned value to have a name of' + name, function () {
      assert.isTrue(ObjreturnedbyCatererNameandPass.name == name);
    });
    it('expects returned value to have a password of ' + pass, function () {
      assert.isTrue(ObjreturnedbyCatererNameandPass.password == pass);
    });
  });

  describe('Invalid call ', function () {
    var invalidObj = catererservice.registercaterer();

    it('expects created value to be an object', function () {
      assert.isObject(invalidObj);
    });

    it('expects item to be registered', function () {
      assert.isDefined(invalidObj.name);
    });
  });
});
//# sourceMappingURL=caterer-service.test.js.map
//# sourceMappingURL=caterer-service.test.js.map