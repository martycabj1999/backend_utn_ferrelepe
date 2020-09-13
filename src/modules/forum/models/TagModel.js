import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);

module.exports = (sequelize, type) => {
    const Tag = sequelize.define('tag', {
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "el nombre es requerido"
                },
            },
        },
    }, {
        paranoid: true,
        timestamps: false
    })
    return Tag
}