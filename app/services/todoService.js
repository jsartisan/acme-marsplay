const axios = require('axios');

const config = require('@config');
const db = require('@app/models');
const userService = require('./userService');

const todoService = {
  /**
   * scrapes todos data from json placeholder
   */
  scrapeTodoFromJsonPlacehoder: async () => {
    const { baseUrl } = config.services.jsonplaceholder;

    try {
      const { data: todos } = await axios.get(`${baseUrl}/todos`);

      todoService.saveTodosInDB(todos);
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong while scraping todos');
    }
  },

  /**
   * create Todo in db
   *
   * @param todoData Object of  Todo
   */
  createTodoInDB: async todoData => {
    const user = await userService.getUserByJsonPhID(todoData.userId);

    // if user does not exist, don't do anything
    if (!user) return;

    const todo = await db.Todo.create({
      title: todoData.title,
      completed: todoData.completed,
      jsonph_id: todoData.id,
      user_id: user.id,
    });

    return todo;
  },

  /**
   * update Todo in db
   *
   * @param todoData Object of  Todo
   */
  updateTodoInDB: async todoData => {
    const user = await userService.getUserByJsonPhID(todoData.userId);

    // if user does not exist, don't do anything
    if (!user) return;

    const todo = await todoService.getTodoByJsonPhID(todoData.id);

    // if todo does not exit, don't do anything
    if (!todo) return;

    todo.update({
      title: todoData.title,
      url: todoData.url,
      thumbnail_url: todoData.thumbnailUrl,
      jsonph_id: todoData.id,
      user_id: user.id,
    });

    return todo;
  },

  /**
   * check if  Todo exists by jsonph_id
   *
   * @param jsonph_id String
   */
  doesTodoExistsByJsonPhID: async jsonph_id => {
    const todo = await todoService.getTodoByJsonPhID(jsonph_id);

    if (!todo) return false;

    return true;
  },

  /**
   * get todo by jsonph_id
   *
   * @param String jsonph_id of user
   */
  getTodoByJsonPhID: async jsonph_id => {
    const todo = await db.Todo.findOne({
      where: { jsonph_id },
    });

    return todo;
  },

  /**
   * save todos in DB
   *
   * @param todos Array of todos
   */
  saveTodosInDB: async todos => {
    for (let i = 0; i < todos.length; i++) {
      const todoData = todos[i];

      const doesTodoExists = await todoService.doesTodoExistsByJsonPhID(todoData.id);

      if (doesTodoExists === false) {
        await todoService.createTodoInDB(todoData);
      } else {
        await todoService.updateTodoInDB(todoData);
      }
    }
  },
};

module.exports = todoService;
