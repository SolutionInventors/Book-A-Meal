'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sequelize = require('sequelize');

module.exports = function () {
  function MealDefinition() {
    _classCallCheck(this, MealDefinition);
  }

  _createClass(MealDefinition, null, [{
    key: 'attributes',
    value: function attributes() {
      return {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        amount: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
        image: {
          type: Sequelize.BLOB
        },
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        }
      };
    }
  }]);

  return MealDefinition;
}();
//# sourceMappingURL=meal-definitions.js.map