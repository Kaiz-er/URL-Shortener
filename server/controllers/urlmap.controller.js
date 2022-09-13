const db = require("../util/db");
const UrlMap = require("../models/urlmap");
const UrlMapService = require("../services/urlmap.service");

exports.createOne = async (req, res) => {
  const newUrlMap = await UrlMapService.generateShortUrl(req.body, res);
  return res.status(201).json(newUrlMap);
};

exports.getOne = async (req, res) => {
  const url = await UrlMapService.getUrl(req.params, res);
  if (url) {
    res.redirect(url);
  }
};
