import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readFilesService,
} from '../services/FileService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat();

export const readFilesAction = async function (req, res) {

    logRequest(req)

    try {
        const files = await readFilesService()
        response.data = files
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}