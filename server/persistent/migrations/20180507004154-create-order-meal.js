

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('OrderMeals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    orderId: {
      type: Sequelize.STRING,
    },
    mealId: {
      type: Sequelize.STRING,
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
}
export function down(queryInterface, Sequelize) { return queryInterface.dropTable('OrderMeals'); }
