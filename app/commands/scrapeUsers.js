const cron = require('node-cron');
const userService = require('@app/services/userService');

/**
 * scrapes users from json placeholder
 */
cron.schedule('0 * * * *', async () => {
  console.log({ message: 'Scraping users ' });

  userService.scrapeUserFromJsonPlacehoder();
});
