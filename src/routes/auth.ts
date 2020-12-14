import * as express from "express";
import { authController } from "../controller";
import { isLoggedIn } from "../utils";

const router = express.Router();

// Local Sign
// POST, auth/signup
router.post("/signup", authController.localsignup);

// POST, /auth/signin
router.post("/signin", authController.localsignin);

// GET, /auth/signout
router.get("/signout", isLoggedIn, authController.signout);

// Social Sign

// KAKAO
// GET, /auth/kakao
router.get("/kakao", authController.kakao);
router.get("/kakao/callback", authController.kakaoCallBack);

// GOOGLE
// GET, /auth/google
router.get("/google", authController.google);
router.get("/google/callback", authController.googleCallBack);
export default router;
