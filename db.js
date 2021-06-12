const mysql=require('mysql');
var express = require('express');
var app = express();
//Database:
const db=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'newuser',
    database:'testing',
    password:'password'
  })
module.exports=db;