const express = require("express");
const postTarea = express.Router();
const datos = require("./db/data.json");
const fs = require("fs");

postTarea.post("/", (req, res) => {
  const body = req.body;
  datos.push(body);
  fs.writeFileSync("./db/data.json", JSON.stringify(datos), (error) => {
    if (err) throw err;
    console.log("Actualizado");
  });
  console.log({ body });
  res.json({ message: "Task created successfully" });
  res.end();
});

module.exports = postTarea