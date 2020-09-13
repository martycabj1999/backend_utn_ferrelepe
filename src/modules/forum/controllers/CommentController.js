import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readCommentsService,
} from '../services/CommentService'

export const readCommentsAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const comment = await readCommentsService()
        response.data = comment
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}