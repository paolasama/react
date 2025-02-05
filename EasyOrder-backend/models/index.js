const Sequelize = require('sequelize');
const config = require('../config/config');
const RestauranteModel = require('./Restaurante');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Restaurante = RestauranteModel(sequelize, Sequelize.DataTypes);

module.exports = db;
