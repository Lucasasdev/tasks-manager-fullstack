const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();

//defined json as stardard data transfer
app.use(express.json());
//allow catch response api
app.use(cors());
//defined 'router' as standard for routes
app.use(router);

module.exports = app;
