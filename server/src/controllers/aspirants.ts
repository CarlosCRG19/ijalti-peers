import { Request, Response } from "express";
import axios from "axios";
import { numArr2ObjArr } from "../utils";
import { Aspirant, JobOffer, User } from "../models";

export const getAspirantList = async (req: Request, res: Response): Promise<Response> => {
    try {
        if(req.query.skills){
            let {skills : skillList}: any = req.query;
            
            if(typeof skillList === "string"){
                skillList = [skillList]
            }
            
            skillList = skillList?.map((skill: string) => Number(skill));
        
            const aspirants = await Aspirant.createQueryBuilder("aspirant")
            .select("aspirant")
            .innerJoin('aspirant.skills', 'aspSkills', 'aspSkills.id IN (:...skillIds)', 
            { skillIds: skillList})
            .getMany();

            return res.status(200).json(aspirants);    
        }

        const aspirants = await Aspirant.find();
        
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

    try {
        const { aspirant, email, password } = req.body;
        const { username } = aspirant;
        
        const newAspirant: Aspirant = Aspirant.create({ 
            ...aspirant,
            skills: numArr2ObjArr(aspirant.skills)
        }); 
        await newAspirant.save();

        const firebaseResponse = await axios({
            method: "POST",
            url: firebaseSignupURL,
            data: { email, password, returnSecureToken: true }
        });
        const {
            idToken,
            expiresIn,
            localId,
            refreshToken
        } = firebaseResponse.data;

        const previousUser = await User.findOneBy({firebaseId: localId});
        if(previousUser) await previousUser.remove();
        
        const newUser = User.create({ firebaseId: localId, username, email});
        await newUser.save();

        newAspirant.user = newUser;
        await newAspirant.save();

        return res.status(201).json({
            idToken,
            expiresIn,
            refreshToken,
            user: newUser,
            role: "aspirant",
            aspirant: {...newAspirant, user: undefined},
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const loginAspirant = async (req: Request, res: Response): Promise<Response> => {
    const firebaseLoginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

    try {
        const { email, password } = req.body;

        const firebaseResponse = await axios({
            method: "POST",
            url: firebaseLoginURL,
            data: { email, password, returnSecureToken: true }
        });
        const {
            idToken,
            expiresIn,
            localId,
            refreshToken
        } = firebaseResponse.data;
        const user = await User.findOneBy({ firebaseId: localId });
        console.log({...user});

        if(!user) return res.status(409).json({message: "Aspirant was not found!"});

        const aspirant = await Aspirant.findOneBy({ user: { id: user.id } });

        if (!aspirant) return res.status(409).json({ message: "Your user exists, but it has not been associated with an aspirant"});

        return res.status(200).json({
            aspirant: {...aspirant, user: undefined},
            idToken,
            expiresIn,
            refreshToken,
            user: user.id,
            role: "aspirant",
        });
    } catch(error) {
        return res.status(500).json({ message: "Something went wrong!" });
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
        
        const offer = await JobOffer.findOneBy({id: req.params.offerId});
        if(!offer) throw new Error("Job Offer not found");

        aspirant.interestedInOffers.push(offer)
        await aspirant.save();

        return res.status(200).json({message: "Added a new interest", offer});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"})
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

        return res.status(200).json({message: "Removed interest", offer: fetchedOffer});

    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "Something went wrong!"});
    }
}