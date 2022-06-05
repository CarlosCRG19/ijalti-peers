import { Router } from "express";
import { createExperience, workExperiencesList } from "../controllers";

const experiencesRouter = Router();

const experiencesList = experiencesRouter.route("/workExperiences");

experiencesList.get(workExperiencesList)
experiencesList.post(createExperience)

export default experiencesRouter;