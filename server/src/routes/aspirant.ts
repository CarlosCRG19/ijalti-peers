import { Router } from "express";

import {
    getAspirantList,
    createAspirant,
    getAspirant,
    updateAspirant,
    removeAspirant,
    loginAspirant,
    signupAspirant,
} from "../controllers";

const aspirantRouter = Router();

const aspirantList = aspirantRouter.route("/aspirants");
aspirantList.get(getAspirantList);
aspirantList.post(createAspirant);

const aspirantDetail = aspirantRouter.route("/aspirants/:id");
aspirantDetail.get(getAspirant);
aspirantDetail.put(updateAspirant);
aspirantDetail.delete(removeAspirant);

aspirantRouter.post("/aspirants/login", loginAspirant);
aspirantRouter.post("/aspirants/signup", signupAspirant);

export default aspirantRouter;
