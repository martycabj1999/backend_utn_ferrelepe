import Sequelize from 'sequelize';

import {
    DBURL
} from '../../../../config';
import FileModel from '../models/FileModel'
import {
    logError
} from '../../logger/logger'
import {
    MessageResponse
} from '../../../helpers/messageResponse'

const sequelize = new Sequelize(DBURL);

const File = FileModel(sequelize, Sequelize);

export async function readFilesService() {
    try {
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
    } catch (error) {
        logError('readFilesService', error)
        throw (MessageResponse.serviceCatch(error))
    }
}