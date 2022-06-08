import {Request,Response, NextFunction} from "express";
import {auth} from "../firebase/firebaseConfig";

export const firebaseMiddleware = async (req: Request, res: Response, next: NextFunction) =>{

  try {
    const authHeader: any = req.headers["authorization"];
    
    if(!authHeader) throw Error;
    
    const bearer = authHeader.split(" ");
    const bearerToken = bearer[1];

    const decodedToken = await auth.verifyIdToken(bearerToken);
    req.user_id = decodedToken.uid;
    next();

  } catch(error){
    console.log(error);
    
    return res.status(401).json({
      status: 401,
      message: "Unauthorized"
    });
  }
}

