import express from 'express'
import {
    authAction,
    authMethodAction
} from './controllers/AuthController'
import {
    readRolesAction
} from './controllers/RoleController'
import {
    readAvatarAction,
    readUsersAction,
    createAvatarAction,
    updatePasswordUserAction,
    updatePasswordAdminAction,
    addUserAction,
    getUserAction,
    getUserByTokenAction,
    updateUserAction,
} from './controllers/UserController'
import {
    forgibbenPasswordAction,
    changeForgibbenPasswordAction,
    getRestorePasswordAction
} from './controllers/ResetPasswordController'
import {
    registerAction
} from './controllers/RegisterController'
import {
    multerI
} from '../middleware/multer'
import {
    authToken
} from '../middleware/auth'
import {
    authActionMiddleware,
    registerActionMiddleware,
    addUserActionMiddleware,
    updateUserActionMiddleware,
    passwordActionMiddleware
} from './middleware/requests/userMiddleware'

const router = express.Router()

//AUTH
router.post('/api/auth', authActionMiddleware, authAction)
router.post('/api/auth_method', authMethodAction)
router.get('/api/user/roles', authToken, readRolesAction)

//USER
router.get('/api/users/admin', authToken, readUsersAction)
router.post('/api/user/create', registerActionMiddleware, registerAction)
router.put('/api/user/password', [authToken, passwordActionMiddleware], updatePasswordUserAction)
router.put('/api/users/password/:id', authToken, updatePasswordAdminAction)
router.post('/api/users/user', authToken, addUserActionMiddleware, addUserAction)
router.get('/api/users/user', authToken, getUserByTokenAction)
router.get('/api/users/user/:id', authToken, getUserAction)
router.put('/api/users/user', [authToken, updateUserActionMiddleware], updateUserAction)
router.get('/api/users/avatar', authToken, readAvatarAction)
router.post('/api/user/avatar', [authToken, multerI], createAvatarAction)

//MAIL
router.post('/api/forgibben-password/', forgibbenPasswordAction)
router.put('/api/restore-password/:token', changeForgibbenPasswordAction)
router.get('/api/restore-password/:token', getRestorePasswordAction)


export default router;