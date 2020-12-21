"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const removeQuete = (str) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== '"') {
            result += str[i];
        }
    }
    return result;
};
exports.default = (obj) => {
    const newData = {};
    for (const key in obj) {
        if (key === "image" || key === "tag") {
            newData[key] = JSON.parse(obj[key]);
        }
        else {
            newData[key] = typeof obj[key] === "string" ? removeQuete(obj[key]) : obj[key];
        }
    }
    return newData;
};
//# sourceMappingURL=removeQuete.js.map