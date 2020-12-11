import * as express from 'express'
import {mypageController} from '../controller'
const router = express.Router()
import {upload} from '../utils/imageUpload'

// PUT /mypage/default
router.patch('/changeinfo', mypageController.changeinfo)

// POST /mypage/changeimg
router.patch('/changeimage', upload.single('img'), mypageController.changeimg)
//   (req: express.Request, res: express.Response) => {
//     console.log(req.file)
//   },

export default router
