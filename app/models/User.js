'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      website: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      jsonph_id: DataTypes.INTEGER,
    },
    {
      tableName: 'users',
      modelName: 'User',
    }
  );

  User.associate = function(models) {
    /**
     * a user has many posts
     *
     * @type {String}
     */
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
    });

    /**
     * a user belongs to a address
     *
     * @type {String}
     */
    User.hasOne(models.Address, {
      foreignKey: 'user_id',
    });

    /**
     * a user has many albums
     *
     * @type {String}
     */
    User.hasMany(models.Album, {
      foreignKey: 'user_id',
    });

    /**
     * a user belongs to a company
     *
     * @type {String}
     */
    User.belongsTo(models.Company, {
      foreignKey: 'company_id',
    });
  };

  return User;
};
