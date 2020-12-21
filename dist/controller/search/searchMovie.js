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
const utils_1 = require("../../utils");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.decodedId;
    const { method } = req.params;
    let options;
    let result;
    let tagInfo;
    if (Number(method)) {
        const tagOptions = [`[${method},%`, `%,${method},%`, `%,${method}]`];
        options = utils_1.getOptions("tag", 0, ...tagOptions);
        const tags = yield entity_1.User.findOne({ id }).then((user) => JSON.parse(user.tag));
        tagInfo = yield entity_1.Tag.findOne({ id: Number(method) });
        const dbMovies = yield entity_1.Handlemovie.find(options).then((data) => data.map((el) => utils_1.convertJsonToData(el)));
        result = utils_1.sortMovie(tags, dbMovies);
    }
    else if (method === "title") {
        const { name } = req.query;
        const tagOptions = `%${name}%`;
        options = utils_1.getOptions(method, 0, tagOptions);
        const tags = yield entity_1.User.findOne({ id }).then((user) => JSON.parse(user.tag));
        const dbMovies = yield entity_1.Handlemovie.find(options).then((data) => data.map((el) => utils_1.convertJsonToData(el)));
        result = utils_1.sortMovie(tags, dbMovies);
    }
    else if (method === "new" || "kor" || "eng" || "short" || "long") {
        yield entity_1.User.findOne({ id })
            .then((data) => JSON.parse(data.searchCount))
            .then((data) => {
            data[`${method}`] = data[`${method}`] + 1;
            return data;
        })
            .then((searchCount) => {
            const data = { searchCount: JSON.stringify(searchCount) };
            return entity_1.User.changeInfo(id, data);
        });
        const { tags, count } = yield entity_1.User.findOne({ id }).then((user) => {
            const returnData = { tags: JSON.parse(user.tag), count: JSON.parse(user.searchCount) };
            return returnData;
        });
        options = utils_1.getOptions(method, count[`${method}`]);
        const dbMovies = yield entity_1.Handlemovie.find(options).then((data) => data.map((el) => utils_1.convertJsonToData(el)));
        result = utils_1.sortMovie(tags, dbMovies);
    }
    if (result.length) {
        tagInfo ? res.status(200).send({ tagInfo, result }) : res.status(200).send(result);
        return;
    }
    res.status(200).send("해당 영화를 찾지 못했습니다.");
    return;
});
//# sourceMappingURL=searchMovie.js.map