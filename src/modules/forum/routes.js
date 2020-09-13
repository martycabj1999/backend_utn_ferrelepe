import express from 'express'

import {
    readForumsAction,
    addForumAction,
    getForumAction,
    updateForumAction
} from './controllers/ForumController'
import {
    readPostsAction,
    addPostAction,
    getPostAction,
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
/* import {
    readCommentsAction,
} from './controllers/CommentController' */
import {
    authToken
} from '../middleware/auth'


const router = express.Router()
//FORUM
router.get('/api/forums', readForumsAction)
router.post('/api/forums/forum', addForumAction)
router.get('/api/forums/forum/:id', getForumAction)
router.put('/api/forums/forum', updateForumAction)
//POST
router.get('/api/posts', readPostsAction)
router.post('/api/posts/post', addPostAction)
router.get('/api/posts/post/:id', getPostAction)
router.put('/api/posts/post/:id', updatePostAction)
//TAG
router.get('/api/tags', readTagsAction)
router.post('/api/tags/tag', addTagAction)


//router.get('/api/files', readFilesAction)
//router.get('/api/comments', readCommentsAction)

export default router;