


const express = require("express");
const app = express();
const port = 3000;
const json = require ("./db/data.json")

app.get("/", function(req,res){
    res.json(json);
    res.end();
});


app.post("/", function(req,res){
    const data = req.body;
    console.log(data);
    res.status(200).send("recibido");
})



app.listen(port,function(){
    console.log(`El servidor esta escuchando en http://localhost:${port}`);
});