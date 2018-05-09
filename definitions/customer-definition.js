import Sequelize from 'sequelize';

export default class CustomerDefinitions {
  attributes() {
    return {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNulls: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNulls: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNulls: false,
      },
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNulls: false,
      },
    };
  }
}
