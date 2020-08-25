import Sequelize from 'sequelize';
import RoleModel from "../models/RoleModel";
import {
    DBURL
} from '../../../../config';

const sequelize = new Sequelize(DBURL);

const Role = RoleModel(sequelize, Sequelize);

/**
 * get Roles
 *
 * @export
 * @returns {Object}
 */
export async function readRolesService() {

    const roles = await Role.findAll()
        .then((response) => {
            return response
        })

    return roles
}
