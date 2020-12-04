import * as express from 'express'
import {authController} from '../controller'

const router = express.Router()

// Local Sign

// POST, /user/signup
router.post('/signup', authController.localsignup)

// POST, /user/signin
router.post('/signin', authController.localsignin)

router.get('/signout', authController.signout)
// Social Sign

// KAKAO
router.get('/kakao', authController.kakao)
router.get('/kakao/callback', authController.kakaoCallBack)

// GOOGLE
router.get('/google', authController.google)
router.get('/google/callback', authController.googleCallBack)
export default router
