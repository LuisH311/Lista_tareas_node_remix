const express = require("express");
const editTarea = express.Router();
const datos = require("./db/data.json");
const fs = require("fs");

editTarea.delete("/eliminar/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync("./db/data.json", "utf-8"));
  const { id } = req.params;
  const eraser = db.filter((task) => task.id != id);
  fs.writeFileSync("./db/data.json", JSON.stringify(eraser));
  res.json({ message: `Task ${id} have been deleted successfully` });
  res.end();
});

editTarea.put("/actualizar/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const db = JSON.parse(fs.readFileSync("./db/data.json", "utf-8"));
  db.forEach((item) => {
    if (item.id == id) {
      item.nombre = req.body.nombre;
      item.desc = req.body.desc;
      item.estado = req.body.estado;
    }
  });
  fs.writeFileSync("./db/data.json", JSON.stringify(db));
  res.json({ message: `Task ${id} have been updated successfully` });
  res.end();
});
module.exports = editTarea;
