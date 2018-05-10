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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dateCreated:{
        type: Sequelize.STRING,
      }
    });
  },
  down(queryInterface, Sequelize) { return queryInterface.dropTable('Menus'); },
};
