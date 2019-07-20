const cron = require('node-cron');
const postService = require('@app/services/postService');

/**
 * scrapes users from json placeholder
 */
cron.schedule('0 * * * *', async () => {
  console.log({ message: 'Scraping posts ' });

  postService.scrapePostFromJsonPlacehoder();
});
