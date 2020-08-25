import Sequelize from 'sequelize';
import moment from 'moment';

//SECURITY
import UserModel from '../src/modules/auth/models/UserModel'
import RoleModel from '../src/modules/auth/models/RoleModel'
import ProfileModel from '../src/modules/auth/models/ProfileModel'
import CountryModel from '../src/modules/auth/models/CountryModel'
import LevelModel from '../src/modules/auth/models/LevelModel'
import TrophyModel from '../src/modules/auth/models/TrophyModel'

import {
    DBURL
} from './index'

import bcryptjs from "bcryptjs";

const sequelize = new Sequelize(DBURL);

//AUTH
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);


sequelize.sync()
    .then(async () => {
        console.log('Conexion con MySql mediante Sequelize')
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync('123123', salt);

        await Role.create({
            name: 'admin',
        });
        await Role.create({
            name: 'user',
        });

        await User.create({
            email: 'admin@gmail.com',
            username: 'admin',
            password: hashPassword,
            points: 532,
            role_id: 1,
            active: 1,
        });
    })




export default sequelize