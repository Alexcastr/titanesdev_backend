"use strict";

var express = require("express");
var app = express();
app.use(express.json());
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
//var port = process.env.PORT || 4201;
var server = require('http').createServer(app);


const usuario_Route = require("./routes/usuario");
const admin_Route = require("./routes/admin");
const config_Route = require("./routes/config");
const discord_api = require("./routes/api-discord/authorize");



mongoose.connect(
  "mongodb+srv://titanes_dev:qqc7h6GlJNESdqn3@titanes_db.drxgzvy.mongodb.net/sorteo",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

server.listen(3000, () => {
  console.log("Server is running at port" + 3000);
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", usuario_Route);
app.use("/api", admin_Route);
app.use("/api", config_Route);
app.use("/api", discord_api);



module.exports = app;
