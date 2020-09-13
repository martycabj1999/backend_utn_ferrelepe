import Sequelize from 'sequelize';
import UserModel from "../models/UserModel";
import {
    DBURL
} from '../../../../config';
import bcryptjs from "bcryptjs"
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);

/**
 * register user
 *
 * @export
 * @param {string} name
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */
const registerUserService = async function (name, username, email, password) {
    try {
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync(password, salt);

        const user = await User.create({
            name,
            username,
            email,
            password: hashPassword,
            role_id: 2
        })
            .catch(error => {
                return error
            });

        return user
    } catch (error) {
        logError('registerUserService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

export default registerUserService;
