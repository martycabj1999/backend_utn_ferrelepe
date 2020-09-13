const {
    createLogger,
    format,
    transports
} = require('winston');
import {
    createResponseFormat
} from '../../helpers/responseFormat'

export const logger = createLogger({
    transports: [
        new transports.File({
            level: 'info',
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../../../logs/info.log`
        }),
        new transports.File({
            level: 'error',
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../../../logs/error.log`
        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(format.simple())
        })
    ]
})

function getDateForLog() {
    const f = new Date();
    const fecha = f.getFullYear() + '/' + f.getMonth() + '/' + f.getDate() + ' ' + f.getHours() + ':' + f.getMinutes() +
        ':' + f.getSeconds();
    return fecha
}

module.exports.logRequest = function (req) {

    let header = {
        date: getDateForLog(),
        host: req.headers.host,
        origin: req.headers.origin,
        referer: req.headers.referer,
        userAgent: req.headers["user-agent"]
    }
    logger.info(
        `{ 'Date': '${header.date}', 'Message': { 'tipo': 'REQUEST', 'Host': '${header.host}', 'Origin': '${header.origin}', 'Endpoint': '${header.referer}', 'UserAgent': '${header.userAgent}' } }`
    )

    let response = createResponseFormat()

    return response
}

module.exports.logError = function (req, error) {

    let header = {
        date: getDateForLog(),
        referer: req.headers ? req.headers.referer : req
    }
    const err = typeof error == 'object' ? JSON.stringify(error) : error
    logger.error(`{ 'Date': '${header.date}', 'Message': { 'tipo': 'ERROR', 'Endpoint': '${header.referer}', 'message': '${err}'} }`)

}