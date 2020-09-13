import ForumModel from '../../forum/models/ForumModel';
import UserModel from '../../auth/models/UserModel';
import TagModel from '../../forum/models/TagModel';
import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);
const Forum = ForumModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
module.exports = (sequelize, type) => {

    const Post = sequelize.define('post', {
        title: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "el título es requerido"
                },
            },
        },
        content: {
            type: type.STRING,
            allowNull: false,
        },
        points: {
            type: type.INTEGER,
            allowNull: true,
        },
        views: {
            type: type.INTEGER,
            allowNull: true,
        },
    }, {
        paranoid: true,
        timestamps: true
    })

    Post.belongsTo(Forum, {
        foreignKey: {
            name: 'forum_id'
        },
        references: {
            model: Forum,
            key: 'id'
        }
    });

    Post.belongsTo(User, {
        as: 'user_post',
        foreignKey: {
            name: 'user_post_id'
        },
        references: {
            model: User,
            key: 'id'
        }
    });

    //N:M con tags a traves de tag_post
    const Tag_Post = sequelize.define('tag_post', {}, { timestamps: false });
    Post.belongsToMany(Tag, { through: Tag_Post, foreignKey: 'post_id' })
    Tag.belongsToMany(Post, { through: Tag_Post, foreignKey: 'tag_id' })

    //N:M con comentarios de users a posts
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
    Post.belongsToMany(User, { through: Comment, foreignKey: 'post_id' })
    User.belongsToMany(Post, { through: Comment, foreignKey: 'user_id' })

    return Post
}