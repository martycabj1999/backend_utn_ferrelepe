import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import CommentModel from '../models/CommentModel'

const sequelize = new Sequelize(DBURL);

const Comment = CommentModel(sequelize, Sequelize);

export async function readCommentsService() {
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
}