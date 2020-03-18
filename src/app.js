const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")

const routes = require("./routes");

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

app.use(routes);


module.exports = app;
