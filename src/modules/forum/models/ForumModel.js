import CareerModel from '../../career/models/CareerModel';
import SubjectModel from '../../career/models/SubjectModel';
import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config'

const sequelize = new Sequelize(DBURL);
const Career = CareerModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);

module.exports = (sequelize, type) => {
    const Forum = sequelize.define('forum', {
        name: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "el nombre es requerido"
                },
            },
        },
        description: {
            type: type.STRING,
        },
    }, {
        paranoid: true,
        timestamps: true
    })


    Forum.belongsTo(Career, {
        foreignKey: {
            name: 'career_id'
        },
        references: {
            model: Career,
            key: 'id'
        }
    });

    Forum.belongsTo(Subject, {
        foreignKey: {
            name: 'subject_id'
        },
        references: {
            model: Subject,
            key: 'id'
        }
    });

    return Forum
}