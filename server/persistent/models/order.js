

export default function (sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerId: DataTypes.STRING,
    date: DataTypes.DATE,
  }, {});
  Order.associate = (models) => {
    Order.hasOne(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });

    Order.belongsToMany(models.Meal, {
      through: models.OrderMeal,
      foreignKey: 'orderId',
      onDelete: 'NONE',
    });
  };
  return Order;
}
