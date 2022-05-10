import { Request, Response } from "express";
import JobOffer from "../models/jobOffer";

// Controllers for Offer List

export const getOffersList = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const offers = await JobOffer.find();
        return res.status(200).json(offers);
    } catch (error) {
        return res.status(500).json({ message: "Something weng wrong!" });
    }
};

export const createOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const newJobOffer = JobOffer.create(req.body);
        await newJobOffer.save();
    } catch (error) {
        return res.status(500).json({ message: "Something went wronng!" });
    }

    return res
        .status(201)
        .json({ message: "Offer has been created successfully" });
};

// Controlers for offer detail

export const removeJobOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const deletedEntity = await JobOffer.delete({ id: req.params.id });
        console.log(deletedEntity);
        if (!deletedEntity.affected)
            return res
                .status(409)
                .json({ message: "That entity does not exist!" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
    return res
        .status(200)
        .json({ message: `Offer ${req.params.id} deleted successfully!` });
};

export const getOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const offer = await JobOffer.findOneBy({ id: req.params.id });
        return res.status(200).json(offer);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const updateOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const offer = await JobOffer.findOneBy({ id: req.params.id });
        Object.assign(offer, req.body);
        await offer?.save();
        return res.status(200).json(offer);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
