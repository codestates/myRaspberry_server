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
var Handlemovie_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Handlemovie = Handlemovie_1 = class Handlemovie extends typeorm_1.BaseEntity {
    static MovieRegister(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = (yield this.createQueryBuilder().insert().into(Handlemovie_1).values(Handlemovie_1)
                .execute()).identifiers[0];
            return id;
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Handlemovie.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, unique: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "docid", void 0);
__decorate([
    typeorm_1.Column({ type: "tinytext", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "tinytext", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "titleEng", void 0);
__decorate([
    typeorm_1.Column({ type: "tinytext", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "director", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "actor", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "plotKr", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "plotEng", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Handlemovie.prototype, "runtime", void 0);
__decorate([
    typeorm_1.Column({ type: "tinytext", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "genre", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "tag", void 0);
__decorate([
    typeorm_1.Column({ type: "tinytext", nullable: true }),
    __metadata("design:type", String)
], Handlemovie.prototype, "date", void 0);
Handlemovie = Handlemovie_1 = __decorate([
    typeorm_1.Entity()
], Handlemovie);
exports.default = Handlemovie;
//# sourceMappingURL=Handlemovie.js.map