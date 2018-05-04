'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sequelize = require('sequelize');

module.exports = function () {
  function MenuDefinition() {
    _classCallCheck(this, MenuDefinition);
  }

  _createClass(MenuDefinition, null, [{
    key: 'attributes',
    value: function attributes() {
      return {
        dateCreated: {
          type: Sequelize.STRING
        },
        id: {
          type: Sequelize.UUID
        }
      };
    }
  }]);

  return MenuDefinition;
}();
//# sourceMappingURL=menu-definitions.js.map