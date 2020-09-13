import CarrerModel from './CareerModel';
import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);

const Career = CarrerModel(sequelize, Sequelize);

module.exports = (sequelize, type) => {

    const Subject = sequelize.define('subject', {
        name: {
            type: type.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "el nombre es requerido"
                },
            },
        },
        description: {
            type: type.STRING,
        },
        year: {
            type: type.INTEGER,
        }
    }, {
        paranoid: true,
        timestamps: false
    })

    Subject.belongsTo(Career, {
        foreignKey: {
            name: 'career_id'
        },
        references: {
            model: Career,
            key: 'id'
        }
    });

    return Subject

}