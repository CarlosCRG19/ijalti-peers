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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const company_1 = __importDefault(require("./routes/company"));
const jobOffer_1 = __importDefault(require("./routes/jobOffer"));
const createDatabaseConnection_1 = __importDefault(require("./createDatabaseConnection"));
const initializeExpress = () => {
    const PORT = process.env.PORT;
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(company_1.default);
    app.use(jobOffer_1.default);
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
};
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createDatabaseConnection_1.default)();
    initializeExpress();
});
initializeApp();
