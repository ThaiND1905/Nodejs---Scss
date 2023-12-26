const connection = require("../config/database");
const mysql = require('mysql2/promise')
const express = require('express')
const app = express()
const {getAllUser , getUserByID , getUserByUSerID , updateUserByID , deleteUserByID} = require("../services/CRUDservices");
const { get } = require("../routes/web");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { registerValidator } = require("../validations/auth");
const authMethod = require("../middleware/verifyToken");
const { render } = require("ejs");
const salt = bcrypt.genSaltSync(10)

const getRecoverAccount = (req,res) =>{
    let 
}
const postRecoverAccount = (req,res) =>{

}
module.exports = {
    getRecoverAccount : getRecoverAccount,
    postRecoverAccount : postRecoverAccount,
}