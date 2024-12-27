import { Router } from "express";
import { enquiryController } from "../controller/controller.js";

const router = new Router()

router.route("/log").post(enquiryController)

export default router