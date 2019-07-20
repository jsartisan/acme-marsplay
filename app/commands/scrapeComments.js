const cron = require('node-cron');
const commentService = require('@app/services/commentService');

/**
 * scrapes comments from json placeholder
 */
cron.schedule('0 * * * *', async () => {
  console.log({ message: 'Scraping comments ' });

  commentService.scrapeCommentFromJsonPlacehoder();
});
