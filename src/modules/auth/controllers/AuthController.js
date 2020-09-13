import jsonwebtoken from "jsonwebtoken";
import {
    logRequest,
    logError
} from '../../logger/logger'
const {
    validationResult
} = require('express-validator');
import {
    authService,
    authMethodService
} from '../services/AuthService'
import axios from 'axios'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat()

module.exports.authAction = async function (req, res) {

    let response = logRequest(req)

    //Exec validations
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }

    try {
        const authResult = await authService(req.body.email, req.body.password)

        if (authResult.status === false) {
            response.message = authResult.msg
            return res.status(403).json(response);
        }

        response.data = authResult
        return res.status(200).json(response);
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).json(response);
    }


}

module.exports.authMethodAction = async function (req, res) {

    let response = logRequest(req)

    let {
        token,
        method
    } = req.body;
    let user = null
    let email = ''
    let user_id = ''

    switch (method) {
        case 'google':
            axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
                .then(async (result) => {
                    email = result.data.email;
                    user_id = result.data.user_id;

                    const authResult = await authMethodService(email, user_id, method)

                    if (authResult.status === false) {
                        response.message = authResult.msg
                        return res.status(403).json(response);
                    }

                    response.data = authResult
                    return res.status(200).json(response);

                })
                .catch((error) => {
                    logError(req, error)
                    response.errors.push(error)
                    return res.status(500).json(response);
                });
            break;
        case 'facebook':
            axios.post(`https://graph.facebook.com/?id=10219731834621378&access_token=${token}`)
                .then(async (result) => {
                    user_id = result.data.user_id;

                    const authResult = await authMethodService(token, user_id, method)

                    if (authResult.status === false) {
                        response.message = authResult.msg
                        return res.status(403).json(response);
                    }

                    response.data = authResult
                    return res.status(200).json(response);
                })
                .catch((error) => {
                    logError(req, error)
                    response.errors.push(error)
                    return res.status(500).json(response);
                });
            break;
        default:
            user = null
            break;
    }

}
