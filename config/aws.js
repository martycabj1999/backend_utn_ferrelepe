import fs from 'fs';
const AWS = require('aws-sdk'); // aws sdk
import {
    AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY,
    AWS_S3_BUCKET,
} from '../config';
import async from 'async';

/*
    I upload a file to aws
    file must be a multer file
*/
export const uploadFileS3 = (file, bucket_folder, callback, prefix = '') => {
    let s3bucket = new AWS.S3({
        accessKeyId: AWS_S3_ACCESS_KEY,
        secretAccessKey: AWS_S3_SECRET_KEY,
        Bucket: AWS_S3_BUCKET,
    });

    s3bucket.upload({
        Bucket: AWS_S3_BUCKET,
        Key: bucket_folder + '/' + prefix + file.filename + file.originalname,
        ACL: "public-read",
        Body: fs.readFileSync(file.path),
        ContentType: file.mimetype
    }, (err, data) => {

        if (err) {
            return callback(true);
        }

        fs.unlinkSync(file.path);

        return callback(false, data);
    });

}

/*
    I upload multiple files to aws
    files must be an array of multer files
*/
export const uploadMultipleFilesS3 = (files, bucket_folder, callback, prefix = '') => {
    let filelist = [];
    async.eachOf(files, (file, index, callback) => {
        AmazonAWS.upload_s3(file, bucket_folder, (err, data) => {
            if (err) {
                return callback(new Error());
            } else {
                filelist[index] = prefix + file.filename;
                return callback();
            }
        }, prefix);

    }, (err) => {
        return callback(err ? true : false, filelist);
    });
}

export const uploadFileNameS3 = (path, fileName, content_type, bucket_folder, callback, prefix = '') => {
    let s3bucket = new AWS.S3({
        accessKeyId: AWS_S3_ACCESS_KEY,
        secretAccessKey: AWS_S3_SECRET_KEY,
        Bucket: AWS_S3_BUCKET,
    });
    s3bucket.upload({
        Bucket: AWS_S3_BUCKET,
        Key: bucket_folder + '/' + prefix + fileName,
        ACL: "public-read",
        Body: fs.readFileSync(path),
        ContentType: content_type
    }, (err, data) => {
        if (err) {
            return callback(true);
        }
        fs.unlinkSync(path);
        return callback(false, data);
    });
}
