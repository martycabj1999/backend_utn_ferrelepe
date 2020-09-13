import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import CareerModel from '../models/CareerModel'

const sequelize = new Sequelize(DBURL);

const Career = CareerModel(sequelize, Sequelize);

export async function readCareersService() {
    let careers = await Career.findAll({
        include: [
            {
                all: true,
            }
        ],
    });
    if (!careers) {
        throw MessageResponse.notFound();
    }
    return careers;
}

export async function addCareerService(name) {
    const career = await Career.create({
        name,
    });

    return career;
}
export async function updateCareerService(id, name) {

    let career = await Career.findOne({
        where: {
            id: id,
        },
    }).then(({ dataValues }) => dataValues);

    if (!career) {
        throw MessageResponse.notFound();
    }

    await Career.update({
        name: name ? name : career.name,
    }, {
        where: {
            id: id,
        },
    });

    let careerUpdate = await Career.findByPk(id, {
            include: {
                all: true,
            }
        })
        .then(({
            dataValues
        }) => dataValues);

    if (!careerUpdate) {
        throw MessageResponse.notFound();
    }

    return careerUpdate;
}