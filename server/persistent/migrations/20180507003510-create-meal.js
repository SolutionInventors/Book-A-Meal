/* eslint no-unused-vars:warn */
/* eslint func-names: off */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB,
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
  down(queryInterface, Sequelize) { return queryInterface.dropTable('Meals'); },
};

