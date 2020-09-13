import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readSubjectsService,
    addSubjectService,
    updateSubjectService
} from '../services/SubjectService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat();

export const readSubjectsAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const subjects = await readSubjectsService()
        response.data = subjects
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const addSubjectAction = async function (req, res) {

    let response = logRequest(req)
    let {
        name,
        description,
        year,
        career_id,
    } = req.body

    try {
        const subject = await addSubjectService(name, description, year, career_id)
        response.data = subject
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const updateSubjectAction = async function (req, res) {
    let response = logRequest(req)
    try {
        let {
            id,
            name,
            description,
            year,
            career_id,
        } = req.body

        const subjectUpdate = await updateSubjectService(id, name, description, year, career_id)
        response.data = subjectUpdate
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(500).send(response)
    }
}