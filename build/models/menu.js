'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    dateCreated: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      unique: true

    }

  }, {});
  Menu.associate = function (models) {
    Menu.belongsToMany(models.Meal, {
      foreignkey: 'MenuId',
      through: models.MenuMeal,
      onDelete: 'NONE',
      as: 'meals'
    });
  };
  return Menu;
};
//# sourceMappingURL=menu.js.map