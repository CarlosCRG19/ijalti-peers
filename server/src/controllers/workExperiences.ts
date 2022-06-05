import { Request, Response } from "express";
import { Aspirant, WorkExperience } from "../models";

export const workExperiencesList = async (req: Request, res: Response) => {
    try {
        const filterConditions: Object = {
            aspirant: {id: req.query.aspirantId} || undefined,
            company: {id: req.query.companyId} || undefined,
        }

        const experiences = await WorkExperience.find({take: 50, where: filterConditions, loadRelationIds: true})

        return res.status(200).json(experiences);
    
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong!"})
    }
}

export const createExperience = async (req: Request, res: Response) => {
    try {
        const aspirant = await Aspirant.findOneBy({user: {firebaseId: req.user_id}});

        if(!aspirant) {
            return res.status(400).json({message: "You must be logged in as an aspirant"});
        }

        const newExperience: WorkExperience = WorkExperience.create({
            ...req.body, 
            aspirant: aspirant, 
            company: req.query.companyId || undefined
        });

        newExperience.save();
        return res.status(201).json(newExperience);

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong!"})
    }
}

export const removeExperience = async (req: Request, res: Response) => {
    try {
        const experience = await WorkExperience.findOneBy({id: req.params.id});
        
        if(!experience) return res.status(404).json({message: "Experience not found"});
        await experience.remove();
        return res.status(200).json({message: "Experience removed!"});

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong!"})
    
    }
}

export const workExperiencesByAspirant = async (req: Request, res: Response) => {
    try {
        const {aspirantId}: any = req.query;
        const experiences = await WorkExperience.find({where: {aspirant: {id: aspirantId}}});
        return res.status(200).json(experiences);

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong!"})
    }
}