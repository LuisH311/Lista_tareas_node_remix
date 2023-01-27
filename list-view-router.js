const express = require("express");
const Tasks = express.Router();
const datos = require("./db/data.json");

Tasks.get("/completas", (req, res) => {
  const filter = datos.filter((item) => item.estado === true);
  res.json(filter);
  res.end();
});

Tasks.get("/incompletas", (req, res) => {
  const filter = datos.filter((item) => item.estado === false);
  res.json(filter);
  res.end();
});

module.exports = Tasks;
