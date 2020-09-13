import express from 'express'

import {
    readCareersAction,
    addCareersAction,
    updateCareerAction
} from './controllers/CareerController'
import {
    readSubjectsAction,
    addSubjectAction,
    updateSubjectAction,
} from './controllers/SubjectController'
import {
    authToken
} from '../middleware/auth'


const router = express.Router()

router.get('/api/careers', readCareersAction)
router.post('/api/careers/career', addCareersAction)
router.put('/api/careers/career', updateCareerAction)

router.post('/api/subjects/subject', addSubjectAction)
router.put('/api/subjects/subject', updateSubjectAction)

router.get('/api/subjects', readSubjectsAction)


export default router;