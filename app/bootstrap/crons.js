const fs = require('fs');
const path = require('path');

/**
 * loads all commands in /app/commands folder
 *
 * @param {*} app
 */
const register = app => {
  const normalizedPath = path.join(__dirname, '../commands');

  fs.readdirSync(normalizedPath).forEach(function(file) {
    require(path.join(__dirname, '../commands', file));
  });
};

module.exports = {
  register,
};
