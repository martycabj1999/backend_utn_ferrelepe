import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import TagModel from '../models/TagModel'

const sequelize = new Sequelize(DBURL);

const Tag = TagModel(sequelize, Sequelize);

export async function readTagsService() {
    let tags = await Tag.findAll({
        include: [
            {
                all: true,
                attributes: ['id', 'title']
            }
        ],
    });
    if (!tags) {
        throw MessageResponse.notFound();
    }
    return tags;
}



export async function addTagService(name, post_id) {
    const tag = await Tag.create({
        name,
        post_id
    });

    return tag;
}
export async function updateTagService(id, name, post_id) {

    let tag = await Tag.findOne({
        where: {
            id: id,
        },
    }).then(({ dataValues }) => dataValues);

    if (!tag) {
        throw MessageResponse.notFound();
    }

    await Tag.update({
        name: name ? name : tag.name,
        post_id: post_id ? post_id : tag.post_id
    }, {
        where: {
            id: id,
        },
    });

    let tagUpdate = await Tag.findByPk(id, {
            include: {
                all: true,
            }
        })
        .then(({
            dataValues
        }) => dataValues);

    if (!tagUpdate) {
        throw MessageResponse.notFound();
    }

    return tagUpdate;
}