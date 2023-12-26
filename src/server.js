const express = require("express");
const app = express();
const path = require("path");
const configViewEngine = require('./config/viewEngine.js')
const { config } = require("process");
const mysql = require('mysql2')
require('dotenv').config();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
const webRoutes = require('./routes/web.js')
const connection = require('./config/database.js')
// console.log(">>>process:" , process.env)

//config view engine & static files
configViewEngine(app);



//define req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Khai báo route    

app.use('/',webRoutes);

app.listen(port,hostname, () => {
    console.log(`Hello to port ${port} in ${hostname}`);
})