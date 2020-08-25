const dotenv = require('dotenv').config()
var nodemailer = require('nodemailer');
const pug = require('pug');
const compiledFunction = pug.compileFile('./SMTP/templateEmail.pug');
const compiledFunctionRestorePassword = pug.compileFile('./SMTP/templateRestorePassword.pug');
import {
    SMTP_REQUIRE_AUTH,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS
} from '../config';

var requireAuth = () => {
    return (
        SMTP_REQUIRE_AUTH ? {
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_SECURE,
            auth: {
                user: SMTP_USER, // Your email id
                pass: SMTP_PASS // Your password
            }
        } :
        {
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_SECURE
        }
    )
}

var transporter = nodemailer.createTransport(requireAuth());

var createBody = (name, email) => {
    return compiledFunction({
        name: name,
        email: email,
    });
}

var createBodyRestorePassword = (name, email, URL) => {
    return compiledFunctionRestorePassword({
        name: name,
        email: email,
        URL: URL
    });
}


exports.sendEmail = (name, email) => {

    // We define the email
    var mailOptions = {
        from: SMTP_USER,
        to: email,
        subject: SUBJECT_MAIL,
        html: createBody(name, email),
    };

    //Send the email
    return transporter.sendMail(mailOptions)
};

exports.sendEmailResetPassword = (name, email, token) => {

    const URL = URL_BACKEND + '/api/restore-password/' + token;
    // We define the email
    var mailOptions = {
        from: SMTP_USER,
        to: email,
        subject: SUBJECT_MAIL,
        html: createBodyRestorePassword(name, email, URL),
    };

    // Send the email
    return transporter.sendMail(mailOptions)
};