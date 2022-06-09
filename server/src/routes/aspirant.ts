import { Router } from "express";

import {
    getAspirantList,
    createAspirant,
    getAspirant,
    updateAspirant,
    removeAspirant,
    addInterest,
    removeInterest
} from "../controllers";

import { firebaseMiddleware } from "../middlewares/auth";

const aspirantRouter = Router();

const aspirantList = aspirantRouter.route("/aspirants");
aspirantList.get(getAspirantList);
aspirantList.post(createAspirant);

const aspirantDetail = aspirantRouter.route("/aspirants/:id");
aspirantDetail.get(getAspirant);
aspirantDetail.put(updateAspirant);
aspirantDetail.delete(removeAspirant);

aspirantRouter.post("/aspirants/:id/interests/:offerId", addInterest);
aspirantRouter.delete("/aspirants/:id/interests/:offerId", removeInterest);

export default aspirantRouter;
