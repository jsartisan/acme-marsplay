'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      jsonph_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
    },
    {
      tableName: 'posts',
      modelName: 'Post',
    }
  );

  Post.associate = function(models) {
    /**
     * a post belongs to a user
     *
     * @type {String}
     */
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return Post;
};
