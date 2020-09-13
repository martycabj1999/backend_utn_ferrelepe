import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import SubjectModel from '../models/SubjectModel'

const sequelize = new Sequelize(DBURL);

const Subject = SubjectModel(sequelize, Sequelize);

export async function readSubjectsService() {
    let subjects = await Subject.findAll({
        include: [
            {
                all: true,
            }
        ],
    });
    if (!subjects) {
        throw MessageResponse.notFound();
    }
    return subjects;
}
export async function addSubjectService(name, description, year, career_id) {
    const subject = await Subject.create({
        name,
        description,
        year,
        career_id
    });
    return subject;
}

export async function updateSubjectService(id, name, description, year, career_id) {

    let subject = await Subject.findOne({
        where: {
            id: id,
        },
    }).then(({ dataValues }) => dataValues);

    if (!subject) {
        throw MessageResponse.notFound();
    }

    await Subject.update({
        name: name ? name : subject.name,
        description: description ? description : subject.description,
        year: year ? year : subject.year,
        career_id: career_id ? career_id : subject.career_id,
    }, {
        where: {
            id: id,
        },
    });

    let subjectUpdate = await Subject.findByPk(id, {
            include: {
                all: true,
            }
        })
        .then(({
            dataValues
        }) => dataValues);

    if (!subjectUpdate) {
        throw MessageResponse.notFound();
    }

    return subjectUpdate;
}