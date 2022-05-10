import { Request, Response } from "express";
import Company from "../models/company";

export const getCompaniesList = async (req: Request, res: Response): Promise<Response> => {
    try{
        const companies  = await Company.find();
        return res.status(200).json(companies);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
    
};

export const createCompany = async (req: Request, res: Response): Promise<Response> => {
    try{
        const newCompany = Company.create(req.body);
        await newCompany.save();
    }catch(error){
        console.log(error);
        return res.status(400).json({message: "Something went wrong"});
    }

    return res.status(200).json({message: "Company created"});
}

export const getCompany = async (req: Request, res: Response): Promise<Response> => {
    try{
        const company = await Company.findOneBy({id : req.params.id});
        
        if(!company) return res.status(409).send({message: "Company not found"});
        
        return res.status(200).send({ message: `Company ${req.params.id} found`, company });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}

export const removeCompany = async (req: Request, res: Response): Promise<Response>  => {
    const company = await Company.findOneBy({id : req.params.id});

    if(!company) return res.status(409).send({message: "Company not found"});

    try{
        await company.remove();
    
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
    
    return res.status(200).send({ message:`Company ${req.params.id} removed`, company});
}

export const updateCompany = async (req: Request, res: Response): Promise<Response> => {
    const company = await Company.findOneBy({id : req.params.id});
    
    if(!company) return res.status(409).send({message: "Company not found"});

    Object.assign(company, req.body);
    try{
        await company.save();
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
    return res.status(200).json({message : `Company ${company.id} updated`, company})
}