import * as express from "express";
import { mypageController } from "../controller";
import { uploadImg } from "../utils";

const router = express.Router();

// PATCH /mypage/changeinfo
router.patch("/changeinfo", mypageController.changeinfo);

// PATCH /mypage/changeimg
router.patch("/changeimage", uploadImg.single("img"), mypageController.changeimg);

export default router;
