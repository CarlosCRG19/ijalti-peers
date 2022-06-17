import { Router } from "express";

import {
    getAspirantList,
    createAspirant,
    getAspirant,
    updateAspirant,
    removeAspirant,
    addInterest,
    removeInterest,
    addWorkExperience,
    removeWorkExperience
} from "../controllers";

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

aspirantRouter.post("/aspirants/:id/work-experiences/", addWorkExperience);
aspirantRouter.delete("/aspirants/:id/work-experiences/:workExperienceId", removeWorkExperience);

export default aspirantRouter;
