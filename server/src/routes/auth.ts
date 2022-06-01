import { Router } from "express";
import { firebaseMiddleware } from "../middlewares/auth";
import { signupCompany, loginCompany, signupAspirant, loginAspirant } from "../controllers";

const authRouter = Router({mergeParams: true});

const signupRouter = Router();
const loginRouter = Router();

signupRouter.post("/signup/company", signupCompany);
signupRouter.post("/signup/aspirant",signupAspirant);

loginRouter.post("/login/company", loginCompany);
loginRouter.post("/login/aspirant", loginAspirant);

authRouter.use(signupRouter);
authRouter.use(loginRouter);

export default authRouter;