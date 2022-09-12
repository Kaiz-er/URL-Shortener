const db = require("../util/db");
const UrlMap = require("../models/urlmap");
const UrlMapService = require("../services/urlmap.service");
const { json } = require("sequelize");

exports.getAll = async (req, res) => {
  try {
    const allUrlMaps = await UrlMap.findAll();
    return res.status(200).json(allUrlMaps);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res) => {
  try {
    const newUrlMap = await UrlMapService.generateShortUrl(req.body);
    console.log("New UrlMap created");
    return res.status(201).json(newUrlMap);
  } catch (error) {
    return res.json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const url = await UrlMapService.getUrl(req.params);
    if (url) {
      res.redirect(url);
    } else {
      return res.status(404).json("Not a valid short URL");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
