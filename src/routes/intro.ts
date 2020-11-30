import * as express from 'express'
import {introController} from '../controller'
const router = express.Router()

//* GET /intro/default
router.get('/default', introController.basic)

export default router
