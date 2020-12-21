"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallBack = exports.google = exports.kakaoCallBack = exports.kakao = exports.localsignup = exports.localsignin = exports.signout = exports.getinfo = void 0;
const localsignin_1 = __importDefault(require("./localsignin"));
exports.localsignin = localsignin_1.default;
const localsignup_1 = __importDefault(require("./localsignup"));
exports.localsignup = localsignup_1.default;
const kakao_1 = require("./kakao");
Object.defineProperty(exports, "kakao", { enumerable: true, get: function () { return kakao_1.kakao; } });
Object.defineProperty(exports, "kakaoCallBack", { enumerable: true, get: function () { return kakao_1.kakaoCallBack; } });
const google_1 = require("./google");
Object.defineProperty(exports, "google", { enumerable: true, get: function () { return google_1.google; } });
Object.defineProperty(exports, "googleCallBack", { enumerable: true, get: function () { return google_1.googleCallBack; } });
const signout_1 = __importDefault(require("./signout"));
exports.signout = signout_1.default;
const getinfo_1 = __importDefault(require("./getinfo"));
exports.getinfo = getinfo_1.default;
//# sourceMappingURL=index.js.map