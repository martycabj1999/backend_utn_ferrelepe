import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readTagsService,
    addTagService,
    updateTagService
} from '../services/TagService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat();

export const readTagsAction = async function (req, res) {

    logRequest(req)

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

    logRequest(req)
    let {
        name,
        post_id
    } = req.body

    try {
        const tag = await addTagService(name, post_id)
        response.data = tag
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const updateTagAction = async function (req, res) {
    logRequest(req)
    try {
        let {
            id,
            name,
            post_id
        } = req.body

        const tagUpdate = await updateTagService(id, name, post_id)
        response.data = tagUpdate
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(500).send(response)
    }
}