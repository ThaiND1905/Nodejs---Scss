const { sign } = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');
const mailTransporter = await nodemailer.createTransport({

});

const signUpMail = async (registerEmail) => {
    let config = {
        service : 'gmail',
        auth : {
            user: process.env.E_USERNAME,
            pass: process.env.E_PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

}

module.exports = {
    signUpMail: signUpMail,
}

