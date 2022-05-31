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
const typeorm_1 = require("typeorm");
const models_1 = __importDefault(require("./models"));
const getConnectionCredentials = () => {
    if (process.env.DATABASE_URL) {
        return ({
            url: process.env.DATABASE_URL,
            extra: { rejectUnauthorized: false }
        });
    }
    return ({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
};
const createDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let connectionOptions = {
        type: "postgres",
        entities: models_1.default,
        synchronize: true,
    };
    Object.assign(connectionOptions, getConnectionCredentials());
    const connection = yield (0, typeorm_1.createConnection)(connectionOptions);
    return connection;
});
exports.default = createDatabaseConnection;
