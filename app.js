const express = require('express')
const app = express();
require("dotenv").config();
const port = 9000;

const users = require("./routes/users.js");
app.use("/users",users);

app.get('/app', (req,res)=>{
    res.send("Hello I am here Node Express");
})

app.listen(port, ()=>{
    console.log(`Running on ${port}`);
})