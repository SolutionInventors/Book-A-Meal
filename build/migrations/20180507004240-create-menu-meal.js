'use strict';

/* eslint no-unused-vars: warn */
/* eslint func-names: off */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('MenuMeals', {
      MealId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Meals',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      MenuId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Menus',
          key: 'id'
        }
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('MenuMeals');
  }
};
//# sourceMappingURL=20180507004240-create-menu-meal.js.map