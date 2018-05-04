'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var OrderMeal = sequelize.define('OrderMeal', {
    orderId: DataTypes.UUID,
    mealId: DataTypes.UUID
  }, {});

  return OrderMeal;
};
//# sourceMappingURL=ordermeal.js.map