const {
    createLogger,
    format,
    transports
} = require('winston');

export const logger = createLogger({
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../../../logs/log-api.log`
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

}

module.exports.logError = function (req, error) {

    let header = {
        date: getDateForLog(),
        referer: req.headers ? req.headers.referer : req
    }

    logger.error(
        `{ 'Date': '${header.date}', 'Message': { 'tipo': 'ERROR', 'Endpoint': '${header.referer}', 'message': '${error}'} }`
    )

}

module.exports.logResponse = function (response) {}
module.exports.logError = function (response) {}
