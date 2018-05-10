/* eslint no-unused-vars: warn */

export default function (sequelize, DataTypes) {
  const Meal = sequelize.define('Meal', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'No Description'
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: DataTypes.BLOB,
  }, {});

  Meal.associate = (models) => {
    Meal.belongsToMany(models.Menu, {
      foreignKey: 'MealId',
      through: models.MenuMeal,
      onDelete: 'NONE',
      as: 'menus',
    });

    Meal.belongsToMany(models.Order, {
      foreignKey: 'mealId',
      otherKey: 'orderId',
      through: models.OrderMeal,
      onDelete: 'NONE',
      as: 'orders',
    });
  };
  return Meal;
}
