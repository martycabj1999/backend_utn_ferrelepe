import Sequelize from 'sequelize';
import UserModel from "../models/UserModel";
import RoleModel from "../models/RoleModel";
import bcryptjs from 'bcryptjs'
import jsonwebtoken from "jsonwebtoken";
import randomString from "../utils/randomString"
import {
    JWT_SECRET,
    URL_BACKEND,
    DBURL
} from '../../../../config';

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

function generateToken(user, roleName) {
    let token = jsonwebtoken.sign({
        id: user.id,
        username: user.username,
        name: user.name,
        points: user.points,
        email: user.email,
        role: {
            name: roleName
        },
        avatar: user.avatar
    },
        JWT_SECRET, {
        expiresIn: '10d'
    }
    )
    return token
}

/**
 * auth user
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */
export const authService = async function (email, password) {

    const user = await User.findOne({
        where: {
            email: email
        }
    }).then(async ({
        dataValues
    }) => {

        if (dataValues.state === 0) {
            return {
                status: false,
                msg: 'Disabled user'
            };
        }

        const validPassword = bcryptjs.compareSync(password, dataValues.password)

        if (!validPassword) {
            return {
                status: false,
                msg: 'The email or password is invalid'
            };
        }

        const role = await Role.findByPk(dataValues.role_id).then(({
            dataValues
        }) => (dataValues))

        const token = generateToken(dataValues, role.name)

        return token

    })

    return user

}

/**
 * auth method user
 *
 * @export
 * @param {string} auth
 * @param {string} user_id
 * @param {string} method
 * @returns {Object}
 */
export const authMethodService = async function (auth, user_id, method) {

    var user = null
    switch (method) {
        case 'google':

            user = await User.findOne({
                where: {
                    email: auth
                }
            })

            if (!user) {
                let role = await Role.findOne({
                    name: 'user'
                }).then(({
                    dataValues
                }) => (dataValues))

                let username = auth.split('@')[0]

                let newUser = await User.create({
                    email: auth,
                    username: username,
                    google_id: user_id,
                    role_id: role.id,
                    active: 1,
                });

                let token = generateToken(newUser, role.name)

                return token
            }

            if (user.dataValues.active === 0) {
                return {
                    status: false,
                    msg: 'Disabled user'
                };
            }

            let role = await Role.findByPk(user.role_id).then(({
                dataValues
            }) => (dataValues))

            const token = generateToken(user.dataValues, role.name)

            return token

        case 'facebook':
            user = await User.findOne({
                where: {
                    facebook_id: user_id
                }
            })

            if (!user) {

                let role = await Role.findOne({
                    name: 'user'
                }).then(({
                    dataValues
                }) => (dataValues))

                let username = auth.split('@')[0]
                let newUser = await User.create({
                    username: username,
                    facebook_id: auth,
                    role_id: role.id,
                    active: 1,
                });

                let token = generateToken(newUser, role.name)

                return token
            }

            if (user.dataValues.active === 0) {
                return {
                    status: false,
                    msg: 'Disabled user'
                };
            }

            let newRole = await Role.findByPk(user.role_id).then(({
                dataValues
            }) => (dataValues))

            const newToken = generateToken(user.dataValues, newRole.name)

            return newToken

        default:
            return user
    }

}