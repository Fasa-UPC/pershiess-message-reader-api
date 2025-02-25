const express = require("express");
const messagesRouter = require("./messeges.router");

const router = express.Router();

router.use("/v1/messages", messagesRouter);

module.exports = router;
