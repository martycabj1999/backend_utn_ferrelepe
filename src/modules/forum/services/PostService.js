import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import PostModel from '../models/PostModel'

const sequelize = new Sequelize(DBURL);
const Post = PostModel(sequelize, Sequelize);

export async function readPostsService() {
    let posts = await Post.findAll({
        include: [
            {
                all: true,
                attributes: ['id', 'name']
            }
        ],
    });
    if (!posts) {
        throw MessageResponse.notFound();
    }
    return posts;
}


export async function addPostService(title, content, points, views, forum_id, user_id) {
    const post = await Post.create({
        title,
        content,
        points,
        views,
        forum_id,
        user_id,
    });

    return post;
}
export async function updatePostService(id, title, content, points, views, forum_id, user_id) {

    let post = await Post.findOne({
        where: {
            id: id,
        },
    }).then(({ dataValues }) => dataValues);

    if (!post) {
        throw MessageResponse.notFound();
    }

    await Post.update({
        title: title ? title : post.title,
        content: content ? content : post.content,
        points: points ? points : post.points,
        views: views ? views : post.views,
        forum_id: forum_id ? forum_id : post.forum_id,
        user_id: user_id ? user_id : post.user_id,
    }, {
        where: {
            id: id,
        },
    });

    let postUpdate = await Post.findByPk(id, {
            include: {
                all: true,
            }
        })
        .then(({
            dataValues
        }) => dataValues);

    if (!postUpdate) {
        throw MessageResponse.notFound();
    }

    return postUpdate;
}