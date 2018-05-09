

export default function (sequelize, DataTypes) {
  const MenuMeal = sequelize.define('MenuMeal', {
    menuId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'id',
      },
      defaultValue: DataTypes.UUIDV4,
    },
    mealId: {
      type: DataTypes.UUID,
      references: {
        model: 'Meals',
        key: 'id',
      },
      defaultValue: DataTypes.UUIDV4,
    },
  }, {});

  return MenuMeal;
}
