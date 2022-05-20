import { Request, Response } from "express";
import axios, { Axios, AxiosRequestConfig } from "axios";
import Company from "../models/company";
import User from "../models/user";

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
        return res.status(200).json({message: "Company created", newCompany});
    }catch(error){
        console.log(error);
        return res.status(400).json({message: "Something went wrong"});
    }
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

export const companySignUp = async (req: Request, res: Response): Promise<Response> => { 
    // Need to create a firebase user with email and password 
    const firebaseSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`
    
    const signUpRequestConfig: AxiosRequestConfig = {
        url: firebaseSignupURL, 
        data: {
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: true
        }
    }

    try{
        const signUpResponse = await axios(signUpRequestConfig);
        // Create User from signUpResponse 
        const newUser = User.create({firebaseId: signUpResponse.data.localId}); 
        await newUser.save();
        // User is created. 

        // Signup is performed, proceed to write data to DB
        const newCompany = Company.create({...req.body.company, userId: newUser}); 
        await newCompany.save()

        // Company is created, prepare response body

        const responseBody = {
            userId: newUser, 
            role: "company", 
            company: newCompany, 
            idToken: signUpResponse.data.idToken, 
            refreshToken: signUpResponse.data.refreshToken,
            expiresIn: signUpResponse.data.expiresIn,
        } 

        return res.status(201).json(responseBody);

    } catch(error) {
        console.log("Exception handling pending");

        return res.status(500).json({message: "Something went wrong!"})

    }

}