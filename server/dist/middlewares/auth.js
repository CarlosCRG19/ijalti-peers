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
exports.firebaseMiddleware = void 0;
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const firebaseMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader)
            throw Error;
        const bearer = authHeader.split(" ");
        const bearerToken = bearer[1];
        const decodedToken = yield firebaseConfig_1.auth.verifyIdToken(bearerToken);
        req.user_id = decodedToken.uid;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 401,
            message: "Unauthorized"
        });
    }
});
exports.firebaseMiddleware = firebaseMiddleware;
