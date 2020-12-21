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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const passport_1 = __importDefault(require("passport"));
const passportLocal = __importStar(require("passport-local"));
const passportGoogle = __importStar(require("passport-google-oauth20"));
const passportKakao = __importStar(require("passport-kakao"));
const bcryptjs_1 = require("bcryptjs");
const utils_1 = require("../utils");
const User_1 = __importDefault(require("../entity/User"));
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const KakaoStrategy = passportKakao.Strategy;
// NOTE - 로그인 전략 변경, session 사용하지 않음.
// passport.serializeUser((user: any, done) => {
//   return done(null, user.id)
// })
// passport.deserializeUser((id, done) => {
//   return User.findOne({where: {id}})
//     .then(user => done(null, user))
//     .catch(err => done(err))
// })
passport_1.default.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_1.default.findOne({ email: username });
    if (result) {
        if (bcryptjs_1.compareSync(password, result.password)) {
            delete result.password;
            return done(null, result);
        }
        return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
    }
    return done(null, false, {
        message: "일치하는 정보가 존재하지 않습니다."
    });
})));
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    const data = {
        provider: profile.provider,
        socialId: profile.id,
        username: profile.displayName,
        profileImg: profile.photos[0].value || "none"
    };
    return utils_1.socialSign(data, accessToken, refreshToken, done);
}));
passport_1.default.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: "",
    callbackURL: "/auth/kakao/callback"
}, (accessToken, refreshToken, profile, done) => {
    const data = {
        provider: profile.provider,
        socialId: profile.id,
        username: profile.displayName,
        profileImg: profile._json.properties.thumbnail_image || "none"
    };
    return utils_1.socialSign(data, accessToken, refreshToken, done);
}));
exports.default = passport_1.default;
//# sourceMappingURL=index.js.map