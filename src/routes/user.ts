import * as express from 'express'
import {userController} from '../controller'
const router = express.Router()

// POST, /user/signin
router.post('/signin', userController.signIn)

// POST, /user/signup
router.post('/signup', userController.signUp)

// GET, /user/signOut
router.get('/signOut', userController.signOut)

// post, /user/changeinfo
router.post('/changeinfo', userController.changeInfo)

// delete, /user/deleteuser
router.delete('/deleteuser', userController.deleteUser)

export default router
