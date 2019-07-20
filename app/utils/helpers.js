const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  /**
   * loads a specific key from .env
   * if not found, return the defaulValue
   */
  env: function(key, defaultValue) {
    const value = process.env[key];

    if (value) {
      return value;
    }

    return defaultValue;
  },
};
