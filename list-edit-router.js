const express = require("express");
const editTarea = express.Router();
const app = express();
const datos = require("./db/data.json");
const fs = require("fs");
const {  validatePut, bodyValidationPut } = require("./middlewares/methods");

editTarea.delete("/eliminar/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync("./db/data.json", "utf-8"));
  const { id } = req.params;
  const eraser = db.filter((task) => task.id != id);
  fs.writeFileSync("./db/data.json", JSON.stringify(eraser));
  res.json({ message: `Task ${id} have been deleted successfully` });
  res.end();
});

editTarea.put("/actualizar/:id", validatePut, bodyValidationPut, (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { body } = req;
  const db = JSON.parse(fs.readFileSync("./db/data.json", "utf-8"));
  db.forEach((item) => {
    if (item.id == id) {
      item.nombre = body.nombre;
      item.desc = body.desc;
      item.estado = body.estado;
    }
  });
  fs.writeFileSync("./db/data.json", JSON.stringify(db));
  res.json({ message: `Task ${id} have been updated successfully` });
  res.end();
});



//Cuerpo Vacio
function bodyValidation(req, res, next) {
  const body = req.body;
  console.log(body);
  if(Object.keys(req.body).length === 0) {
   return res.status(400).send("Cuerpo vacio");
  }else{
    next();
  } 
}

app.get("/", function (req, res) {  
  res.status(200).send("Hola Mundo");
  res.end();
});


/* editTarea.post("/", bodyValidation,validatebodyPost, function(req, res) {
  const data = req.body;
  res.status(200).send("recibido")
}); */

/* app.post("/", express.json(), function(req, res){
  const data = req.body;
  res.status(200).send("recibido")
}) */

module.exports = editTarea;









