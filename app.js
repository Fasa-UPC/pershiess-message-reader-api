const express = require("express");
const routerV1 = require("./routes/v1/index.router");

const app = express();

app.use(routerV1);

module.exports = app;
