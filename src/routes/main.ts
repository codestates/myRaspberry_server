import * as express from 'express'
import {mainController} from '../controller'
const router = express.Router()

//* GET /intro/default
router.get('/default', mainController.basic)

export default router
