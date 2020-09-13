import Sequelize from 'sequelize';
import {
    DBURL
} from '../../../../config';
import ForumModel from '../models/ForumModel'
import CareerModel from '../../career/models/CareerModel'
import SubjectModel from '../../career/models/SubjectModel'
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

const sequelize = new Sequelize(DBURL);

const Forum = ForumModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);
const Career = CareerModel(sequelize, Sequelize);

export async function readForumsService() {
    try {
        let forums = await Forum.findAll({
            include: [
                {
                    all: true,
                    attributes: ['id', 'name']
                }
            ],
            attributes: ['id', 'name']
        });
        if (!forums) {
            throw MessageResponse.notFound();
        }
        return forums;
    } catch (error) {
        logError('readForumsService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

export async function getForumService(forum_id) {
    try {
        let forum = await Forum.findByPk(forum_id, {
            include: [
                {
                    all: true,
                    attributes: ['id', 'name']
                }
            ],
            attributes: ['id', 'name']
        });
        if (!forum) {
            throw MessageResponse.notFound();
        }
        return forum;
    } catch (error) {
        logError('getForumService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}

export async function addForumService(name, description, subject_id, career_id) {
    try {
        const forum = await Forum.create({
            name,
            description,
            subject_id,
            career_id
        });

        return forum;
    } catch (error) {
        logError('addForumService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}
export async function updateForumService(id, name, description, subject_id, career_id) {
    try {
        let forum = await Forum.findOne({
            where: {
                id: id,
            },
        }).then(({ dataValues }) => dataValues);

        if (!forum) {
            throw MessageResponse.notFound();
        }

        await Forum.update({
            name: name ? name : forum.name,
            description: description ? description : forum.description,
            subject_id: subject_id ? subject_id : forum.subject_id,
            career_id: career_id ? career_id : forum.career_id,
        }, {
            where: {
                id: id,
            },
        });

        let forumUpdate = await Forum.findByPk(id, {
            include: {
                all: true,
            }
        })
            .then(({
                dataValues
            }) => dataValues);

        if (!forumUpdate) {
            throw MessageResponse.notFound();
        }

        return forumUpdate;
    } catch (error) {
        logError('updateForumService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}