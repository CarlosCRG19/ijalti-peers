import { Router } from "express";
import { getCompaniesList, createCompany, getCompany, removeCompany, updateCompany, signupCompany, loginCompany} from "../controllers";

const companiesRouter = Router();

const companyList = companiesRouter.route("/companies");
const companyDetail = companiesRouter.route("/companies/:id");

companyList.get(getCompaniesList);
companyList.post(createCompany);

companyDetail.get(getCompany);
companyDetail.delete(removeCompany);
companyDetail.put(updateCompany)

companiesRouter.post("/companies/signup", signupCompany);
companiesRouter.post("/companies/login", loginCompany);

export default companiesRouter;
