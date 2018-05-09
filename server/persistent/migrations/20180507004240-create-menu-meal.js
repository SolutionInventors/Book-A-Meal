/* eslint no-unused-vars: warn */
/* eslint func-names: off */


module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('MenuMeals', {
      menuId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Menu',
          key: 'id',
        },
      },
      mealId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Meal',
          key: 'id',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
    });
  },
  down(queryInterface, Sequelize) { return queryInterface.dropTable('MenuMeals'); },
};
