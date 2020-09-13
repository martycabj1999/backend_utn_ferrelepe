import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import ForumModel from '../models/ForumModel'
import CareerModel from '../../career/models/CareerModel'
import SubjectModel from '../../career/models/SubjectModel'

const sequelize = new Sequelize(DBURL);

const Forum = ForumModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);
const Career = CareerModel(sequelize, Sequelize);

export async function readForumsService() {
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
}


export async function addForumService(name, description, subject_id, career_id) {
    const forum = await Forum.create({
        name,
        description,
        subject_id,
        career_id
    });

    return forum;
}
export async function updateForumService(id, name, description, subject_id, career_id) {

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
}