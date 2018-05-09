/* eslint no-unused-vars:warn */
/* eslint func-names: off */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      dateCreated: {
        type: Sequelize.DATE,
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
  down(queryInterface, Sequelize) { return queryInterface.dropTable('Menus'); },
};
