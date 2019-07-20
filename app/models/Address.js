'use strict';

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      user_id: DataTypes.INTEGER,
      street: DataTypes.STRING,
      suite: DataTypes.STRING,
      city: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
    },
    {
      tableName: 'addresses',
      modelName: 'Address',
    }
  );

  Address.associate = function(models) {};

  return Address;
};
