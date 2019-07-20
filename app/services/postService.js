const axios = require('axios');

const config = require('@config');
const db = require('@app/models');
const userService = require('./userService');

const postService = {
  /**
   * scrapes posts from Jsonplaceholder
   */
  /**
   * scrapes users data from json placeholder
   */
  scrapePostFromJsonPlacehoder: async () => {
    const { baseUrl } = config.services.jsonplaceholder;

    try {
      const { data: posts } = await axios.get(`${baseUrl}/posts`);

      postService.savePostsInDB(posts);
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong while scraping posts');
    }
  },

  /**
   * create post in db
   *
   * @param postData Object of Post
   */
  createPostInDB: async postData => {
    const user = await userService.getUserByJsonPhID(postData.userId);

    // if user does not exist, don't do anything
    if (!user) return;

    const post = await db.Post.create({
      title: postData.title,
      body: postData.body,
      jsonph_id: postData.id,
      user_id: user.id,
    });

    return post;
  },

  /**
   * update Photo in db
   *
   * @param photoData Object of  Photo
   */
  updatePostInDB: async postData => {
    const user = await userService.getUserByJsonPhID(postData.userId);

    // if user does not exist, don't do anything
    if (!user) return;

    const post = await postService.getPostByJsonPhID(postData.id);

    await post.update({
      title: postData.title,
      body: postData.body,
    });

    return post;
  },

  /**
   * check if post exists by jsonph_id
   *
   * @param jsonph_id String
   */
  doesPostExistsByJsonPhID: async jsonph_id => {
    const post = await postService.getPostByJsonPhID(jsonph_id);

    if (!post) return false;

    return true;
  },

  /**
   * get post by jsonph_id
   *
   * @param String jsonph_id of user
   */
  getPostByJsonPhID: async jsonph_id => {
    const post = await db.Post.findOne({
      where: { jsonph_id },
    });

    return post;
  },

  /**
   * save posts in DB
   *
   * @param posts Array of posts
   */
  savePostsInDB: async posts => {
    for (let i = 0; i < posts.length; i++) {
      const postData = posts[i];

      const doesPostExists = await postService.doesPostExistsByJsonPhID(postData.id);

      if (doesPostExists === false) {
        await postService.createPostInDB(postData);
      } else {
        await postService.updatePostInDB(postData);
      }
    }
  },
};

module.exports = postService;
