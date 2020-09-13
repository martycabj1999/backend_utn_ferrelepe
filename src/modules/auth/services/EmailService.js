import ProviderSMTP from '../../../../SMTP/ProviderSMTP';
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

/**
 * emailService
 *
 * @export
 * @param {string} name
 * @param {string} email
 * @returns {Object}
 */
export const emailService = async function (name, email) {
    try {
        ProviderSMTP.sendEmail(name, email)
            .then(response => {
                return response
            })
            .catch(error => {
                console.error(error);
                return error
            })
    } catch (error) {
        logError('emailService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

/**
 * emailServiceResetPassword
 *
 * @export
 * @param {string} name
 * @param {string} email
 * @param {string} token
 * @returns {Object}
 */
export const emailServiceResetPassword = async function (name, email, token) {
    try {
        ProviderSMTP.sendEmailResetPassword(name, email, token)
            .then(response => {
                return response
            })
            .catch(error => {
                console.error(error);
                return error
            })
    } catch (error) {
        logError('emailService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}
