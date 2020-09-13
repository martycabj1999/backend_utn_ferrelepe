import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readTagsService,
    addTagService,
    updateTagService
} from '../services/TagService'

export const readTagsAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const tags = await readTagsService()
        response.data = tags
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const addTagAction = async function (req, res) {

    let response = logRequest(req)
    let {
        name
    } = req.body

    try {
        const tag = await addTagService(name)
        response.data = tag
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}