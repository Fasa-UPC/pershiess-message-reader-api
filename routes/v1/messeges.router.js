const express = require("express");
const MessagesController = require("../../controllers/v1/messages.controller");

const route = express.Router();

route.get("/", MessagesController.getAllMessages);

module.exports = route;
