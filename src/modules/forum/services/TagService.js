import Sequelize from 'sequelize';
import {
    DBURL
} from '../../../../config';
import TagModel from '../models/TagModel'
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

const sequelize = new Sequelize(DBURL);

const Tag = TagModel(sequelize, Sequelize);

export async function readTagsService() {
    try {
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

    } catch (error) {
        logError('readTagsService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}



export async function addTagService(name) {
    try {
        const tag = await Tag.create({
            name,
        });

        return tag;

    } catch (error) {
        logError('addTagService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}