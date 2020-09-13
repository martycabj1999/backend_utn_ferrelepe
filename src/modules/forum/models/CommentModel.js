import Sequelize from 'sequelize';
import UserModel from '../../auth/models/UserModel';
import PostModel from '../../forum/models/PostModel';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);
const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

module.exports = (sequelize, type) => {
    const Comment = sequelize.define('comment', {
        text: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "el texto es requerido"
                },
            },
        },
        likes: {
            type: type.INTEGER,
        },
        dislikes: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "el texto es requerido"
                },
            },
        },
    }, {
        paranoid: true,
        timestamps: true
    })

    Comment.belongsTo(Post, {
        foreignKey: {
            name: 'post_id'
        },
        references: {
            model: Post,
            key: 'id'
        }
    });

    Comment.belongsTo(User, {
        foreignKey: {
            name: 'user_id'
        },
        references: {
            model: User,
            key: 'id'
        }
    });

    return Comment
}