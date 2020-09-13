const {
    param,
    check
} = require('express-validator');
import {
    requestValidate
} from '../../../middleware/requestValidate';
import {
    Sequelize,
    Op
} from 'sequelize';
import UserModel from '../../models/UserModel';
import {
    DBURL
} from '../../../../../config';
import {
    MessageValidator
} from '../../../../helpers/messageValidator';
import { MessageResponse } from '../../../../helpers/messageResponse';

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);

export const authActionMiddleware = requestValidate([
    check('email')
        .exists()
        .withMessage(MessageValidator.isRequired('email'))
        .custom(async (email, req) => {
            const body = req.req.body;
            const userExist = await User.findOne({
                where: {
                    email: body.email,
                },
            })
            if (!userExist) {
                return Promise.reject(MessageResponse.notFound('email'));
            }
        }),
    check('password')
        .exists()
        .withMessage(MessageValidator.isRequired('password'))
        .isLength({ min: 6 })
        .withMessage(MessageValidator.minLength('password', 6))
        .bail()
        .custom(async (email, req) => {
            const body = req.req.body;
            const user = await User.findOne({
                where: {
                    email: body.email,
                },
            })
            const validPassword = bcryptjs.compareSync(body.password, user.password);
            if (!validPassword) {
                return Promise.reject('El email o contraseña es incorrecto');
            }
        }),
]);

export const registerActionMiddleware = requestValidate([
    check('name')
        .exists()
        .withMessage(MessageValidator.isRequired('username'))
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50)),

    check('lastname')
        .exists()
        .withMessage(MessageValidator.isRequired('username'))
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50)),

    check('username')
        .exists()
        .withMessage(MessageValidator.isRequired('username'))
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50))
        .bail()
        .custom(async (i, req) => {
            const body = req.req.body;
            const userExist = await User.findOne({
                where: {
                    username: body.username,
                },
            });
            if (userExist) {
                return Promise.reject(MessageValidator.inUse('username'));
            }
        }),

    check('email')
        .exists()
        .withMessage(MessageValidator.isRequired('email'))
        .isLength({ min: 5, max: 50 })
        .withMessage(MessageValidator.betweenLength('email', 5, 50))
        .isEmail()
        .withMessage(MessageValidator.mustBeOfType('email', 'email'))
        .bail()
        .custom(async (i, req) => {
            const body = req.req.body;
            const userExist = await User.findOne({
                where: {
                    email: body.email,
                },
            });
            if (userExist) {
                return Promise.reject(MessageValidator.inUse('email'));
            }
        }),

    check('password')
        .exists()
        .withMessage(MessageValidator.isRequired('password'))
        .isLength({ min: 6, max: 30 })
        .withMessage(MessageValidator.betweenLength('password', 6, 30)),
]);

export const addUserActionMiddleware = requestValidate([

    check('name')
        .exists()
        .withMessage(MessageValidator.isRequired('username'))
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50)),

    check('lastname')
        .exists()
        .withMessage(MessageValidator.isRequired('username'))
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50)),

    check('username')
        .exists()
        .withMessage(MessageValidator.isRequired('username'))
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50))
        .bail()
        .custom(async (i, req) => {
            const body = req.req.body;
            const userExist = await User.findOne({
                where: {
                    username: body.username,
                },
            });
            if (userExist) {
                return Promise.reject(MessageValidator.inUse('username'));
            }
        }),

    check('email')
        .exists()
        .not()
        .isEmpty()
        .withMessage(MessageValidator.isRequired('email'))
        .isLength({ min: 5, max: 50 })
        .withMessage(MessageValidator.betweenLength('email', 5, 50))
        .isEmail()
        .withMessage(MessageValidator.mustBeOfType('email', 'email'))
        .bail()
        .custom(async (i, req) => {
            const body = req.req.body;
            const userExist = await User.findOne({
                where: {
                    email: body.email,
                },
            });
            if (userExist) {
                return Promise.reject(MessageValidator.inUse('email'));
            }
        }),

    check('password')
        .exists()
        .not()
        .isEmpty()
        .withMessage(MessageValidator.isRequired('password'))
        .isLength({ min: 6, max: 30 })
        .withMessage(MessageValidator.betweenLength('password', 6, 30)),

    check('role')
        .exists()
        .withMessage(MessageValidator.isRequired('role')),
]);

export const updateUserActionMiddleware = requestValidate([
    param('id')
        .exists()
        .withMessage(MessageValidator.isRequired('id')),


    check('name')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50)),

    check('lastname')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50)),

    check('username')
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage(MessageValidator.betweenLength('username', 3, 50))
        .bail()
        .custom(async (username, req) => {
            const usernameExist = await User.count({
                where: {
                    username: username,
                    id: {
                        [Op.ne]: req.req.params.id,
                    },
                },
            });
            if (usernameExist > 0) {
                return Promise.reject(MessageValidator.inUse('username'));
            }
        }),
]);

export const passwordActionMiddleware = requestValidate([
    check('currentPassword')
        .exists()
        .withMessage(MessageValidator.isRequired('currentPassword'))
        .isLength({ min: 6 })
        .withMessage(MessageValidator.minLength('currentPassword', 6))
        .bail()
        .custom(async (email, req) => {
            const body = req.req.body;
            const user = await User.findByPk(req.req.user.id)
            const validPassword = bcryptjs.compareSync(body.currentPassword, user.password);
            if (!validPassword) {
                return Promise.reject('La contraseña actual no coincide con la del sistema');
            }
        }),
    check('newPassword')
        .exists()
        .withMessage(MessageValidator.isRequired('newPassword'))
        .isLength({ min: 6 })
        .withMessage(MessageValidator.minLength('newPassword', 6))
]);