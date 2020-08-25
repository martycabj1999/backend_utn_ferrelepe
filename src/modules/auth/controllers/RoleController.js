import {
    logRequest,
    logError
} from '../../logger/logger';
import {
    readRolesService
} from '../services/RoleService';
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat()

/**
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
module.exports.readRolesAction = async function (req, res) {

    logRequest(req)

    try {
        const roles = await readRolesService()

        response.data = roles
        return res.status(200).json(response);
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).json(response);
    }


}
