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
exports.companyLogIn = exports.companySignUp = exports.updateCompany = exports.removeCompany = exports.getCompany = exports.createCompany = exports.getCompaniesList = void 0;
const axios_1 = __importDefault(require("axios"));
const company_1 = __importDefault(require("../models/company"));
const user_1 = __importDefault(require("../models/user"));
const getCompaniesList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield company_1.default.find();
        return res.status(200).json(companies);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getCompaniesList = getCompaniesList;
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCompany = company_1.default.create(req.body);
        yield newCompany.save();
        return res.status(200).json({ message: "Company created", newCompany });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong" });
    }
});
exports.createCompany = createCompany;
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield company_1.default.findOneBy({ id: req.params.id });
        if (!company)
            return res.status(409).send({ message: "Company not found" });
        return res.status(200).send({ message: `Company ${req.params.id} found`, company });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getCompany = getCompany;
const removeCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield company_1.default.findOneBy({ id: req.params.id });
    if (!company)
        return res.status(409).send({ message: "Company not found" });
    try {
        yield company.remove();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).send({ message: `Company ${req.params.id} removed`, company });
});
exports.removeCompany = removeCompany;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield company_1.default.findOneBy({ id: req.params.id });
    if (!company)
        return res.status(409).send({ message: "Company not found" });
    Object.assign(company, req.body);
    try {
        yield company.save();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: `Company ${company.id} updated`, company });
});
exports.updateCompany = updateCompany;
const companySignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // Need to create a firebase user with email and password 
    const firebaseSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;
    const signUpRequestConfig = {
        url: firebaseSignupURL,
        method: "POST",
        data: {
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: true
        }
    };
    try {
        const signUpResponse = yield (0, axios_1.default)(signUpRequestConfig);
        // Create User from signUpResponse 
        const newUser = user_1.default.create({ firebaseId: signUpResponse.data.localId });
        yield newUser.save();
        // User is created. 
        // Signup is performed, proceed to write data to DB
        const newCompany = company_1.default.create(Object.assign(Object.assign({}, req.body.company), { user: newUser }));
        yield newCompany.save();
        // Company is created, prepare response body
        const responseBody = {
            user: newUser,
            role: "company",
            company: newCompany,
            idToken: signUpResponse.data.idToken,
            refreshToken: signUpResponse.data.refreshToken,
            expiresIn: signUpResponse.data.expiresIn,
        };
        return res.status(201).json(responseBody);
    }
    catch (error) {
        console.log("Exception handling pending");
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.companySignUp = companySignUp;
const companyLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Perform firebase login
    try {
        const firebaseLoginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
        const logInRequestConfig = {
            url: firebaseLoginUrl,
            method: "POST",
            data: {
                email: req.body.email,
                password: req.body.password,
                returnSecureToken: true
            }
        };
        const firebaseLoginResponse = yield (0, axios_1.default)(logInRequestConfig);
        const user = yield user_1.default.findOneBy({ firebaseId: firebaseLoginResponse.data["localId"] });
        console.log(user);
        if (user == null)
            return res.status(409).json({ message: "Company was not found!" });
        const company = yield company_1.default.findOneBy({ user: { id: user.id } });
        if (company === null)
            return res.status(409).json({ messaage: "Your user exists, but the company does not!" });
        const responseBody = {
            user: user.id,
            role: "company",
            company: company,
            idToken: firebaseLoginResponse.data.idToken,
            refreshToken: firebaseLoginResponse.data.refreshToken,
            expiresIn: firebaseLoginResponse.data.expiresIn,
        };
        return res.status(200).json(responseBody);
    }
    catch (error) {
        console.log("Exception handling pending");
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.companyLogIn = companyLogIn;
