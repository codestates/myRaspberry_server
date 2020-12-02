import * as express from 'express'
import {searchController} from '../controller'
const router = express.Router()

// GET, /search/:method/:value
router.get('/:method/:value', searchController.searchMovie)

export default router
