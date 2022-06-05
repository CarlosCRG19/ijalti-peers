import { Request, Response } from "express";
import JobOffer from "../models/jobOffer";
import { numArr2ObjArr } from "../utils";

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
        const { preferredSkills, requiredSkills } = req.body;

        const newJobOffer = JobOffer.create({
            ...req.body,
            preferredSkills: preferredSkills && numArr2ObjArr(req.body.preferredSkills),
            requiredSkills: requiredSkills && numArr2ObjArr(req.body.requiredSkills)

        });
        await newJobOffer.save();
        return res.status(200).json({ message: "Offer has been created successfully", newJobOffer});
    } catch (error) {
        return res.status(500).json({ message: "Something went wronng!", error });
    }
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
        return res
            .status(200)
            .json({ message: `Offer ${req.params.id} deleted successfully!`,  deletedEntity});
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const getOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const offer = await JobOffer.findOne({
            where: {id: req.params.id},
            relations: ['preferredSkills', 'requiredSkills']
        });
        return res.status(200).json(offer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const updateOffer = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const offer = await JobOffer.findOneBy({ id: req.params.id });

        if(!offer) return res.status(409).json({message: "Offer not found"});

        Object.assign(offer, req.body);
        
        const {preferredSkills, requiredSkills} = req.body; 

        if(requiredSkills) offer.requiredSkills = numArr2ObjArr(requiredSkills);

        if(preferredSkills) offer.preferredSkills = numArr2ObjArr(preferredSkills);


        await offer?.save();
        return res.status(200).json({ message: "Offer updated" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
