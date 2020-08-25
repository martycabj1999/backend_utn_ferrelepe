import path from 'path';
import multer from 'multer';
const maxSizeUpload = 500000

export const multerI = multer({
    dest: path.join(__dirname, '../../../../assets'),
    limits: {
        fileSize: maxSizeUpload
    }
}).single('avatar');

export const multerAudio = multer({
    dest: path.join(__dirname, '../../../../uploads')
}).single('audio');
