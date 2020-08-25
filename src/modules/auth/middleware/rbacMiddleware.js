import rbacPromise from '../rbac'

export default async function (req, res, next) {
    let user = req.user;
    const rbac = await rbacPromise()
    if (user) {
        rbac.addUserRoles(user.id, [user.role.name])
    }
    req.rbac = rbac;
    next();
}
