

export default function (sequelize, DataTypes) {
  const MenuMeal = sequelize.define('MenuMeal', {
    menuId: DataTypes.UUID,
    mealId: DataTypes.UUID,
  }, {});

  return MenuMeal;
}
