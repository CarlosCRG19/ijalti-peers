import { Router } from "express";
import { getCompanies, createCompany } from "../controllers";

const companiesRouter = Router();
const companyList = companiesRouter.route("/companies")

companyList.get(getCompanies);
companyList.post(createCompany);

export default companiesRouter;
