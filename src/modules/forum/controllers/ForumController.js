//const { readForums } = require("../services/ForumService")
import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readForumsService,
    addForumService,
    updateForumService
} from '../services/ForumService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat();

export const readForumsAction = async function (req, res) {

    logRequest(req)

    try {
        const forums = await readForumsService()
        response.data = forums
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const addForumAction = async function (req, res) {

    logRequest(req)
    let {
        name,
        description,
        subject_id,
        career_id

    } = req.body

    try {
        const forum = await addForumService(name, description, subject_id, career_id)
        response.data = forum
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const updateForumAction = async function (req, res) {
    logRequest(req)
    try {
        let {
            id,
            name,
            description,
            subject_id,
            career_id
        } = req.body

        const forumUpdate = await updateForumService(id, name, description, subject_id, career_id)
        response.data = forumUpdate
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(500).send(response)
    }
}