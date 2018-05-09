import Sequelize from 'sequelize';

export default class MenuDefinition {
  static attributes() {
    return {
      date: {
        type: Sequelize.DATE,
      },
      id: {
        type: Sequelize.UUID,
      },
    };
  }
}
