'use strict';

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      name: DataTypes.STRING,
      catch_phrase: DataTypes.STRING,
      bs: DataTypes.STRING,
    },
    {
      tableName: 'companies',
      modelName: 'Company',
    }
  );

  Company.associate = function(models) {};

  return Company;
};
