/* eslint no-unused-vars: warn */

export function up(queryInterface, Sequelize) {
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
}

export function down(queryInterface, Sequelize) { return queryInterface.dropTable('MenuMeals'); }
