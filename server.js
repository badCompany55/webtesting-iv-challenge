const express = require("express");
const helm = require("helmet");
const morg = require("morgan");
const usersRouter = require("./routes/usersRouter.js");

const server = express();

server.use(helm(), express.json(), morg("dev"));
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("testing");
});

module.exports = server;
