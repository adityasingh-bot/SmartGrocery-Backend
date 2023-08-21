const express = require("express");
const mysql = require("mysql");
require("dotenv");

const app = express();

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DATABASE,
    port:process.env.PORT
});

connection.connect((err)=>{
    if(err) throw err;
});

module.exports = {connection};