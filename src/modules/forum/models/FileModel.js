import Sequelize from 'sequelize';
import PostModel from './PostModel'

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);
const Post = PostModel(sequelize, Sequelize)

module.exports = (sequelize, type) => {
    const File = sequelize.define('file', {
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
        file_url: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "la url del archivo es requerido"
                },
            },
        },
    }, {
        paranoid: true,
        timestamps: true
    })


    File.belongsTo(Post, {
        foreignKey: {
            name: 'post_id'
        },
        references: {
            model: Post,
            key: 'id'
        }
    });

    return File
}