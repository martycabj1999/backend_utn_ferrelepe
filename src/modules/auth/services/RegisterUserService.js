import Sequelize from 'sequelize';
import UserModel from "../models/UserModel";
import {
    DBURL
} from '../../../../config';
import bcryptjs from "bcryptjs"

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);

/**
 * register user
 *
 * @export
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {number} profile_id
 * @returns {Object}
 */
const registerUserService = async function (username, email, password) {

    let salt = bcryptjs.genSaltSync(10);
    let hashPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
        role_id: 2,
        active: 1
    })
        .catch(error => {
            return error
        });

    return user

}

export default registerUserService;
