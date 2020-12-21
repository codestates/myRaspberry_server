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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next, err, user, info, isLocal) => __awaiter(void 0, void 0, void 0, function* () {
    if (err || info) {
        if (err) {
            next(err);
        }
        else {
            res.status(400).send(info);
            return;
        }
    }
    req.login(user, { session: false }, (err) => {
        err ? next(err) : null;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.cookie("token", token, {
        // httpOnly: true,
        // secure: true,
        });
        if (isLocal) {
            const { username, profileImg, tag, selectMovie } = user;
            res.status(200).send({
                username,
                profileImg,
                tag: JSON.parse(tag),
                selectMovie: JSON.parse(selectMovie)
            });
        }
        else {
            res.redirect("/");
            return;
        }
    });
});
//# sourceMappingURL=signResponse.js.map