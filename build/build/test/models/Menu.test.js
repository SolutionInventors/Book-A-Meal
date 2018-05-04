'use strict';

var Menu = require('../../models/Menu');
var assert = require('chai').assert;

describe('meun', function () {
    var menuitem = ['item1', 'fh'];
    var date = 'chi';

    var menu = new Menu(menuitem, date);

    it('expects creted value to be an object', function () {
        assert.isObject(menu);
    });

    it('expects creted value to be a subclass of menu', function () {
        assert.isTrue(menu instanceof Menu);
    });

    it('expects creted value to be a  to have an date attribute ', function () {
        assert.isDefined(menu.date);
    });

    it('expects creted value to be a  to have an MENU attribute ', function () {
        assert.isDefined(menu.menu);
    });

    it('expects  value to be a string', function () {
        assert.typeOf(menu.date, 'string');
    });

    it('expects to return id ', function () {
        assert.isDefined(menu.id);
    });

    it('expects creted value to be a  boolean ', function () {
        assert.isDefined(menu.isValid);
    });
});
//# sourceMappingURL=Menu.test.js.map
//# sourceMappingURL=Menu.test.js.map