import { Router } from "express";
import getOneByNumber from "../ControllerForSmartUp/getOneByNumber.controller.js";
import createUSer from "../ControllerForSmartUp/createUSer.controller.js";

const router = Router();

router.post("/smartup/getByPhone", getOneByNumber);
router.post("/smartup/createUser", createUSer);
router.post("/smartup/createOrder", createOrder);

export default router;
