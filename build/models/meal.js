'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'No Description'
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    image: DataTypes.BLOB
  }, {});

  Meal.associate = function (models) {
    Meal.belongsToMany(models.Menu, {
      foreignKey: 'MealId',
      through: models.MenuMeal,
      onDelete: 'NONE',
      as: 'menus'
    });

    Meal.belongsToMany(models.Order, {
      foreignKey: 'mealId',
      otherKey: 'orderId',
      through: models.OrderMeal,
      onDelete: 'NONE',
      as: 'orders'
    });
  };
  return Meal;
};
//# sourceMappingURL=meal.js.map