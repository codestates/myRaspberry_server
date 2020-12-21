"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = void 0;
const typeorm_1 = require("typeorm");
function getOptions(method, count, tagnum1, tagnum2, tagnum3) {
    const obj = {
        where: {},
        order: { date: "DESC" },
        skip: 25 * count,
        take: 25
    };
    switch (method) {
        case "kor":
            obj.where = { docid: typeorm_1.Like("%K%") };
            return obj;
        case "eng":
            obj.where = { docid: typeorm_1.Not(typeorm_1.Like("%K%")) };
            return obj;
        case "short":
            obj.where = { runtime: typeorm_1.LessThan(91) };
            return obj;
        case "long":
            obj.where = { runtime: typeorm_1.MoreThan(150) };
            return obj;
        case "tag":
            obj.where = [{ tag: typeorm_1.Like(tagnum1) }, { tag: typeorm_1.Like(tagnum2) }, { tag: typeorm_1.Like(tagnum3) }];
            return obj;
        case "title":
            obj.where = { title: typeorm_1.Like(tagnum1) };
            return obj;
        default:
            const newDate = new Date();
            const year = String(newDate.getFullYear());
            // const month = String(newDate.getMonth()+1);
            obj.where = { date: typeorm_1.Like(`%${year}%`) };
            return obj;
    }
}
exports.getOptions = getOptions;
//# sourceMappingURL=getOptions.js.map