import { Router } from "express";
import { getCompaniesList, createCompany, getCompany, removeCompany, updateCompany, companySignUp, companyLogIn} from "../controllers";

const companiesRouter = Router();

const companyList = companiesRouter.route("/companies");
const companyDetail = companiesRouter.route("/companies/:id");

companyList.get(getCompaniesList);
companyList.post(createCompany);

companyDetail.get(getCompany);
companyDetail.delete(removeCompany);
companyDetail.put(updateCompany)

companiesRouter.post("/companies/signup", companySignUp);
companiesRouter.post("/companies/login", companyLogIn);

export default companiesRouter;
