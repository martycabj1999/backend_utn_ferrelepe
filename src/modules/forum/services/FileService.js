import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import FileModel from '../models/FileModel'

const sequelize = new Sequelize(DBURL);

const File = FileModel(sequelize, Sequelize);

export async function readFilesService() {
    let files = await File.findAll({
        include: [
            {
                all: true,
            }
        ],
    });
    if (!files) {
        throw MessageResponse.notFound();
    }
    return files;
}