import { Request, Response } from "express";
import Company from "../models/company";


const getCompanies = async (req: Request, res: Response): Promise<void> => {
    const companies  = await Company.find();
    res.status(200).json(companies);
};

const createCompany = async (req: Request, res: Response): Promise<void> => {
    const newCompany = Company.create(req.body);
    
    
    await newCompany.save();

    res.status(200).json({msg:"Company created"});
}


export { getCompanies, createCompany };
