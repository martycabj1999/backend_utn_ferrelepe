import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readPostsService,
    addPostService,
    updatePostService
} from '../services/PostService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat();

export const readPostsAction = async function (req, res) {

    logRequest(req)

    try {
        const posts = await readPostsService()
        response.data = posts
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}


export const addPostAction = async function (req, res) {

    logRequest(req)
    let {
        title,
        content,
        points,
        views,
        forum_id,
        user_id

    } = req.body

    try {
        const post = await addPostService(title, content, points, views, forum_id, user_id)
        response.data = post
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const updatePostAction = async function (req, res) {
    logRequest(req)
    try {
        let {
            id,
            title,
            content,
            points,
            views,
            forum_id,
            user_id
        } = req.body

        const postUpdate = await updatePostService(id, title, content, points, views, forum_id, user_id)
        response.data = postUpdate
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(500).send(response)
    }
}