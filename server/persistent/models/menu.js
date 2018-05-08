

export default function (sequelize, DataTypes) {
  const Menu = sequelize.define('Menu', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    dateCreated: DataTypes.DATE,
  }, {});
  Menu.associate = (models) => {
    Menu.belongsToMany(models.Meal, {
      through: models.MenuMeal,
      foreignkey: 'menuId',
      onDelete: 'NONE',
    });
  };
  return Menu;
}
