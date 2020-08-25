import {
    verifyEmail,
    updatePasswordAdmin
} from '../services/UserService'
import {
    logRequest
} from '../../logger/logger';
import {
    emailServiceResetPassword
} from '../services/EmailService'
var jwt = require('jsonwebtoken');
import {
    JWT_SECRET
} from '../../../../config';

//I check if the password exists in Recover password
module.exports.forgibbenPasswordAction = async function (req, res) {

    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {}
    }

    const userMail = await verifyEmail(req.body.email)

    if (userMail.state) {
        const user = req.body.email;
        const token = jwt.sign({
            user
        }, JWT_SECRET, {
            expiresIn: '3600s'
        });
        const sendEmail = await emailServiceResetPassword(userMail.user.name, req.body
            .email, token)
        response.message = userMail.msg
        return res.status(200).json({
            response,
            sendEmail
        })
    } else {
        response.message = userMail.msg
        return res.status(400).json(response)
    }
}

//I update the password that was forget
module.exports.changeForgibbenPasswordAction = async function (req, res) {

    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {}
    }

    const {
        token
    } = req.params

    jwt.verify(token, JWT_SECRET, async (err, data) => {
        if (err) {
            response.message = 'The token is not valid'
            return res.status(403).json(response)
        } else {
            const userId = await verifyEmail(data.user)
            const user = await updatePasswordAdmin(userId.user._id, req.body
                .password);

            if (!user) {
                response.message = 'The user with that ID does not exist'
                return res.status(404).json(response)
            }

            response.message = 'The password was successfully modified'
            res.status(200).json(response)
        }
    });
}



module.exports.getRestorePasswordAction = async function (req, res) {

    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {}
    }

    const {
        token
    } = req.params;

    jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {
            response.message = 'The token is not valid'
            return res.status(403).json(response)
        } else {
            // const sc = {tok: token}
            //     res.render('auth/reset-pass',{sc});
            response.message = 'The token is valid'
            return res.status(200).json(response)
        }
    });
}
