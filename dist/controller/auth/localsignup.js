"use strict";
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const User_1 = __importDefault(require("../../entity/User"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("he");
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({
        email
    });
    if (user) {
        res.status(400).send({
            message: "이미 존재하는 이메일입니다."
        });
    }
    else {
        const username = email.slice(0, 3);
        const passhash = bcryptjs_1.default.hashSync(password, 12);
        const register = yield User_1.default.register(email, passhash, username);
        if (!register) {
            res.send(400).send({
                message: "회원 가입에 실패했습니다."
            });
            return;
        }
        res.status(201).send("회원가입에 성공했습니다.");
        return;
    }
});
//# sourceMappingURL=localsignup.js.map