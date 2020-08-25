import Sequelize from 'sequelize';
import RoleModel from "../models/RoleModel";
import {
    DBURL
} from '../../../../config';

const sequelize = new Sequelize(DBURL);

const Role = RoleModel(sequelize, Sequelize);

const roleConfigPromise = Role.findAll();

export default roleConfigPromise
