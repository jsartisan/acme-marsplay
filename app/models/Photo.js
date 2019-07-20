'use strict';

module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    'Photo',
    {
      album_id: DataTypes.INTEGER,
      jsonph_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING,
    },
    {
      tableName: 'photos',
      modelName: 'Photo',
    }
  );

  Photo.associate = function(models) {
    /**
     * a photo belongs to a album
     *
     * @type {String}
     */
    Photo.belongsTo(models.Album, {
      foreignKey: 'album_id',
    });
  };

  return Photo;
};
