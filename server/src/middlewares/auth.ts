import {Request,Response, NextFunction} from "express";
import jwt from "jsonwebtoken";


export const firebaseMiddleware =(req: Request, res: Response, next: NextFunction) =>{
  const unauthorized = () => res.status(401).json({
    status: 401,
    message: "Unauthorized"
  });

  const decodeTokenFromBearer = (bearerHeader: string) =>{
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decodedToken = jwt.decode(bearerToken, {complete : true});
    return decodedToken
  }
  
  const bearerHeader = req.headers["authorization"];

  if(!bearerHeader){
    unauthorized();
    return;
  }

  const decodedToken = decodeTokenFromBearer(bearerHeader)

  if(decodedToken?.header.kid !== process.env.FIREBASE_AUTH_KID){
    unauthorized()
    return;
  }

  if(typeof(decodedToken?.payload) !== "string"){
    req.user_id  = decodedToken?.payload.user_id;
  }
  
  next();
}

