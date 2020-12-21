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
const User_1 = __importDefault(require("../../entity/User"));
const index_1 = require("../../utils/index");
// NOTE req에 Request를 입력하면 이상하게 req.file.location을 못읽어옵니다...
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.decodedId;
    yield User_1.default.findOne({ id })
        .then((user) => {
        user.profileImg === "noPath" ? null : index_1.deleteImg(user.profileImg);
    })
        .catch((err) => next(err));
    const infoData = { profileImg: req.file.location };
    yield User_1.default.changeInfo(id, infoData)
        .then(() => {
        res.status(200).send(Object.assign(Object.assign({}, infoData), { isChanged: true }));
        return;
    })
        .catch((err) => {
        res.status(400).send({ message: "사진 변경에 실패했습니다." });
        return;
    });
});
//# sourceMappingURL=changeimg.js.map