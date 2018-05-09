/* eslint no-unused-vars: warn */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Caterer', [{
    username: 'user',
    password: 'pass',
    email: 'mail',
  }]),
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Caterer', [{
      username: 'user',
    }]);
  },
};
