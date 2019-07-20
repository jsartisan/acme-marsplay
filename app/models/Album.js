'use strict';

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      user_id: DataTypes.INTEGER,
      jsonph_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {
      tableName: 'albums',
      modelName: 'Album',
    }
  );

  Album.associate = function(models) {};

  return Album;
};
