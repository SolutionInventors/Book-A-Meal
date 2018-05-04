'use strict';

var Meal = require('../../models/Meal');
var assert = require('chai').assert;

describe('meal', function () {
    var amount = 'amount';
    var name = 'chi';
    var image = 'image1';
    var id = 'id1';
    var meal = new Meal(name, amount, image);

    it('expects created value to be an object', function () {
        assert.isObject(meal);
    });

    it('expects created value to be a subclass of meal', function () {
        assert.isTrue(meal instanceof Meal);
    });

    it('expects created value to be a  to have an amount attribute ', function () {
        assert.isDefined(meal.amount);
    });

    it('expects created value to be a  to have an name attribute ', function () {
        assert.isDefined(meal.name);
    });

    it('expects created value to be a  to have an image attribute ', function () {
        assert.isDefined(meal.image);
    });

    it('expects created value of amount to be ' + amount, function () {
        assert.isTrue(meal.amount == amount);
    });

    it('expects created value of amount to be ' + name, function () {
        assert.isTrue(meal.name == name);
    });
    it('expects created value of amount to be ' + image, function () {
        assert.isTrue(meal.image == image);
    });

    it('expects Id value to be set to id1', function () {
        assert.isDefined(meal.id(id));
    });

    it('expects created value of amount to be ' + id, function () {
        assert.isTrue(meal.id == id);
    });
    it('expects boolean value', function () {
        assert.isDefined(meal.isValid());
    });
});
//# sourceMappingURL=Meal.test.js.map
//# sourceMappingURL=Meal.test.js.map