'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerId: DataTypes.STRING,
    dateCreated: DataTypes.STRING
  }, {});
  Order.associate = function (models) {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE'
    });

    Order.belongsToMany(models.Meal, {
      through: models.OrderMeal,
      foreignKey: 'orderId',
      onDelete: 'NONE',
      as: 'meals'
    });
  };
  return Order;
};
//# sourceMappingURL=order.js.map