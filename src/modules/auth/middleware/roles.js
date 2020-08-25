module.exports = function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles]
    }

    return [
        (req, res, next) => {
            if (!roles.includes(req.user.role)) return res.status(403).send(
                'You do not have the Permitted Role to access this resource')
            next()
        }
    ]
}
