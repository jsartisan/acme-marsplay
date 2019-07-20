const cron = require('node-cron');
const todoService = require('@app/services/todoService');

/**
 * scrapes todos from json placeholder
 */
cron.schedule('0 * * * *', async () => {
  console.log({ message: 'Scraping todos ' });

  todoService.scrapeTodoFromJsonPlacehoder();
});
