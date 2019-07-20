'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      user_id: DataTypes.INTEGER,
      jsonph_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
    },
    {
      tableName: 'todos',
      modelName: 'Todo',
    }
  );

  Todo.associate = function(models) {
    /**
     * a todo belongs to a user
     *
     * @type {String}
     */
    Todo.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };

  return Todo;
};
