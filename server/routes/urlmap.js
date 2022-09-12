const Router = require("express").Router();
const controller = require("../controllers/urlmap.controller");

// Routes go here
Router.get("/", controller.getAll);
Router.post("/", controller.createOne);
Router.get("/:code", controller.getOne);

module.exports = Router;
