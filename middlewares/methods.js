const methods = (req, res, next) => {
  const method = req.method;
  if (method === "POST" || method === "GET" || method === "PUT") {
    next();
  } else {
    res.status(405).send("Invalid http request method");
  }
};

function bodyValidation(req, res, next) {
    const body = req.body;
    console.log(body);
    if(Object.keys(req.body).length === 0) {
     return res.status(400).send("Cuerpo vacio");
    }else{
      next();
    } 
  }
  function validatePost  (req, res, next) {
    const body = req.body;
    const method = req.method;
    if (method === "POST") {
      if (
        body.desc === "" ||
        body.estado === "" ||
        body.completadoEn === ""
      ) {
        res.status(400).send("All fields are required");
      } else {
        next();
      }
    }
  };
  function bodyValidationPut(req, res, next) {
    const body = req.body;
    console.log(body);
    if(Object.keys(req.body).length === 0) {
     return res.status(400).send("Cuerpo vacio");
    }else{
      next();
    } 
  }
  function validatePut  (req, res, next) {
    const body = req.body;
    const method = req.method;
    if (method === "PUT") {
      if (
        body.desc === "" ||
        body.estado === "" ||
        body.completadoEn === ""
      ) {
        res.status(400).send("All fields are required");
      } else {
        next();
      }
    }
  };
  const validateUrl = (req, res, next) => {
    const url = req.originalUrl;
    const urlArray = ["/agregar"];
    const validarRuta = urlArray.some((ruta) => ruta === url);
  
    if (validarRuta) {
      next();
    } else {
      res.status(400).send("Negativo, no estas autorizado");
    }
  };
module.exports = { methods,validateUrl, validatePost,bodyValidation, bodyValidationPut, validatePut };
