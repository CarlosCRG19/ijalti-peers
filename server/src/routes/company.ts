import { Router } from "express";

import { firebaseMiddleware } from "../middlewares/auth";
import { getCompaniesList, createCompany, getCompany, removeCompany, updateCompany, signupCompany, loginCompany} from "../controllers";

const companiesRouter = Router();

const companyList = companiesRouter.route("/companies");
const companyDetail = companiesRouter.route("/companies/:id");

companyList.get(firebaseMiddleware, getCompaniesList);
companyList.post(createCompany);

companyDetail.get(getCompany);
companyDetail.delete(removeCompany);
companyDetail.put(updateCompany)

export default companiesRouter;
