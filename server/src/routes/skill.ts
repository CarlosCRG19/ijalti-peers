import { Router } from "express";

import {
    getSkillList,
    createSkill,
    getSkill,
    removeSkill
} from "../controllers";

const skillRouter = Router();

const skillList = skillRouter.route("/skills");
skillList.get(getSkillList);
skillList.post(createSkill);

const skillDetail = skillRouter.route("/skill/:id");
skillDetail.get(getSkill);
skillDetail.delete(removeSkill);

export default skillRouter;


