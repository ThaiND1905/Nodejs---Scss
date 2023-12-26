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
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET


// Token

// const encodedToken = (username) => {
//     return jwt.sign({
//         iss : 'Dinh Thai',
//         sub : username ,
//         iat : new Date().getTime(),
//         exp : new Date().setDate(new Date().getDate() + 3)
//     },'Nodejs')
// } 

const createToken = (userId) => {
    return jwt.sign({userId: userId}, 
        accessTokenSecret , 
        {expiresIn : accessTokenLife});
}


//define url link
const getSignUp =  (req,res) => {
    res.render('signup.ejs');
}
const getHomepage = async (req,res) => {
    return res.render('home.ejs')
};
const getTest = (req,res) => {
    res.send('Hello Anh Chị Em !!!!');
};
const getTest2 = (req,res) => {
    res.render('sample.ejs');
};
const getCreateUser = (req,res) => {
    res.render('create-user.ejs');
}
const getEditUser = async (req,res) => {
    let userID = req.params.userID;
    let user = await getUserByID(userID);
    // console.log(user);
    res.render('edit-user.ejs',{userEdit : user});
}
const getUser = async (req,res) => {
    let listUsers = await getAllUser();
    return res.render('user.ejs', {listUsers : listUsers});
}


//define post Url
const postAccount = async (req,res) =>{
    // console.log(req.body)
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let passwordCheck = req.body.passwordCheck ;

    if (password != passwordCheck){
        return res.render('signup.ejs',{message2: 'Passwords do not match.'})
    } else {
        let [results, fields] = await connection.query('Select * from Accounts where email = ?', [email] )
        // if(err) {
        //     return res.render('signup.ejs',{message2: 'Try again'})
        // }
       if( results.length > 0 ){
            return res.render('signup.ejs',{message2: 'User already registered. Try again with another email'})
        }else{
            let hashedPassword = bcrypt.hashSync(password,salt);
            // console.log(hashedPassword);
            let [results,fields]  =  await connection.query( 'Insert into Accounts SET ? ' , {email : email ,name : username, pass: hashedPassword});
            const token = createToken(results.insertId);
            res.cookie('jwt',token, { httpOnly: true });
            return res.render('signup.ejs',{message2:'Account Created Successfully!'});
        }
    }
}

const postCreateUser = async (req,res) =>{
    let email = req.body.email;
    let username = req.body.username;
    let city = req.body.location;
    
    // Callback Function 
    // connection.query(
    //     `INSERT INTO Users(email,name,city)
    //      VALUES (?,?,?)`,
    //     [email, username , city],
    //     function(err,results) {
    //         // console.log(results);
    //         res.send('Send new user successfully');
    //     }
    // )

    // Async/Await Function
    let [results,fields] = await connection.query (
        `INSERT INTO Users(email,name,city) VALUES (?,?,?)`, [email, username , city]
        );
    
    res.send('Send new user successfully');
}
const postEditUser = async (req,res) =>{
    let email = req.body.email;
    let username = req.body.username;
    let city = req.body.location;
    let userId = req.body.userID;
    
    await updateUserByID(email,username,city,userId);
    
    return res.redirect('/users');
}
const postLogin = async (req,res) =>{
    console.log(req.body);
    let userid = req.body.userid;
    let password = req.body.password;
    let user = await getUserByUSerID(userid);

    if(user.length == 0) {
        return res.render('signup.ejs', {message1 : `Can't find account` });
    }else{
        // var salt = bcrypt.genSaltSync(10);
        // console.log(salt)
        console.log(user[0]);
        let checkPassword = await bcrypt.compare(password,user[0].pass);
        console.log(checkPassword);
        if(!checkPassword){
            return res.render('signup.ejs',{message1:`Your passwords is not right.`});
        }else{
            return res.redirect('home');
        }
    }
}


const postDeleteUser = async (req,res) =>{
    let id = req.body.userID;
    // console.log(id);
    await deleteUserByID(id);
    return res.redirect('/users');
}
module.exports = {
    getHomepage : getHomepage, 
    getTest : getTest, 
    getTest2 : getTest2 ,
    getCreateUser : getCreateUser,
    getEditUser : getEditUser ,
    getUser : getUser, 
    getSignUp : getSignUp, 
    postCreateUser : postCreateUser,
    postAccount : postAccount,
    postLogin : postLogin,
    postEditUser : postEditUser,
    postDeleteUser : postDeleteUser, 
}