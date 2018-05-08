

export default function (sequelize, DataTypes) {
  const Caterer = sequelize.define('caterer', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  Caterer.associate = (models) => {
    console.log(models);
  };
  return Caterer;
}
