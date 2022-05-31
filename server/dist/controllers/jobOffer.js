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
exports.updateOffer = exports.getOffer = exports.removeJobOffer = exports.createOffer = exports.getOffersList = void 0;
const jobOffer_1 = __importDefault(require("../models/jobOffer"));
// Controllers for Offer List
const getOffersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield jobOffer_1.default.find();
        return res.status(200).json(offers);
    }
    catch (error) {
        return res.status(500).json({ message: "Something weng wrong!" });
    }
});
exports.getOffersList = getOffersList;
const createOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newJobOffer = jobOffer_1.default.create(req.body);
        yield newJobOffer.save();
        return res.status(200).json({ message: "Offer has been created successfully", newJobOffer });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wronng!" });
    }
});
exports.createOffer = createOffer;
// Controlers for offer detail
const removeJobOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEntity = yield jobOffer_1.default.delete({ id: req.params.id });
        console.log(deletedEntity);
        if (!deletedEntity.affected)
            return res
                .status(409)
                .json({ message: "That entity does not exist!" });
        return res
            .status(200)
            .json({ message: `Offer ${req.params.id} deleted successfully!`, deletedEntity });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.removeJobOffer = removeJobOffer;
const getOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield jobOffer_1.default.findOneBy({ id: req.params.id });
        return res.status(200).json(offer);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.getOffer = getOffer;
const updateOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield jobOffer_1.default.findOneBy({ id: req.params.id });
        Object.assign(offer, req.body);
        yield (offer === null || offer === void 0 ? void 0 : offer.save());
        return res.status(200).json(offer);
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
});
exports.updateOffer = updateOffer;
