import * as express from 'express'
const router = express.Router()
import {mypageController} from '../controller'
import {uploadImg} from '../utils'

// PATCH /mypage/changeinfo
router.patch('/changeinfo', mypageController.changeinfo)

// PATCH /mypage/changeimg
router.patch(
  '/changeimage',
  uploadImg.single('img'),
  mypageController.changeimg,
)

export default router
