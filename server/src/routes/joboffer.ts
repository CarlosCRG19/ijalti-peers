import { Router } from "express";
import {
    getOffersList,
    createOffer,
    destroyJobOffer,
    getOffer,
    updateOffer,
} from "../controllers";

const jobOfferRouter = Router();
const jobOfferList = jobOfferRouter.route("/job-offers");
const jobOfferDetail = jobOfferRouter.route("/job-offers/:id");

jobOfferList.get(getOffersList);
jobOfferList.post(createOffer);

jobOfferDetail.delete(destroyJobOffer);
jobOfferDetail.get(getOffer);
jobOfferDetail.put(updateOffer);

export default jobOfferRouter;
