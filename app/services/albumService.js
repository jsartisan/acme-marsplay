const axios = require('axios');

const config = require('@config');
const db = require('@app/models');
const userService = require('./userService');

const albumService = {
  /**
   * scrapes albums data from json placeholder
   */
  scrapeAlbumFromJsonPlacehoder: async () => {
    const { baseUrl } = config.services.jsonplaceholder;

    try {
      const { data: albums } = await axios.get(`${baseUrl}/albums`);

      albumService.saveAlbumsInDB(albums);
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong while scraping albums');
    }
  },

  /**
   * create Album in db
   *
   * @param albumData Object of  Album
   */
  createAlbumInDB: async albumData => {
    const user = await userService.getUserByJsonPhID(albumData.userId);

    // if user does not exist, don't do anything
    if (!user) return;

    const album = await db.Album.create({
      title: albumData.title,
      jsonph_id: albumData.id,
      user_id: user.id,
    });

    return album;
  },

  /**
   * create Album in db
   *
   * @param albumData Object of  Album
   */
  updateAlbumInDB: async albumData => {
    const user = await userService.getUserByJsonPhID(albumData.userId);

    // if user does not exist, don't do anything
    if (!user) return;

    const album = await albumService.getAlbumByJsonPhID(albumData.id);

    // if album does not exit, don't do anything
    if (!album) return;

    await album.update({
      title: albumData.title,
      jsonph_id: albumData.id,
      user_id: user.id,
    });

    return album;
  },

  /**
   * check if  Album exists by jsonph_id
   *
   * @param jsonph_id String
   */
  doesAlbumExistsByJsonPhID: async jsonph_id => {
    const album = await albumService.getAlbumByJsonPhID(jsonph_id);

    if (!album) return false;

    return true;
  },

  /**
   * get album by jsonph_id
   *
   * @param String jsonph_id of user
   */
  getAlbumByJsonPhID: async jsonph_id => {
    const album = await db.Album.findOne({
      where: { jsonph_id },
    });

    return album;
  },

  /**
   * save albums in DB
   *
   * @param albums Array of albums
   */
  saveAlbumsInDB: async albums => {
    for (let i = 0; i < albums.length; i++) {
      const albumData = albums[i];

      const doesAlbumExists = await albumService.doesAlbumExistsByJsonPhID(albumData.id);

      if (doesAlbumExists === false) {
        await albumService.createAlbumInDB(albumData);
      } else {
        await albumService.updateAlbumInDB(albumData);
      }
    }
  },
};

module.exports = albumService;
