/* eslint no-unused-vars: warn */
/* eslint func-names: off */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('OrderMeals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:  Sequelize.UUIDV4,
      },
      orderId: {
        type: Sequelize.UUID,
      },
      mealId: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface, Sequelize) { return queryInterface.dropTable('OrderMeals'); },
};
