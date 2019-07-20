const cron = require('node-cron');
const albumService = require('@app/services/albumService');

/**
 * scrapes albums from json placeholder
 */
cron.schedule('0 * * * *', async () => {
  console.log({ message: 'Scraping albums ' });

  albumService.scrapeAlbumFromJsonPlacehoder();
});
