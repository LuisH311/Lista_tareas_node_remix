const express = require("express");
const app = express();
const port = 4500;
const json = require("./db/data.json");
const editTarea = require("./list-edit-router");
const postTarea = require("./list-post-router");
const Tasks = require("./list-view-router");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { methods } = require("./middlewares/methods");
app.use(express.json());
app.use(methods);
app.use("/tareas", Tasks);
app.use("/agrega", postTarea);
app.use("/edit", editTarea);
app.get("/", function (req, res) {
  res.json(json);
  res.end();
});

const users = [
  { email: "example@example.com", name: "example", rol: "admin" },
  { email: "test@test.com", name: "test", rol: "user" },
];

app.post("/login", function (req, res) {
  const credentials = req.body.email;
  const userInfo = users.filter((user) => {
    if (user.email === credentials) {
      return true;
    } else {
      return false;
    }
  });
  if (userInfo.length !== 0) {
    token = jwt.sign(
      {
        name: userInfo[0].name,
        rol: userInfo[0].rol,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
      }
    );
    res.json({ token });
  } else {
    res
      .status(401)
      .json({ error: "Doesn't exist any user with this email account" });
  }
});

app.get("/protect", function (req, res) {
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.send("autenticado");
  } catch (e) {
    res.json({ e });
  }
});

app.listen(port, function () {
  console.log(`El servidor esta escuchando en http://localhost:${port}`);
});
