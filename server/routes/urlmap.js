const Router = require("express").Router();
const controller = require("../controllers/urlmap.controller");

// Error handler to avoid multiple try catch blocks
const errorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

Router.post("/", errorHandler(controller.createOne));
Router.get("/:code", errorHandler(controller.getOne));

module.exports = Router;
