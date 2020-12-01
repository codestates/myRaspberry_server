import * as express from 'express'
import {userController} from '../controller'
const router = express.Router()

// POST /user/signin
router.post('/signin', userController.signIn)

// POST /user/signup
router.post('/signup', userController.signUp)

// GET /user/signOut
router.get('/signOut', userController.signOut)

// GET /user/changeinfo
router.get('/changeinfo', userController.changeInfo)

// GET /user/deleteuser
router.get('/deleteuser', userController.deleteUser)

export default router
