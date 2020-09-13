import express from 'express'

import {
    readForumsAction,
    addForumAction,
    updateForumAction
} from './controllers/ForumController'
import {
    readPostsAction,
    addPostAction,
    updatePostAction
} from './controllers/PostController'
import {
    readTagsAction,
    addTagAction,
    updateTagAction
} from './controllers/TagController'
import {
    readFilesAction,
} from './controllers/FileController'
import {
    readCommentsAction,
} from './controllers/CommentController'
import {
    authToken
} from '../middleware/auth'
import { readCommentAction } from './controllers/CommentController'


const router = express.Router()
//FORUM
router.get('/api/forums', readForumsAction)
router.post('/api/forums/forum', addForumAction)
router.put('/api/forums/forum', updateForumAction)
//POST
router.get('/api/posts', readPostsAction)
router.post('/api/posts/post', addPostAction)
router.put('/api/posts/post', updatePostAction)
//TAG
router.get('/api/tags', readTagsAction)
router.post('/api/tags/tag', addTagAction)
router.put('/api/tags/tag', updateTagAction)


router.get('/api/files', readFilesAction)
router.get('/api/comments', readCommentsAction)



export default router;