import ProviderSMTP from '../../../../SMTP/ProviderSMTP';

/**
 * emailService
 *
 * @export
 * @param {string} name
 * @param {string} email
 * @returns {Object}
 */
export const emailService = async function (name, email) {
    ProviderSMTP.sendEmail(name, email)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error(error);
            return error
        })
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
    ProviderSMTP.sendEmailResetPassword(name, email, token)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error(error);
            return error
        })
}
