const { env } = require('@app/utils/helpers');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | config for development environment
  |--------------------------------------------------------------------------
  */
  development: {
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_CONNECTION'),
    operatorsAliases: Op,
    dialectOptions: {
      useUTC: false,
    },
    timezone: env('APP_TIMEZONE', 'Asia/Kolkata'),
    pool: {
      max: 5,
      min: 1,
      acquire: env('DB_POOL_ACQUIRE', 30000),
      idle: env('DB_POOL_IDLE', 10000),
    },
  },

  /*
  |--------------------------------------------------------------------------
  | config for test environment
  |--------------------------------------------------------------------------
  */
  test: {
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_CONNECTION'),
    operatorsAliases: Op,
    dialectOptions: {
      useUTC: false,
    },
    timezone: env('APP_TIMEZONE', 'Asia/Kolkata'),
    pool: {
      max: 5,
      min: 1,
      acquire: env('DB_POOL_ACQUIRE', 30000),
      idle: env('DB_POOL_IDLE', 10000),
    },
  },

  /*
  |--------------------------------------------------------------------------
  | config for production environment
  |--------------------------------------------------------------------------
  */
  production: {
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    host: env('DB_HOST'),
    dialect: env('DB_CONNECTION'),
    operatorsAliases: Op,
    dialectOptions: {
      useUTC: false,
    },
    timezone: env('APP_TIMEZONE', 'Asia/Kolkata'),
    pool: {
      max: 5,
      min: 5,
      acquire: env('DB_POOL_ACQUIRE', 30000),
      idle: env('DB_POOL_IDLE', 10000),
    },
  },
};
