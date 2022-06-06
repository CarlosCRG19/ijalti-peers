import { Request, Response } from "express";
import axios, { Axios, AxiosRequestConfig } from "axios";
import { Company, User } from "../models";

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

export const signupCompany = async (req: Request, res: Response): Promise<Response> => { 
    // Need to create a firebase user with email and password 
    
    const firebaseSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`
    
    const {email, password, company} = req.body;
    const { username } = company;
    
    
    const signupRequestConfig: AxiosRequestConfig = {
        url: firebaseSignupURL, 
        method: "POST",
        data: {
            email,
            password,
            returnSecureToken: true
        }
    }
    
    try{
        const newCompany: Company = Company.create({...company}); 
        await newCompany.save()

        const signupResponse = await axios(signupRequestConfig);
        const {localId, idToken, refreshToken, expiresIn} = signupResponse.data;

        const newUser = User.create({firebaseId: localId, username}); 
        await newUser.save();

        newCompany.user = newUser;
        newCompany.save();

        const responseBody = {
            user: newUser, 
            role: "company", 
            company: {...newCompany, user: undefined}, 
            idToken, 
            refreshToken,
            expiresIn,
        } 

        return res.status(201).json(responseBody);

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong!"})
    }

}

export const loginCompany = async (req: Request, res: Response) => {
    // Perform firebase login
    try {
        const firebaseLoginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
        
        const {email, password} = req.body;

        const logInRequestConfig: AxiosRequestConfig = {
            url: firebaseLoginUrl,
            method: "POST",
            data: {
                email,
                password,
                returnSecureToken: true
            }
        };

        const loginResponse = await axios(logInRequestConfig);
        
        const {localId, idToken, refreshToken, expiresIn} = loginResponse.data;

        const user = await User.findOneBy({firebaseId: localId});
        if(!user) return res.status(409).json({message: "Company was not found!"})
        
        const company = await Company.findOneBy({user: {id: user.id}});
        
        if(company === null) return res.status(409).json({messaage: "Your user exists, but the company does not!"})

        const responseBody = {
            user: user.id, 
            role: "company",
            company: company,
            idToken,
            refreshToken,
            expiresIn,

        }

        return res.status(200).json(responseBody);

    } catch(error) {
        console.log("Exception handling pending");
        console.log(error);
        return res.status(500).json({message: "Something went wrong!"});
    }
}
