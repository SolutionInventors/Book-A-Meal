

export default function (sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {});
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      foreignkey: 'menuId',
      otherKey: 'mealId',
      through: models.MenuMeal,
      onDelete: 'NONE',
      as: 'meals',
    });
  };
  return Menu;
}
