const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const UrlMap = sequelize.define("UrlMap", {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  LongUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ShortUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UrlMap;
