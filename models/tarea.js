const { v4: uudiv4 } = require("uuid");

class Tarea {
  id = "";
  desc = "";
  estado = false;

  constructor(desc) {
    this.id = uudiv4();
    this.desc = desc;
    this.estado = false;
  }
}

module.exports = Tarea;
