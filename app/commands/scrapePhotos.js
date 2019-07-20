const cron = require('node-cron');
const photoService = require('@app/services/photoService');

/**
 * scrapes photos from json placeholder
 */
cron.schedule('0 * * * *', async () => {
  console.log({ message: 'Scraping photos ' });

  photoService.scrapePhotoFromJsonPlacehoder();
});
