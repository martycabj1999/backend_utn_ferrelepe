const jwt = require('express-jwt')
require('dotenv').config()
import {
    JWT_SECRET
} from '../../../../config'

// auth middleware
export const jwtAuth = jwt({
    secret: JWT_SECRET,
    credentialsRequired: false
})

export const handleAuthError = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({
            message: err.message
        })
        return;
    }
    next()
}
