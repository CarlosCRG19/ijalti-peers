import { Request, Response } from "express";
import JobOffer from "../models/jobOffer";

export const getOffersList = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const offers = await JobOffer.find();
    return res.status(200).json(offers);
};

export const createOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const newJobOffer = JobOffer.create(req.body);
    await newJobOffer.save();

    return res
        .status(201)
        .json({ message: "Offer has been created successfully" });
};
