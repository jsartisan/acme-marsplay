const axios = require('axios');

const config = require('@config');
const db = require('@app/models');
const albumService = require('./albumService');

const photoService = {
  /**
   * scrapes photos data from json placeholder
   */
  scrapePhotoFromJsonPlacehoder: async () => {
    const { baseUrl } = config.services.jsonplaceholder;

    try {
      const { data: photos } = await axios.get(`${baseUrl}/photos`);

      photoService.savePhotosInDB(photos);
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong while scraping photos');
    }
  },

  /**
   * create Photo in db
   *
   * @param photoData Object of  Photo
   */
  createPhotoInDB: async photoData => {
    const album = await albumService.getAlbumByJsonPhID(photoData.albumId);

    // if album does not exist, don't do anything
    if (!album) return;

    const photo = await db.Photo.create({
      title: photoData.title,
      url: photoData.url,
      thumbnail_url: photoData.thumbnailUrl,
      jsonph_id: photoData.id,
      album_id: album.id,
    });

    return photo;
  },

  /**
   * update Photo in db
   *
   * @param photoData Object of  Photo
   */
  updatePhotoInDB: async photoData => {
    const album = await albumService.getAlbumByJsonPhID(photoData.albumId);

    // if album does not exist, don't do anything
    if (!album) return;

    const photo = await photoService.getPhotoByJsonPhID(photoData.id);

    // if photo does not exit, don't do anything
    if (!photo) return;

    photo.update({
      title: photoData.title,
      url: photoData.url,
      thumbnail_url: photoData.thumbnailUrl,
      jsonph_id: photoData.id,
      album_id: album.id,
    });

    return photo;
  },

  /**
   * check if  Photo exists by jsonph_id
   *
   * @param jsonph_id String
   */
  doesPhotoExistsByJsonPhID: async jsonph_id => {
    const photo = await photoService.getPhotoByJsonPhID(jsonph_id);

    if (!photo) return false;

    return true;
  },

  /**
   * get photo by jsonph_id
   *
   * @param String jsonph_id of user
   */
  getPhotoByJsonPhID: async jsonph_id => {
    const photo = await db.Photo.findOne({
      where: { jsonph_id },
    });

    return photo;
  },

  /**
   * save photos in DB
   *
   * @param photos Array of photos
   */
  savePhotosInDB: async photos => {
    for (let i = 0; i < photos.length; i++) {
      const photoData = photos[i];

      const doesPhotoExists = await photoService.doesPhotoExistsByJsonPhID(photoData.id);

      if (doesPhotoExists === false) {
        await photoService.createPhotoInDB(photoData);
      } else {
        await photoService.updatePhotoInDB(photoData);
      }
    }
  },
};

module.exports = photoService;
