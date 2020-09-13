import Sequelize from 'sequelize';
import {
    DBURL
} from '../../../../config';
import CommentModel from '../models/CommentModel'
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

const sequelize = new Sequelize(DBURL);

const Comment = CommentModel(sequelize, Sequelize);

export async function readCommentsService() {
    try {
        let comments = await Comment.findAll({
            include: [
                {
                    all: true,
                }
            ],
        });
        if (!comments) {
            throw MessageResponse.notFound();
        }
        return comments;
    } catch (error) {
        logError('readCommentsService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}