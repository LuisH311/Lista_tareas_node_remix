const express = require("express");
const Tasks = express.Router();
const app = express();
const datos = require("./db/data.json");
const validationEstado = (req, res, next) => {
  const completas = req.params.completas;
  console.log(completas);
  if (completas === "completas" || completas === "incompletas") {
    next();
  } else {
    res.status(400).send("bad request");
  }
};
Tasks.get("/&:completas", validationEstado, (req, res) => {
  const completas = req.params.completas;
  if (completas === "completas") {
    const filter = datos.filter((item) => item.estado === true);
    res.json(filter);
    res.end();
  }
  if(completas === "incompletas"){
    const filter = datos.filter((item) => item.estado === false);
  res.json(filter);
  res.end();
  }
});



module.exports = Tasks;
