"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_1 = __importDefault(require("./company"));
const jobOffer_1 = __importDefault(require("./jobOffer"));
const user_1 = __importDefault(require("./user"));
const aspirant_1 = __importDefault(require("./aspirant"));
exports.default = [company_1.default, jobOffer_1.default, user_1.default, aspirant_1.default];
