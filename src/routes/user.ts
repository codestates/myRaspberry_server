import * as express from 'express'
import {userController} from '../controller'
const router = express.Router()

//* GET /user/signin
router.get('/signin', userController.signin)

//* GET /user/signup
router.get('/signup', userController.signup)

//* GET /user/changeinfo
router.get('/changeinfo', userController.changeinfo)

//* GET /user/deleteuser
router.get('/deleteuser', userController.deleteuser)

export default router
