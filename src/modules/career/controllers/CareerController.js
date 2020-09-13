import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    readCareersService,
    addCareerService,
    updateCareerService
} from '../services/CareerService'
import {
    createResponseFormat
} from '../../../helpers/responseFormat'

let response = createResponseFormat();

export const readCareersAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const careers = await readCareersService()
        response.data = careers
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const addCareersAction = async function (req, res) {

    let response = logRequest(req)
    let {
        name,
    } = req.body

    try {
        const career = await addCareerService(name)
        response.data = career
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const updateCareerAction = async function (req, res) {
    let response = logRequest(req)
    try {
        let {
            id,
            name
        } = req.body

        const careerUpdate = await updateCareerService(id, name)
        response.data = careerUpdate
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(500).send(response)
    }
}