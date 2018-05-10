

export default function (sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerId: DataTypes.STRING,
    dateCreated: DataTypes.STRING,
  }, {});
  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });

    Order.belongsToMany(models.Meal, {
      through: models.OrderMeal,
      foreignKey: 'orderId',
      onDelete: 'NONE',
      as: 'meals',
    });
  };
  return Order;
}
