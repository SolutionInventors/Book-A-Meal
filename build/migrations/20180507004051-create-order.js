'use strict';

/* eslint no-unused-vars: warn */
/* eslint func-names: off */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      customerId: {
        type: Sequelize.STRING
      },
      dateCreated: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
//# sourceMappingURL=20180507004051-create-order.js.map