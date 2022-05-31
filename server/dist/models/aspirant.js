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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./user"));
var WorkingStatusChoices;
(function (WorkingStatusChoices) {
    WorkingStatusChoices[WorkingStatusChoices["Employed"] = 0] = "Employed";
    WorkingStatusChoices[WorkingStatusChoices["Unemployed"] = 1] = "Unemployed";
    WorkingStatusChoices[WorkingStatusChoices["Hiring"] = 2] = "Hiring";
    WorkingStatusChoices[WorkingStatusChoices["Searching"] = 3] = "Searching";
})(WorkingStatusChoices || (WorkingStatusChoices = {}));
let Aspirant = class Aspirant extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Aspirant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aspirant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aspirant.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Aspirant.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aspirant.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aspirant.prototype, "residenceCountry", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aspirant.prototype, "residenceState", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Aspirant.prototype, "residenceCity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Aspirant.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Aspirant.prototype, "workingStatus", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.default),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_1.default)
], Aspirant.prototype, "user", void 0);
Aspirant = __decorate([
    (0, typeorm_1.Entity)()
], Aspirant);
exports.default = Aspirant;
