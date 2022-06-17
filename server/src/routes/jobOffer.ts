import { Router } from "express";
import {
    getOffersList,
    createOffer,
    removeJobOffer,
    getOffer,
    updateOffer,
    getInterestedAspirants
} from "../controllers";

const jobOfferRouter = Router();
const jobOfferList = jobOfferRouter.route("/job-offers");
const jobOfferDetail = jobOfferRouter.route("/job-offers/:id");

jobOfferList.get(getOffersList);
jobOfferList.post(createOffer);

jobOfferDetail.delete(removeJobOffer);
jobOfferDetail.get(getOffer);
jobOfferDetail.put(updateOffer);

jobOfferRouter.get("/job-offers/:id/interested-aspirants", getInterestedAspirants)

export default jobOfferRouter;
