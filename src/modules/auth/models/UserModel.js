import RoleModel from './RoleModel';
import CareerModel from '../../career/models/CareerModel';
import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);

const Career = CareerModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

module.exports = (sequelize, type) => {

    const User = sequelize.define('user', {
        name: {
            type: type.STRING
        },
        username: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "username es requerido"
                },
            },
        },
        points: {
            type: type.INTEGER,
            defaultValue: 0
        },
        email: {
            type: type.STRING,
            unique: true
        },
        google_id: {
            type: type.STRING,
            unique: true
        },
        facebook_id: {
            type: type.STRING,
            unique: true
        },
        password: {
            type: type.STRING
        },
        avatar: {
            type: type.STRING,
            defaultValue: 'https://battletime.s3.us-east-2.amazonaws.com/avatar/rapper-8.jpg'
        },
        active: {
            type: type.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Active es requerido"
                },
            },
        },
    }, {
        paranoid: true,
        timestamps: true
    })



    User.belongsTo(Role, {
        foreignKey: {
            name: 'role_id'
        },
        references: {
            model: Role,
            key: 'id'
        }
    });

     User.belongsTo(Career, {
        foreignKey: {
            name: 'career_id'
        },
        references: {
            model: Career,
            key: 'id'
        }
    });
 
    return User

}