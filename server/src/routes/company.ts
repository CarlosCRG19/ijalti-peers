import { Router } from "express";
import { getCompnaies } from "../controllers";

const companiesRouter = Router();

companiesRouter.get("/companies", getCompnaies);

export default companiesRouter;
