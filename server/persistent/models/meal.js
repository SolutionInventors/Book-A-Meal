/* eslint no-unused-vars: warn */

export default function (sequelize, DataTypes) {
  const Meal = sequelize.define('Meal', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      through: 'MenuMeal',
      foreignKey: 'mealId',
      onDelete: 'NONE',
    });

    Meal.belongsToMany(models.Order, {
      through: 'OrderMeal',
      foreignKey: 'mealId',
      onDelete: 'NONE',
    });
  };
  return Meal;
}
