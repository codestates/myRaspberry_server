"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let User = User_1 = class User extends typeorm_1.BaseEntity {
    static register(email, password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = {
                like: {},
                disLike: {}
            };
            const searchCount = {
                new: 0,
                kor: 0,
                eng: 0,
                short: 0,
                long: 0
            };
            const selectMovie = {};
            const { id } = (yield this.createQueryBuilder()
                .insert()
                .into(User_1)
                .values([
                {
                    email,
                    password,
                    username,
                    tag: JSON.stringify(tag),
                    searchCount: JSON.stringify(searchCount),
                    selectMovie: JSON.stringify(selectMovie)
                }
            ])
                .execute()).identifiers[0]; // 리턴값 = [ { id: 6 } ]
            return this.findOne({ id });
        });
    }
    static socialRegister(provider, socialId, username, profileImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = {
                like: {},
                disLike: {}
            };
            const searchCount = {
                new: 0,
                kor: 0,
                eng: 0,
                short: 0,
                long: 0
            };
            const selectMovie = {};
            const { id } = (yield this.createQueryBuilder()
                .insert()
                .into(User_1)
                .values([
                {
                    provider,
                    socialId,
                    username,
                    profileImg,
                    tag: JSON.stringify(tag),
                    searchCount: JSON.stringify(searchCount),
                    selectMovie: JSON.stringify(selectMovie)
                }
            ])
                .execute()).identifiers[0]; // 리턴값 = [ { id: 6 } ]
            return this.findOne({ id });
        });
    }
    static changeInfo(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder()
                .update(User_1)
                .set(data)
                .where("id = :id", { id })
                .execute();
            if (result.raw.affectedRows === 0) {
                return false;
            }
            return this.findOne({ id });
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ default: "local" }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column({ default: "0" }),
    __metadata("design:type", String)
], User.prototype, "socialId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ default: "socialLogin" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: "socialPassword" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: "noPath" }),
    __metadata("design:type", String)
], User.prototype, "profileImg", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isFirst", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumtext" }),
    __metadata("design:type", String)
], User.prototype, "tag", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumtext" }),
    __metadata("design:type", String)
], User.prototype, "searchCount", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumtext" }),
    __metadata("design:type", String)
], User.prototype, "selectMovie", void 0);
User = User_1 = __decorate([
    typeorm_1.Entity()
], User);
exports.default = User;
//# sourceMappingURL=User.js.map