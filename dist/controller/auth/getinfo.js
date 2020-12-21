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
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../../entity");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.decodedId;
    const result = yield entity_1.User.findOne({ id });
    const { username, profileImg, tag, selectMovie } = result;
    if (result) {
        res.status(200).send({
            username,
            profileImg,
            tag: JSON.parse(tag),
            selectMovie: JSON.parse(selectMovie)
        });
        return;
    }
    res.status(400).send({ message: "유저를 찾을 수 없습니다." });
    return;
});
//# sourceMappingURL=getinfo.js.map