const Sequelize  = require( 'sequelize') ;

module.exports = class MenuDefinition {
  static attributes() {
    return {
      dateCreated: {
        type: Sequelize.STRING,
      },
      id: {
        type: Sequelize.UUID,
      },
    };
  }
}
