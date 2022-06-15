import { Request, Response } from "express";
import axios, { Axios, AxiosRequestConfig } from "axios";
import { numArr2ObjArr } from "../utils";
import { Aspirant, JobOffer, User } from "../models";

export const getAspirantList = async (req: Request, res: Response): Promise<Response> => {
    try {
        let {location, experience, education, skills}: any  = req.query

        if(!location && !experience && !education && !skills){
            const aspirants = await Aspirant.find()
            return res.status(200).json(aspirants);    
        }

        let query =  Aspirant.createQueryBuilder("aspirant").select("aspirant")

        if(skills){
            if(typeof skills === "string"){
                skills = [skills]
            }
            
            skills = skills?.map((skill: string) => Number(skill));
            query = query.innerJoinAndSelect('aspirant.skills', 'aspSkills', 'aspSkills.id IN (:...skillIds)', 
            { skillIds: skills })
        }
        
        if(location){
            query = query.andWhere("aspirant.residenceState = :state", { state: location }) 
        }

        if(experience){
            query = query.andWhere("aspirant.yearsOfExperience >= :years", { years : parseInt(experience) })
        }

        if(education){
            query = query.andWhere("aspirant.educationLevel = :educationLevel", { educationLevel: education})
        }
        
        query = query.leftJoinAndSelect('aspirant.skills', 'skills')
       
        const aspirants = await query.getMany();

        return res.status(200).json(aspirants);       
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!!", error });
    }
};

export const createAspirant = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newAspirant = Aspirant.create(req.body);
        await newAspirant.save();

        return res.status(201).json({ message: "Aspirant created", aspirant: newAspirant });
    } catch(error) {
        return res.status(400).json({ message: "Something went wrong", error });
    }
};

export const getAspirant = async (req: Request, res: Response): Promise<Response> => {
    try {
        const aspirant: Aspirant | null = await Aspirant.findOne({
            where: {id: req.params.id}, relations: ['skills', 'interestedInOffers', 'user']
        })
        if (!aspirant) return res.status(409).json({ message: "Aspirant not found" });

        const {email,username} = aspirant.user

        return res.status(200).json( { message: "Aspirant found", aspirant: { ...aspirant, email, username, user: undefined } });

    } catch(error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateAspirant = async (req: Request, res: Response): Promise<Response> => {
    try {
        const aspirant = await Aspirant.findOne({
            where: {id: req.params.id},
            relations: ['skills']
        });
        
        if (!aspirant) return res.status(409).json({ message: "Aspirant not found" });
        Object.assign(aspirant, req.body);
        
        const { skills } = req.body;

        if(skills) aspirant.skills = numArr2ObjArr(skills);

        await aspirant.save();

        return res.status(200).json({ message: "Aspirant updated" });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const removeAspirant = async (req: Request, res: Response): Promise<Response> => {
    try {
        const aspirant = await Aspirant.findOneBy({ id: req.params.id });

        if (!aspirant) return res.status(409).json({ message: "Aspirant not found" });

        await aspirant.remove();

        return res.status(200).json({ message: "Aspirant removed" });
    } catch(error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const signupAspirant = async (req: Request, res: Response): Promise<Response> => {
    const firebaseSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;
    
    const { aspirant, email, password } = req.body;
    const { username } = aspirant;
    
    const signupRequestConfig: AxiosRequestConfig = {
        url: firebaseSignupURL, 
        method: "POST",
        data: {
            email,
            password,
            returnSecureToken: true
        }
    }
    
    try {    
        const signupResponse = await axios(signupRequestConfig);
        const {
            idToken,
            expiresIn,
            localId,
            refreshToken
        } = signupResponse.data;
        
        const previousUser = await User.findOneBy({firebaseId: localId});
        if(previousUser) await previousUser.remove();
        
        const newUser = User.create( { firebaseId: localId, username, email, role: 'aspirant' } );
        await newUser.save();
        
        const newAspirant: Aspirant = Aspirant.create({ 
            ...aspirant,
            skills: numArr2ObjArr(aspirant.skills)
        }); 

        newAspirant.user = newUser;
        await newAspirant.save();

        const responseBody = {
            user: newUser, 
            role: 'aspirant', 
            aspirant: {...newAspirant, user: undefined}, 
            idToken, 
            expiresIn,
            refreshToken,
        } 

        return res.status(201).json(responseBody);

    } catch(error) {
        const {code : codeError}: any = error
        if(codeError === "ERR_BAD_REQUEST"){
            return res.status(409).json( {message: "Conflict, email is already registered"} )
        }
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const loginAspirant = async (req: Request, res: Response): Promise<Response> => {
    const firebaseLoginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

    try {
        const { email, password } = req.body;

        const logInRequestConfig: AxiosRequestConfig = {
            url: firebaseLoginURL,
            method: "POST",
            data: {
                email,
                password,
                returnSecureToken: true
            }
        };

        const loginResponse = await axios(logInRequestConfig);

        const {
            localId,
            idToken,
            refreshToken,
            expiresIn
        } = loginResponse.data;

        const user = await User.findOneBy( { firebaseId: localId } );
        console.log({...user});

        if(!user) return res.status(404).json( { message: "Aspirant not found!" } );

        const aspirant = await Aspirant.findOneBy( { user: { id: user.id } } );

        if (!aspirant) return res.status(409).json( { message: "Your user exists, but it has not been associated with an aspirant"} );

        const responseBody = {
            user: user.id, 
            role: "aspirant",
            aspirant: aspirant,
            idToken,
            refreshToken,
            expiresIn,
        }
    
        return res.status(200).json(responseBody);

    } catch(error) {
        const {code : codeError}: any = error
        
        if(codeError === "ERR_BAD_REQUEST"){
            return res.status(404).json( { message: "Aspirant  not found!" } )
        }

        console.log(error);
        return res.status(500).json( { message: "Something went wrong!" } );
    }
};

export const addInterest = async (req: Request, res: Response): Promise<Response> => {

    try {
        const aspirant = await Aspirant.findOne({
            where: {user: {firebaseId: req.user_id}},
            relations: ["interestedInOffers"]
        });
        
        if(!aspirant) throw new Error("Aspirant not found");

        if(req.params.id !== aspirant.id) throw new Error("Unauthorized");
        
        const offer = await JobOffer.findOneBy( {id: req.params.offerId} );
        if(!offer) throw new Error("Job Offer not found");

        aspirant.interestedInOffers.push(offer)
        await aspirant.save();

        return res.status(200).json( { message: "Added a new interest", offer } );

    } catch (error) {
        console.log(error);
        return res.status(500).json( { message: "Something went wrong" } )
    }
}

export const removeInterest = async (req: Request, res: Response): Promise<Response> => {
    try {
        const aspirant = await Aspirant.findOne({
            where: {user: {firebaseId: req.user_id}},
            relations: ["interestedInOffers"]
        })

        if(!aspirant) throw new Error("Aspirant not found");

        if(req.params.id !== aspirant.id) throw new Error("Unauthorized");
        
        const fetchedOffer = await JobOffer.findOneBy({id: req.params.offerId});
        if(!fetchedOffer) throw new Error("Job Offer not found");

        aspirant.interestedInOffers = aspirant.interestedInOffers.filter(offer => {
            console.log(offer.id !== req.params.offerId);
            return offer.id !== req.params.offerId;
        });
        await aspirant.save();

        return res.status(200).json( { message: "Removed interest", offer: fetchedOffer } );

    } catch (error) {
        console.log(error);
        return res.status(200).json( { message: "Something went wrong!" } );
    }
}