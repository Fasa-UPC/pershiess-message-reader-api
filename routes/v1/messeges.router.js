const express = require("express");
const MessagesController = require("../../controllers/v1/messages.controller");

const route = express.Router();

route.get("/", MessagesController.getAllMessages);

route.get("/:id", MessagesController.getMessageById);

module.exports = route;
