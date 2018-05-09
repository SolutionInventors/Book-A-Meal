

export default function (sequelize, DataTypes) {
  const MenuMeal = sequelize.define('MenuMeal', {
    // MenuId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'Menus',
    //     key: 'id',
    //   },
    //   defaultValue: DataTypes.UUIDV4,
    // },
    // MealId: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'Meals',
    //     key: 'id',
    //   },
    //   defaultValue: DataTypes.UUIDV4,
    // },
  }, {});

  return MenuMeal;
}
