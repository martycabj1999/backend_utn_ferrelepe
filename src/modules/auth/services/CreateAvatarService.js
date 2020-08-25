import Sequelize from 'sequelize';
import UserModel from '../models/UserModel';
import fs from 'fs-extra'
import path from 'path'
import randomString from '../utils/randomString'
import sizeOf from 'image-size'
import {
    DBURL
} from '../../../../config';

const sequelize = new Sequelize(DBURL);

const User = UserModel(sequelize, Sequelize);

export const changeAvatar = async function (userId, url_avatar, originalname, size) {
    const ext = path.extname(originalname).toLowerCase();
    // Validate Extension
    if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') || size < 5000000) {
        const user = await User.update({
            avatar: url_avatar
        }, {
            where: {
                id: userId
            }
        })
        if (!user) {
            return {
                state: false,
                msg: 'Database error'
            }
        }
        return {
            state: true,
            msg: 'Modified Avatar',
            avatar: url_avatar
        }

    } else {
        return {
            state: false,
            msg: 'The image does not meet the requirements (size less than 5Mb, extension .png, jpeg or jpg) and / or is greater than 800 * 800'
        }
    }
};