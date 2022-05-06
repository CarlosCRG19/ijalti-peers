import { Router } from "express";
import { getCompaniesList, createCompany, getCompany, destroyCompany} from "../controllers";

const companiesRouter = Router();

const companyList = companiesRouter.route("/companies")
const companyDetail = companiesRouter.route("/companies/:id")

companyList.get(getCompaniesList);
companyList.post(createCompany);

companyDetail.get(getCompany);
companyDetail.delete(destroyCompany);

export default companiesRouter;
