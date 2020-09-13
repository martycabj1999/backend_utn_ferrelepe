import {
    logRequest
} from '../../logger/logger'
import {
    validationResult
} from "express-validator"
import registerUserService from '../services/RegisterUserService'
import {
    emailService
} from '../services/EmailService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

let response = createResponseFormat()

/**
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const registerAction = async function (req, res) {

    let response = logRequest(req)

    let {
        name,
        username,
        email,
        password
    } = req.body;

    const result = await registerUserService(name, username, email, password)

    /* const sendEmail = await emailService(req.body.name,
        req.body.email) */

    if (result.dataValues) {
        response.data = result.dataValues
        response.message = MessageResponse.registerSuccess()
        return res.status(201).json(response)
    } else {
        response.errors = result.errors
        response.message = MessageResponse.registerFail()
        return res.status(400).json(response)
    }

}
