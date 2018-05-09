export default function (sequelize, DataTypes) {
  const OrderMeal = sequelize.define('OrderMeal', {
    orderId: DataTypes.UUID,
    mealId: DataTypes.UUID
  }, {});

  return OrderMeal;
}
