const axios = require('axios');

const config = require('@config');
const db = require('@app/models');
const postService = require('./postService');

const commentService = {
  /**
   * scrapes comments data from json placeholder
   */
  scrapeCommentFromJsonPlacehoder: async () => {
    const { baseUrl } = config.services.jsonplaceholder;

    try {
      const { data: comments } = await axios.get(`${baseUrl}/comments`);

      commentService.saveCommentsInDB(comments);
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong while scraping comments');
    }
  },

  /**
   * create Comment in db
   *
   * @param commentData Object of  Comment
   */
  createCommentInDB: async commentData => {
    const post = await postService.getPostByJsonPhID(commentData.postId);

    // if post does not exist, don't do anything
    if (!post) return;

    const comment = await db.Comment.create({
      name: commentData.name,
      email: commentData.email,
      body: commentData.body,
      jsonph_id: commentData.id,
      post_id: post.id,
    });

    return comment;
  },

  /**
   * update Comment in db
   *
   * @param commentData Object of  Comment
   */
  updateCommentInDB: async commentData => {
    const post = await postService.getPostByJsonPhID(commentData.postId);

    // if post does not exist, don't do anything
    if (!post) return;

    const comment = await commentService.getCommentByJsonPhID(commentData.id);

    // if comment does not exit, don't do anything
    if (!comment) return;

    comment.update({
      name: commentData.name,
      email: commentData.email,
      body: commentData.body,
      jsonph_id: commentData.id,
      post_id: post.id,
    });

    return comment;
  },

  /**
   * check if  Comment exists by jsonph_id
   *
   * @param jsonph_id String
   */
  doesCommentExistsByJsonPhID: async jsonph_id => {
    const comment = await commentService.getCommentByJsonPhID(jsonph_id);

    if (!comment) return false;

    return true;
  },

  /**
   * get comment by jsonph_id
   *
   * @param String jsonph_id of user
   */
  getCommentByJsonPhID: async jsonph_id => {
    const comment = await db.Comment.findOne({
      where: { jsonph_id },
    });

    return comment;
  },

  /**
   * save comments in DB
   *
   * @param comments Array of comments
   */
  saveCommentsInDB: async comments => {
    for (let i = 0; i < comments.length; i++) {
      const commentData = comments[i];

      const doesCommentExists = await commentService.doesCommentExistsByJsonPhID(commentData.id);

      if (doesCommentExists === false) {
        await commentService.createCommentInDB(commentData);
      } else {
        await commentService.updateCommentInDB(commentData);
      }
    }
  },
};

module.exports = commentService;
