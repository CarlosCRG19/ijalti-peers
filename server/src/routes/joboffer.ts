import { Router } from "express";
import { getOffersList, createOffer } from "../controllers";

const jobOfferRouter = Router();
const jobOfferList = jobOfferRouter.route("/job-offers");

jobOfferList.get(getOffersList);
jobOfferList.post(createOffer);

export default jobOfferRouter;
