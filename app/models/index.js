const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);

const { env } = require('@config/app');
const config = require('@config/database.js')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 * loads all models in the /models folder
 *
 * [description]
 * @return {[type]} [description]
 */
const loadModels = () => {
  // imports all models files
  fs.readdirSync(path.join(__dirname))
    .filter(file => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    // calling associate methond
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

/**
 * conencts to database
 *
 * [description]
 * @return {[type]} [description]
 */
const connect = async () => {
  loadModels();

  try {
    await sequelize.authenticate();

    console.log('📚 Database Connection has been established successfully. 📘');
  } catch (err) {
    console.log('😞 Unable to connect to the database:', err);
  }

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

connect();

module.exports = db;
