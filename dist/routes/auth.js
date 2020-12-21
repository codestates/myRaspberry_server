"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const controller_1 = require("../controller");
const utils_1 = require("../utils");
const router = express.Router();
// GET, auth/getinfo
router.get("/getinfo", utils_1.isLoggedIn, controller_1.authController.getinfo);
// Local Sign
// POST, auth/signup
router.post("/signup", controller_1.authController.localsignup);
// POST, /auth/signin
router.post("/signin", controller_1.authController.localsignin);
// GET, /auth/signout
router.get("/signout", utils_1.isLoggedIn, controller_1.authController.signout);
// Social Sign
// KAKAO
// GET, /auth/kakao
router.get("/kakao", controller_1.authController.kakao);
router.get("/kakao/callback", controller_1.authController.kakaoCallBack);
// GOOGLE
// GET, /auth/google
router.get("/google", controller_1.authController.google);
router.get("/google/callback", controller_1.authController.googleCallBack);
exports.default = router;
//# sourceMappingURL=auth.js.map