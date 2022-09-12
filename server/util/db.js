const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

module.exports = sequelize;
