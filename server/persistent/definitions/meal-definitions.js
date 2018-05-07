import Sequelize from 'sequelize';

export default class MealDefinition {
  static attributes() {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      image: {
        type: Sequelize.BLOB,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    };
  }
}
