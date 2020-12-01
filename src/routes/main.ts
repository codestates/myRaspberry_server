import * as express from 'express'
import {mainController} from '../controller'
const router = express.Router()

// GET, /main/default
router.get('/default', mainController.basic)

export default router
