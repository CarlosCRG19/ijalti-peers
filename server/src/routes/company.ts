import { Router } from "express";
import { getCompanies } from "../controllers";

const companiesRouter = Router();

companiesRouter.get("/companies", getCompanies);

export default companiesRouter;
