import Sequelize from 'sequelize';

export default class CatererDefinitions {
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
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNulls: false,
      },
    };
  }
}
