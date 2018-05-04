'use strict';

/* eslint no-unused-vars:warn */
/* eslint func-names: off */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: true
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateCreated: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Menus');
  }
};
//# sourceMappingURL=20180507003741-create-menu.js.map