import Sequelize from 'sequelize';
import RoleModel from "../models/RoleModel";
import {
    DBURL
} from '../../../../config';
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

const sequelize = new Sequelize(DBURL);

const Role = RoleModel(sequelize, Sequelize);

/**
 * get Roles
 *
 * @export
 * @returns {Object}
 */
export async function readRolesService() {
    try {
        const roles = await Role.findAll()
            .then((response) => {
                return response
            })

        return roles

    } catch (error) {
        logError('readRolesService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}
