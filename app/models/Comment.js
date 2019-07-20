'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      post_id: DataTypes.INTEGER,
      jsonph_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      body: DataTypes.TEXT,
    },
    {
      tableName: 'comments',
      modelName: 'Comment',
    }
  );

  Comment.associate = function(models) {};

  return Comment;
};
