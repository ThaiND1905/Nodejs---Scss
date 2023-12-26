const connection = require('../config/database')


const getUserByUSerID = async (userID) =>{
    let [results,fields] = await connection.query(
        'Select * from Accounts where email = ? || name = ?',
        [userID,userID]
    )
    return results;
}
const getAllUser = async () => {
    let [results,fields] = await connection.query('Select * from Users');
    return results;
}

const getUserByID = async (userId) =>{
    let [results,fields] = await connection.query('Select * from Users where id = ?',[userId]);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const updateUserByID = async (email,username,city,userid)=>{
    let [results,fields] = await connection.query(
        `Update Users 
        SET email = ? , name = ? , city = ? 
        where id = ?`, 
        [email,username,city,userid]
    )
    // return results
}

const deleteUserByID = async (userId) => {
    let [results,fields] = await connection.query( 
        `Delete From Users 
        where id = ?`,
        [userId]
    )
}



module.exports = {
    getAllUser , getUserByID , updateUserByID , deleteUserByID , getUserByUSerID
}