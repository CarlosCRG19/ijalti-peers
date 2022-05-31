import {Response, Request} from "express";
import {Skill} from "../models";

export const getSkillList = async (req: Request, res: Response): Promise<Response>  =>{
    try{
        const skills = await Skill.find();

        return res.status(200).json(skills);
    }catch(error){
       return res.status(500).json({ message: "Something went wrong", error });
    }
};

export const createSkill = async (req: Request, res: Response): Promise<Response> => {
    try{
        const newSkill = Skill.create(req.body);
        await newSkill.save();

        return res.status(201).json({ message: "Skill created", skill : newSkill });  
    }catch(error){
        return res.status(400).json({ message: "Something went wrong", error });
    }
};

export const getSkill = async (req: Request, res: Response) : Promise<Response> => {
    try{
        const skill = await Skill.findOneBy({ id : req.params.id });
        
        if (!skill) return res.status(409).json({ message: "Skill not found" });

        return res.status(200).json({ message: "Skill found", skill});
    } catch(error){
        return res.status(500).json({ message: "Something went wrong"})
    }
}

export const removeSkill = async (req: Request, res: Response): Promise<Response> => {
    try {
        const skill = await Skill.findOneBy({ id: req.params.id });

        if (!skill) return res.status(409).json({ message: "Skill not found" });

        await skill.remove();

        return res.status(200).json({ message: "Skill removed" });
    } catch(error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
